import { team, siteConfig } from "@/data/site";
import TeamDetailsClient from "./TeamDetailsClient";

export default async function TeamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = team.find((t) => t.id === parseInt(id));

  if (!member) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-bold text-[#0a1426] mb-4">Team Member Not Found</h2>
        <a href="/team" className="text-[#0075ff] hover:underline">Go back to Team</a>
      </div>
    );
  }

  return <TeamDetailsClient member={member} />;
}