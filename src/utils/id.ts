// crypto.randomUUID() требует secure context (https или localhost) — на
// удалённой машине, открытой по обычному http, его нет, и вызов падает с
// исключением. Используем его при наличии, иначе — запасной генератор.
export function generateLocalId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
