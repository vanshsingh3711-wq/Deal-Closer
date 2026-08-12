import { Lead } from "./types";

const defaultActivities = [
  { id: "a1", type: "email_opened", title: "Email opened", description: "Quick idea for Acme Commerce", timestamp: "Today · 10:42" },
  { id: "a2", type: "follow_up_scheduled", title: "Follow-up scheduled", description: "Follow-up #1 scheduled for tomorrow", timestamp: "Today · 10:30" },
  { id: "a3", type: "email_sent", title: "Email sent", description: "Campaign #018", timestamp: "Yesterday · 14:18" },
  { id: "a4", type: "lead_imported", title: "Lead imported", description: "Imported from CSV", timestamp: "Aug 10 · 09:12" }
] as const;

const defaultOutreach = [
  { id: "o1", title: "Initial email", statusStr: "Sent", details: ["Sent · Aug 10 · 09:12", "Opened · Aug 10 · 09:47"] },
  { id: "o2", title: "Follow-up #1", statusStr: "Scheduled", details: ["Scheduled · Tomorrow · 10:30"] }
];

const defaultNote = {
  id: "n1",
  content: "Strong fit for ecommerce automation. Mention their recent expansion and keep the first follow-up concise.",
  updatedAt: "Today · 09:41"
};

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead_001",
    name: "Sarah Mitchell",
    company: "Acme Commerce",
    role: "Head of Growth",
    email: "sarah@acme-commerce.example",
    status: "INTERESTED",
    source: "Imported",
    lastActivity: "Opened 12m ago",
    nextFollowUp: "Today · 10:30",
    addedAt: Date.now() - 86400000 * 5,
    contactedAt: Date.now() - 86400000 * 2,
    followUpAt: Date.now() + 3600000 * 2,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  },
  {
    id: "lead_002",
    name: "Daniel Carter",
    company: "GrowthLabs",
    role: "Founder",
    email: "daniel@growthlabs.example",
    status: "REPLIED",
    source: "Manual Entry",
    lastActivity: "Replied 2h ago",
    nextFollowUp: "Tomorrow",
    addedAt: Date.now() - 86400000 * 10,
    contactedAt: Date.now() - 86400000 * 3,
    followUpAt: Date.now() + 86400000,
    activities: [
      { id: "a1", type: "reply_received", title: "Reply received", description: "Interested — let's talk.", timestamp: "2 hours ago" },
      { id: "a2", type: "email_sent", title: "Email sent", description: "Growth Strategy Campaign", timestamp: "Yesterday · 09:00" },
      { id: "a3", type: "lead_imported", title: "Lead created", description: "Manually added", timestamp: "Aug 02 · 11:30" }
    ],
    outreach: [
      { id: "o1", title: "Growth Strategy", statusStr: "Replied", details: ["Sent · Yesterday · 09:00", "Replied · Today · 14:00"] }
    ],
    note: { id: "n2", content: "Needs a demo scheduled next week.", updatedAt: "2 hours ago" }
  },
  {
    id: "lead_003",
    name: "Michael Chen",
    company: "Storefront Co.",
    role: "Marketing Director",
    email: "michael@storefront.example",
    status: "CONTACTED",
    source: "API Integration",
    lastActivity: "Contacted yesterday",
    nextFollowUp: "Today · 15:00",
    addedAt: Date.now() - 86400000 * 2,
    contactedAt: Date.now() - 86400000 * 1,
    followUpAt: Date.now() + 3600000 * 5,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  },
  {
    id: "lead_004",
    name: "Alex Morgan",
    company: "CommerceStack",
    role: "Founder",
    email: "alex@commercestack.example",
    status: "OPENED",
    source: "Imported",
    lastActivity: "Opened 1h ago",
    nextFollowUp: "Not scheduled",
    addedAt: Date.now() - 86400000 * 1,
    contactedAt: Date.now() - 86400000 * 1,
    followUpAt: 0,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  },
  {
    id: "lead_005",
    name: "Jessica Lee",
    company: "BrightBrands",
    role: "VP Marketing",
    email: "jessica@brightbrands.example",
    status: "NEW",
    source: "Manual Entry",
    lastActivity: "—",
    nextFollowUp: "Not scheduled",
    addedAt: Date.now() - 3600000 * 2,
    contactedAt: 0,
    followUpAt: 0,
    activities: [
      { id: "a1", type: "lead_imported", title: "Lead created", description: "Manually added", timestamp: "2 hours ago" }
    ],
    outreach: [],
    note: { id: "n5", content: "Waiting for approval before sending initial outreach.", updatedAt: "2 hours ago" }
  },
  {
    id: "lead_006",
    name: "Thomas Wright",
    company: "Venture Digital",
    role: "Director of Sales",
    email: "thomas@venturedigital.example",
    status: "CLOSED",
    source: "Imported",
    lastActivity: "Closed last week",
    nextFollowUp: "Not scheduled",
    addedAt: Date.now() - 86400000 * 30,
    contactedAt: Date.now() - 86400000 * 25,
    followUpAt: 0,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  },
  {
    id: "lead_007",
    name: "Emily Davies",
    company: "NextGen Retail",
    role: "CEO",
    email: "emily@nextgenretail.example",
    status: "REPLIED",
    source: "Imported",
    lastActivity: "Replied yesterday",
    nextFollowUp: "Next Monday",
    addedAt: Date.now() - 86400000 * 15,
    contactedAt: Date.now() - 86400000 * 7,
    followUpAt: Date.now() + 86400000 * 4,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  },
  {
    id: "lead_008",
    name: "David Kim",
    company: "AppStore Pro",
    role: "Product Manager",
    email: "david@appstorepro.example",
    status: "CONTACTED",
    source: "API Integration",
    lastActivity: "Contacted 3h ago",
    nextFollowUp: "Tomorrow",
    addedAt: Date.now() - 86400000 * 4,
    contactedAt: Date.now() - 3600000 * 3,
    followUpAt: Date.now() + 86400000,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  },
  {
    id: "lead_009",
    name: "Rachel Green",
    company: "StyleHouse",
    role: "Creative Director",
    email: "rachel@stylehouse.example",
    status: "NEW",
    source: "Imported",
    lastActivity: "—",
    nextFollowUp: "Not scheduled",
    addedAt: Date.now() - 3600000 * 5,
    contactedAt: 0,
    followUpAt: 0,
    activities: [
      { id: "a1", type: "lead_imported", title: "Lead imported", description: "Imported from CSV", timestamp: "5 hours ago" }
    ],
    outreach: [],
    note: defaultNote
  },
  {
    id: "lead_010",
    name: "Marcus Johnson",
    company: "TechGear",
    role: "CMO",
    email: "marcus@techgear.example",
    status: "OPENED",
    source: "Manual Entry",
    lastActivity: "Opened 5m ago",
    nextFollowUp: "Tomorrow",
    addedAt: Date.now() - 86400000 * 6,
    contactedAt: Date.now() - 86400000 * 2,
    followUpAt: Date.now() + 86400000,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  },
  {
    id: "lead_011",
    name: "Sophia Martinez",
    company: "CloudSync",
    role: "Founder",
    email: "sophia@cloudsync.example",
    status: "INTERESTED",
    source: "Imported",
    lastActivity: "Replied 10m ago",
    nextFollowUp: "Today · 16:00",
    addedAt: Date.now() - 86400000 * 12,
    contactedAt: Date.now() - 86400000 * 5,
    followUpAt: Date.now() + 3600000 * 6,
    activities: [...defaultActivities],
    outreach: [...defaultOutreach],
    note: defaultNote
  }
];

export function getLeadById(id: string): Lead | undefined {
  return MOCK_LEADS.find(l => l.id === id);
}
