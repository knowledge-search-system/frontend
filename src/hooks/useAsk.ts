import { useCallback, useState } from "react";
import { askQuestion } from "../services/ml";
import { getApiErrorMessage } from "../services/api";
import type { AskOut } from "../types/api";

export function useAsk() {
  const [result, setResult] = useState<AskOut | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ask = useCallback(async (question: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await askQuestion(question);
      setResult(data);
    } catch (error) {
      setResult(null);
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { ask, result, isLoading, errorMessage };
}
