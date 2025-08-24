// Document API Types - matches your backend models
export interface GenerateDocumentRequest {
  topic: string;
  urls?: string[];
  output_format?: 'markdown' | 'html' | 'pdf' | 'docx';
}

export interface GenerateDocumentResponse {
  success: boolean;
  result?: string;
  error?: string;
  user_id: string;
  needs_authentication?: boolean;
  oauth_url?: string;
  needs_input?: boolean;
  file_path?: string;
}

export interface DocumentHistoryItem {
  id: string;
  topic: string;
  urls?: string[];
  output_format: string;
  success: boolean;
  timestamp: Date;
  error?: string;
  file_path?: string;
}