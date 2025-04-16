
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { RecentListings } from "@/components/home/RecentListings";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <FeaturedListings />
      <HowItWorks />
      <RecentListings />
      <CtaSection />
    </>
  );
}
