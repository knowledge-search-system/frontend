import { api } from "./api";
import type { DocumentListOut, DocumentOut, UploadOut } from "../types/api";

export async function listDocuments(page = 1, pageSize = 20): Promise<DocumentListOut> {
  const { data } = await api.get<DocumentListOut>("/documents", {
    params: { page, page_size: pageSize },
  });
  return data;
}

export async function getDocument(id: string): Promise<DocumentOut> {
  const { data } = await api.get<DocumentOut>(`/documents/${id}`);
  return data;
}

export async function uploadDocument(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<UploadOut> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<UploadOut>("/documents", formData, {
    onUploadProgress: (event) => {
      if (!onProgress || !event.total) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    },
  });
  return data;
}
