import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BrandVideoSection from "@/components/BrandVideoSection";
import ServicesSection from "@/components/ServicesSection";
import PartnerCarousel from "@/components/PartnerCarousel";
import CoreValues from "@/components/CoreValues";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import YouthProgramSection from "@/components/YouthProgramSection";
import CampaignShowcase from "@/components/CampaignShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#youth-program" || location.pathname === "/youth-program") {
      const el = document.getElementById("youth-program");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BrandVideoSection />
      <ServicesSection />
      <PartnerCarousel />
      <CoreValues />
      <HowItWorksSection />
      <WhyChooseSection />
      <YouthProgramSection />
      <CampaignShowcase />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;

