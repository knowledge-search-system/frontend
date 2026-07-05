import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getDocument, uploadDocument } from "../services/documents";
import { getApiErrorMessage } from "../services/api";
import { isTerminalStage, normalizeStage, type DocumentStage } from "../utils/status";
import { generateLocalId } from "../utils/id";

const POLL_INTERVAL_MS = 2000;

export interface UploadItem {
  localId: string;
  fileName: string;
  stage: DocumentStage;
  progress: number;
  documentId?: string;
  errorMessage?: string;
}

export function useUploadDocuments() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const queryClient = useQueryClient();
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const updateItem = useCallback((localId: string, patch: Partial<UploadItem>) => {
    setItems((current) =>
      current.map((item) => (item.localId === localId ? { ...item, ...patch } : item)),
    );
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      const newItems: UploadItem[] = files.map((file) => ({
        localId: generateLocalId(),
        fileName: file.name,
        stage: "uploading",
        progress: 0,
      }));
      setItems((current) => [...newItems, ...current]);

      newItems.forEach((item, index) => {
        const file = files[index];
        uploadDocument(file, (percent) => updateItem(item.localId, { progress: percent }))
          .then((result) => {
            updateItem(item.localId, {
              documentId: result.id,
              stage: normalizeStage(result.status),
              progress: 100,
            });
            queryClient.invalidateQueries({ queryKey: ["documents"] });
          })
          .catch((error: unknown) => {
            updateItem(item.localId, { stage: "error", errorMessage: getApiErrorMessage(error) });
          });
      });
    },
    [queryClient, updateItem],
  );

  useEffect(() => {
    const pending = items.filter((item) => item.documentId && !isTerminalStage(item.stage));
    if (pending.length === 0) return;

    const timer = setInterval(async () => {
      const toPoll = itemsRef.current.filter(
        (item) => item.documentId && !isTerminalStage(item.stage),
      );
      await Promise.all(
        toPoll.map(async (item) => {
          try {
            const doc = await getDocument(item.documentId!);
            updateItem(item.localId, {
              stage: normalizeStage(doc.status),
              errorMessage: doc.error_message || undefined,
            });
          } catch {
            // временная сетевая ошибка при поллинге — не переводим документ в error,
            // следующая итерация интервала попробует снова
          }
        }),
      );
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    }, POLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [items, queryClient, updateItem]);

  return { items, addFiles };
}
