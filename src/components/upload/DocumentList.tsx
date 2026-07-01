import { useDocumentsList } from "../../hooks/useDocumentsList";
import { stageLabel, normalizeStage, type DocumentStage } from "../../utils/status";

const BADGE_CLASS: Record<DocumentStage, string> = {
  uploading: "bg-blue-100 text-blue-700",
  indexing: "bg-amber-100 text-amber-700",
  done: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DocumentList() {
  const { data, isLoading, isError } = useDocumentsList();

  if (isLoading) {
    return <p className="text-sm text-gray-500">Загружаем список документов...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-600">Не удалось загрузить список документов.</p>;
  }

  const documents = data?.documents ?? [];

  if (documents.length === 0) {
    return <p className="text-sm text-gray-500">Пока нет загруженных документов.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-2">Файл</th>
            <th className="px-4 py-2">Дата загрузки</th>
            <th className="px-4 py-2">Статус</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => {
            const stage = normalizeStage(doc.status);
            return (
              <tr key={doc.id} className="border-b border-gray-100 last:border-0">
                <td className="max-w-xs truncate px-4 py-2 font-medium text-gray-800" title={doc.file_name}>
                  {doc.file_name}
                </td>
                <td className="px-4 py-2 text-gray-500">{formatDate(doc.uploaded_at)}</td>
                <td className="px-4 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${BADGE_CLASS[stage]}`}>
                    {stageLabel(stage)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
