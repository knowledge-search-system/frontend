import { api } from "./api";
import type { SearchOut } from "../types/api";

export async function search(q: string, page = 1, pageSize = 10): Promise<SearchOut> {
  const { data } = await api.get<SearchOut>("/search", {
    params: { q, page, page_size: pageSize },
  });
  return data;
}
