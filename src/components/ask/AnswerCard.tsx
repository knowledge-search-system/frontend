import type { AskOut } from "../../types/api";

export function AnswerCard({ result }: { result: AskOut }) {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-800">{result.answer}</p>
      {result.sources.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Источники
          </h3>
          <ul className="space-y-2">
            {result.sources.map((source, index) => (
              <li key={index} className="rounded-md bg-gray-50 p-2 text-xs text-gray-600">
                {source.file_name || source.text ? (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      {source.file_name && (
                        <span className="font-medium text-gray-800">{source.file_name}</span>
                      )}
                      {source.page !== undefined && (
                        <span className="text-gray-400">стр. {source.page}</span>
                      )}
                    </div>
                    {source.text && <p className="mt-1 whitespace-pre-line">{source.text}</p>}
                  </>
                ) : (
                  <pre className="whitespace-pre-wrap break-all">{JSON.stringify(source)}</pre>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
