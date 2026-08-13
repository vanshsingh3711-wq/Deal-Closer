export type LeadStatus = 'NEW' | 'CONTACTED' | 'OPENED' | 'REPLIED' | 'INTERESTED' | 'CLOSED';
export type SortOption = "Recently added" | "Recently contacted" | "Follow-up due" | "Company";

export interface LeadActivity {
  id: string;
  type: 'email_opened' | 'follow_up_scheduled' | 'email_sent' | 'lead_imported' | 'reply_received';
  title: string;
  description: string;
  timestamp: string;
}

export interface LeadOutreach {
  id: string;
  title: string;
  statusStr: string;
  details: string[];
}

export interface LeadNote {
  id: string;
  content: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  status: LeadStatus;
  source: string;
  lastActivity: string;
  nextFollowUp: string;
  addedAt: number;
  contactedAt: number;
  followUpAt: number;
  activities: LeadActivity[];
  outreach: LeadOutreach[];
  note: LeadNote;
  archived?: boolean;
  verification_status?: 'unverified' | 'verified' | 'bad';
}
