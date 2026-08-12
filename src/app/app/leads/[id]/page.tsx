import { notFound } from "next/navigation";
import { getLeadById } from "@/components/app/leads/mockData";
import { LeadDetails } from "@/components/app/leads/details/LeadDetails";

export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = getLeadById(id);

  if (!lead) {
    notFound();
  }

  return <LeadDetails lead={lead} />;
}
