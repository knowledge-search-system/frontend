import { DropzoneUpload } from "../components/upload/DropzoneUpload";
import { MlUploadProgressItem } from "../components/ask/MlUploadProgressItem";
import { AskForm } from "../components/ask/AskForm";
import { AnswerCard } from "../components/ask/AnswerCard";
import { useUploadMlDocuments } from "../hooks/useUploadMlDocuments";
import { useAsk } from "../hooks/useAsk";

export function AskPage() {
  const { items, addFiles } = useUploadMlDocuments();
  const { ask, result, isLoading, errorMessage } = useAsk();

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Документы для вопроса-ответа</h2>
        <DropzoneUpload onFilesAccepted={addFiles} />
        {items.length > 0 && (
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <MlUploadProgressItem key={item.localId} item={item} />
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Вопрос-ответ</h2>
        <AskForm onAsk={ask} isLoading={isLoading} />
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {result && <AnswerCard result={result} />}
      </section>
    </div>
  );
}
