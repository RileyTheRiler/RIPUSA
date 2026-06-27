import Header from "@/components/Header";
import Briefing from "@/components/Briefing";
import Logistics from "@/components/Logistics";
import HowItWorks from "@/components/HowItWorks";
import SuspectRoster from "@/components/SuspectRoster";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Briefing />
      <Logistics />
      <HowItWorks />
      <SuspectRoster />
      <RsvpForm />
      <Footer />
    </main>
  );
}
