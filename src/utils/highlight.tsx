import type { ReactNode } from "react";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Разбивает text на фрагменты по словам поискового запроса и оборачивает
 * совпадения в <mark>. Возвращает React-ноды, а не HTML-строку — совпадения
 * не рендерятся через dangerouslySetInnerHTML, поэтому XSS из text исключён.
 */
export function highlightMatches(text: string, query: string): ReactNode {
  const words = Array.from(
    new Set(
      query
        .trim()
        .split(/\s+/)
        .map((word) => word.trim())
        .filter(Boolean),
    ),
  );

  if (words.length === 0) return text;

  // Один capturing group => String.split возвращает совпадения на нечётных
  // индексах результата, без стейтфулного повторного матчинга регэкспом.
  const pattern = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "giu");
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    index % 2 === 1 ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>,
  );
}
