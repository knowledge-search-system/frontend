export type DocumentStage = "uploading" | "indexing" | "done" | "error";

const STAGE_LABEL: Record<DocumentStage, string> = {
  uploading: "Загрузка...",
  indexing: "Индексация...",
  done: "Готово",
  error: "Ошибка",
};

/**
 * Бэкенд (document-processor) отдаёт статус произвольной строкой — конкретные
 * значения не зафиксированы в gateway-контракте, поэтому нормализуем по
 * ключевым словам, а не по точному enum.
 */
export function normalizeStage(rawStatus: string): DocumentStage {
  const status = rawStatus.toLowerCase();
  if (status.includes("fail") || status.includes("error")) return "error";
  if (
    status.includes("done") ||
    status.includes("ready") ||
    status.includes("indexed") ||
    status.includes("complete")
  ) {
    return "done";
  }
  if (status.includes("index")) return "indexing";
  if (
    status.includes("upload") ||
    status.includes("process") ||
    status.includes("pending") ||
    status.includes("queue")
  ) {
    return "uploading";
  }
  return "indexing";
}

export function isTerminalStage(stage: DocumentStage): boolean {
  return stage === "done" || stage === "error";
}

export function stageLabel(stage: DocumentStage): string {
  return STAGE_LABEL[stage];
}
