import type { UploadItem } from "../../hooks/useUploadDocuments";
import { stageLabel } from "../../utils/status";

const BAR_COLOR: Record<UploadItem["stage"], string> = {
  uploading: "bg-blue-500",
  indexing: "bg-amber-500",
  done: "bg-green-500",
  error: "bg-red-500",
};

export function UploadProgressItem({ item }: { item: UploadItem }) {
  const isIndeterminate = item.stage === "indexing";
  const width = item.stage === "uploading" ? item.progress : 100;

  return (
    <li className="rounded-md border border-gray-200 bg-white p-3">
      <div className="mb-1 flex items-center justify-between gap-2 text-sm">
        <span className="truncate font-medium text-gray-800">{item.fileName}</span>
        <span className="shrink-0 text-gray-500">{stageLabel(item.stage)}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all ${BAR_COLOR[item.stage]} ${
            isIndeterminate ? "w-full animate-pulse" : ""
          }`}
          style={isIndeterminate ? undefined : { width: `${width}%` }}
        />
      </div>
      {item.errorMessage && <p className="mt-1 text-xs text-red-600">{item.errorMessage}</p>}
    </li>
  );
}
