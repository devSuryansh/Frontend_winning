export interface CreateDocRequest {
  title: string;
  description: string;
  content_type?: string; // general, technical, report, proposal, etc. (default: "general")
  formatting_style?: string; // professional, casual, academic (default: "professional")
  include_toc?: boolean; // table of contents (default: false)
  include_sections?: boolean; // default: true
  target_length?: string; // short, medium, long (default: "medium")
}

export interface CreateDocResponse {
  success: boolean;
  doc_id?: string;
  doc_url?: string;
  doc_title?: string;
  content_preview?: string;
  result?: string;
  error?: string;
  user_id: string;
  service?: string; // default: "google_docs"
  action?: string; // default: "create_document"
  needs_authentication?: boolean; // default: false
  oauth_url?: string;
}

export interface UpdateDocRequest {
  doc_id: string;
  title?: string;
  additional_content?: string;
  instructions: string; // Instructions for what to update/modify
}

export interface UpdateDocResponse {
  success: boolean;
  doc_id?: string;
  doc_url?: string;
  result?: string;
  error?: string;
  user_id: string;
  service?: string; // default: "google_docs"
  action?: string; // default: "update_document"
  needs_authentication?: boolean; // default: false
  oauth_url?: string;
}

export interface FormatDocRequest {
  doc_id: string;
  formatting_instructions: string; // e.g., "Add headers, bullet points, make it professional"
  style?: string; // default: "professional"
}

export interface FormatDocResponse {
  success: boolean;
  doc_id?: string;
  doc_url?: string;
  result?: string;
  error?: string;
  user_id: string;
  service?: string; // default: "google_docs"
  action?: string; // default: "format_document"
  needs_authentication?: boolean; // default: false
  oauth_url?: string;
}

export interface DocTemplateRequest {
  template_type: string; // meeting_notes, project_proposal, report, resume, etc.
  title: string;
  variables?: Record<string, string | number | boolean>; // Template variables to fill in (default: {})
}

export interface DocTemplateResponse {
  success: boolean;
  doc_id?: string;
  doc_url?: string;
  doc_title?: string;
  template_used?: string;
  result?: string;
  error?: string;
  user_id: string;
  service?: string; // default: "google_docs"
  action?: string; // default: "create_from_template"
  needs_authentication?: boolean; // default: false
  oauth_url?: string;
}

export interface GenerateContentRequest {
  topic: string;
  content_type: string; // blog_post, technical_doc, proposal, report, etc.
  key_points?: string[]; // default: []
  tone?: string; // professional, casual, technical, creative (default: "professional")
  length?: string; // short, medium, long, detailed (default: "medium")
}

export interface GenerateContentResponse {
  success: boolean;
  generated_content?: string;
  content_outline?: string[];
  word_count?: number;
  result?: string;
  error?: string;
  user_id: string;
  service?: string; // default: "content_generation"
  action?: string; // default: "generate_content"
}
