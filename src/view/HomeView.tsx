import CallToAction from "@/components/home/CallToAction";
import FeaturedServices from "@/components/home/FeaturedServices";
import HeroSection from "@/components/home/HeroSection";
import InfoSection from "@/components/home/InfoSection";
import Reviews from "@/components/home/Reviews";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const HomeView = () => {
  return (
    <>
      <HeroSection />
      <InfoSection />
      <FeaturedServices />
      <WhyChooseUs />
      <CallToAction />
      <Reviews />
    </>
  );
};

export default HomeView;
