import Header from "@/components/Header";
import Briefing from "@/components/Briefing";
import Logistics from "@/components/Logistics";
import HowItWorks from "@/components/HowItWorks";
import SuspectRoster from "@/components/SuspectRoster";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";
import JourneyNav from "@/components/JourneyNav";
import ChapterDivider from "@/components/ChapterDivider";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <JourneyNav />
      <Header />
      <Briefing />
      <ChapterDivider icon="📁" />
      <Logistics />
      <ChapterDivider icon="🎭" />
      <HowItWorks />
      <ChapterDivider icon="🕵️" />
      <SuspectRoster />
      <ChapterDivider icon="🪶" />
      <RsvpForm />
      <Footer />
    </main>
  );
}
