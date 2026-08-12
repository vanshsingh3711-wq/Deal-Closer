import { EditLeadForm } from "@/components/app/leads/edit/EditLeadForm";

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="h-full px-6 py-8 md:px-10 lg:px-12 overflow-y-auto">
      <EditLeadForm leadId={id} />
    </div>
  );
}
