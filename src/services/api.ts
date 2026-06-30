import axios from "axios";
import type { ApiErrorBody } from "../types/api";

// Всегда относительный путь: в dev его проксирует vite (vite.config.ts),
// в проде — nginx внутри frontend-контейнера (nginx.conf.template).
// Это позволяет не настраивать CORS на gateway.
export const api = axios.create({
  baseURL: "/api/v1",
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.error?.message ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Неизвестная ошибка";
}
