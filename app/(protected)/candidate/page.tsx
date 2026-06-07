import { TopBar } from "@/components/layout/TopBar";
import { CandidateJoinForm } from "@/components/candidate/CandidateJoinForm";

export default function CandidatePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <CandidateJoinForm />
    </div>
  );
}