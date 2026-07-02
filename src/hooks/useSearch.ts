import { useInfiniteQuery } from "@tanstack/react-query";
import { search } from "../services/search";

const PAGE_SIZE = 10;

export function useSearch(query: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam }) => search(query, pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * lastPage.page_size;
      return loaded < lastPage.total ? lastPage.page + 1 : undefined;
    },
    enabled: enabled && query.trim().length > 0,
  });
}
