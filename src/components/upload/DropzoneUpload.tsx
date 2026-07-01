import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

interface Props {
  onFilesAccepted: (files: File[]) => void;
}

export function DropzoneUpload({ onFilesAccepted }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onFilesAccepted(acceptedFiles);
    },
    [onFilesAccepted],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: MAX_FILE_SIZE_BYTES,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors sm:p-12 ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm font-medium text-gray-700 sm:text-base">
          {isDragActive
            ? "Отпустите файлы для загрузки"
            : "Перетащите PDF или DOCX сюда, либо нажмите, чтобы выбрать"}
        </p>
        <p className="text-xs text-gray-400">Можно загрузить несколько файлов сразу, до 20 МБ каждый</p>
      </div>
      {fileRejections.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-red-600">
          {fileRejections.map(({ file, errors }) => (
            <li key={file.name}>
              {file.name}: {errors.map((error) => error.message).join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
