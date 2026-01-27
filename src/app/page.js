import Banner from "@/components/hero/Banner";
import About from "@/components/Home/about/About";
import ServicesSection from "@/components/Home/service/ServicesSection";
import Testimonials from "@/components/Home/Testimonials/Testimonials";

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <About></About>

      <ServicesSection></ServicesSection>
      <Testimonials></Testimonials>
    </main>
  );
}
