import { useEffect, useRef } from "react";
import { useSearch } from "../../hooks/useSearch";
import { ResultCard } from "./ResultCard";
import { EmptyState } from "./EmptyState";

export function ResultsList({ query }: { query: string }) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearch(
    query,
    true,
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Ищем...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-600">Не удалось выполнить поиск. Попробуйте ещё раз.</p>;
  }

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  if (total === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">Найдено результатов: {total}</p>
      {results.map((result) => (
        <ResultCard key={result.chunk_id} result={result} query={query} />
      ))}
      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && <p className="text-center text-xs text-gray-400">Загружаем ещё...</p>}
    </div>
  );
}
