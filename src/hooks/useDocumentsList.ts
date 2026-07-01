import { useQuery } from "@tanstack/react-query";
import { listDocuments } from "../services/documents";
import { isTerminalStage, normalizeStage } from "../utils/status";

const POLL_INTERVAL_MS = 2000;

export function useDocumentsList(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ["documents", page, pageSize],
    queryFn: () => listDocuments(page, pageSize),
    refetchInterval: (query) => {
      const documents = query.state.data?.documents ?? [];
      const hasPending = documents.some((doc) => !isTerminalStage(normalizeStage(doc.status)));
      return hasPending ? POLL_INTERVAL_MS : false;
    },
  });
}
