// Email API Types - matches your backend models
export interface SendEmailRequest {
  to: string;
  subject: string;
  body: string;
}

export interface AutomatedEmailRequest {
  to: string;
  subject: string;
}

export interface SendEmailResponse {
  success: boolean;
  result?: string;
  error?: string;
  user_id: string;
  needs_authentication?: boolean;
  oauth_url?: string; // OAuth URL for Gmail authentication
}
