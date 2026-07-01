import { DropzoneUpload } from "../components/upload/DropzoneUpload";
import { UploadProgressItem } from "../components/upload/UploadProgressItem";
import { DocumentList } from "../components/upload/DocumentList";
import { useUploadDocuments } from "../hooks/useUploadDocuments";

export function DocumentsPage() {
  const { items, addFiles } = useUploadDocuments();

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Загрузка документов</h2>
        <DropzoneUpload onFilesAccepted={addFiles} />
        {items.length > 0 && (
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <UploadProgressItem key={item.localId} item={item} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Загруженные документы</h2>
        <DocumentList />
      </section>
    </div>
  );
}
