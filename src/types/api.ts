// Зеркало gateway/app/schemas.py — держать в синхроне с бэкендом.

export interface DocumentOut {
  id: string;
  file_name: string;
  status: string;
  uploaded_at: string;
  error_message: string;
}

export interface DocumentListOut {
  documents: DocumentOut[];
  total: number;
}

export interface UploadOut {
  id: string;
  status: string;
}

export interface SearchResultOut {
  chunk_id: string;
  file_name: string;
  page: number;
  text: string;
  score: number;
}

export interface SearchOut {
  results: SearchResultOut[];
  total: number;
  page: number;
  page_size: number;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
  };
}
