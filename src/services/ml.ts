import { api } from "./api";
import type { AskOut, MlUploadOut } from "../types/api";

export async function askQuestion(question: string): Promise<AskOut> {
  const { data } = await api.post<AskOut>("/ml/ask", { question });
  return data;
}

export async function uploadMlDocument(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<MlUploadOut> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<MlUploadOut>("/ml/documents", formData, {
    onUploadProgress: (event) => {
      if (!onProgress || !event.total) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    },
  });
  return data;
}
