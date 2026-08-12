import { notFound } from "next/navigation";
import { LeadDetails } from "@/components/app/leads/details/LeadDetails";
import { Lead } from "@/components/app/leads/types";

async function fetchLead(id: string): Promise<Lead | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/leads/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    
    const addedAtMs = new Date(data.date_added).getTime();
    const contactedAtMs = data.last_contacted ? new Date(data.last_contacted).getTime() : 0;
    
    const statusMap: Record<string, any> = {
      "new": "NEW",
      "verified": "NEW",
      "contacted": "CONTACTED",
      "opened": "OPENED",
      "replied": "REPLIED",
      "followup1": "CONTACTED",
      "followup2": "CONTACTED",
      "closed": "CLOSED"
    };

    return {
      id: data.id,
      name: data.name,
      company: data.company,
      role: "", 
      email: data.email,
      status: statusMap[data.stage] || "NEW",
      source: data.source === "linkedin_csv" ? "LinkedIn CSV" : (data.source === "directory" ? "Directory" : "Manual"),
      lastActivity: "Added to CRM",
      nextFollowUp: "-",
      addedAt: addedAtMs,
      contactedAt: contactedAtMs,
      followUpAt: 0,
      activities: [],
      outreach: [],
      note: { id: "n1", content: data.notes || "", updatedAt: data.date_added }
    };
  } catch (error) {
    console.error("Failed to fetch lead:", error);
    return null;
  }
}

export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await fetchLead(id);

  if (!lead) {
    notFound();
  }

  return <LeadDetails lead={lead} />;
}
