import { useCallback, useState } from "react";
import { uploadMlDocument } from "../services/ml";
import { getApiErrorMessage } from "../services/api";

export interface MlUploadItem {
  localId: string;
  fileName: string;
  progress: number;
  status: "uploading" | "done" | "error";
  chunks?: number;
  errorMessage?: string;
}

export function useUploadMlDocuments() {
  const [items, setItems] = useState<MlUploadItem[]>([]);

  const updateItem = useCallback((localId: string, patch: Partial<MlUploadItem>) => {
    setItems((current) =>
      current.map((item) => (item.localId === localId ? { ...item, ...patch } : item)),
    );
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      const newItems: MlUploadItem[] = files.map((file) => ({
        localId: crypto.randomUUID(),
        fileName: file.name,
        progress: 0,
        status: "uploading",
      }));
      setItems((current) => [...newItems, ...current]);

      newItems.forEach((item, index) => {
        const file = files[index];
        uploadMlDocument(file, (percent) => updateItem(item.localId, { progress: percent }))
          .then((result) => {
            updateItem(item.localId, { status: "done", progress: 100, chunks: result.chunks });
          })
          .catch((error: unknown) => {
            updateItem(item.localId, { status: "error", errorMessage: getApiErrorMessage(error) });
          });
      });
    },
    [updateItem],
  );

  return { items, addFiles };
}
