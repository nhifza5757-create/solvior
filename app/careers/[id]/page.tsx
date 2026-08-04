import CareerDetailsClient from "./CareerDetailsClient";

export default async function CareerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CareerDetailsClient jobId={parseInt(id)} />;
}