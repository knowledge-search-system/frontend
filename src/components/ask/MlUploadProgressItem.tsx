import type { MlUploadItem } from "../../hooks/useUploadMlDocuments";

const BAR_COLOR: Record<MlUploadItem["status"], string> = {
  uploading: "bg-blue-500",
  done: "bg-green-500",
  error: "bg-red-500",
};

const STATUS_LABEL: Record<MlUploadItem["status"], string> = {
  uploading: "Загрузка...",
  done: "Готово",
  error: "Ошибка",
};

export function MlUploadProgressItem({ item }: { item: MlUploadItem }) {
  return (
    <li className="rounded-md border border-gray-200 bg-white p-3">
      <div className="mb-1 flex items-center justify-between gap-2 text-sm">
        <span className="truncate font-medium text-gray-800">{item.fileName}</span>
        <span className="shrink-0 text-gray-500">
          {STATUS_LABEL[item.status]}
          {item.status === "done" && item.chunks !== undefined && ` (${item.chunks} фрагм.)`}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all ${BAR_COLOR[item.status]}`}
          style={{ width: `${item.progress}%` }}
        />
      </div>
      {item.errorMessage && <p className="mt-1 text-xs text-red-600">{item.errorMessage}</p>}
    </li>
  );
}
