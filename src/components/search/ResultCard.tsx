import type { SearchResultOut } from "../../types/api";
import { highlightMatches } from "../../utils/highlight";
import { normalizeExtractedText } from "../../utils/text";

interface Props {
  result: SearchResultOut;
  query: string;
}

export function ResultCard({ result, query }: Props) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
        <span className="font-medium text-gray-900" title={result.file_name}>
          {result.file_name}
        </span>
        <span className="text-gray-500">стр. {result.page}</span>
        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
          релевантность {result.score.toFixed(2)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">
        {highlightMatches(normalizeExtractedText(result.text), query)}
      </p>
    </article>
  );
}
