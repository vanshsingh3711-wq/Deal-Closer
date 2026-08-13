export interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateFormData {
  name: string;
  subject: string;
  body: string;
}
