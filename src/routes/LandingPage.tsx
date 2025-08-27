import Features from "@/components/landingPage/Features.tsx";
import { HeroHeader } from "@/components/landingPage/Header.tsx";
import HeroSection from "@/components/landingPage/Hero.tsx";
import IntegrationsSection from "@/components/landingPage/Integrations.tsx";

export default function LandingPage() {
	return (
		<>
			<HeroHeader />
			<HeroSection />
			<Features />
			<IntegrationsSection />
		</>
	);
}
