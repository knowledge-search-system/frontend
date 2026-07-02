import { useState } from "react";
import { SearchBar } from "../components/search/SearchBar";
import { ResultsList } from "../components/search/ResultsList";

export function SearchPage() {
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <SearchBar onSearch={setSubmittedQuery} />
      {submittedQuery && <ResultsList key={submittedQuery} query={submittedQuery} />}
    </div>
  );
}
