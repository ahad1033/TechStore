import {
  HeroSection,
  StatSection,
  Testimonials,
  ServicesSection,
  FeaturedProducts,
  NewsletterSignup,
  ProductCategories,
} from "@/components/sections";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <Testimonials />
      <StatSection />
      <NewsletterSignup />
      <ServicesSection />
    </>
  );
};

export default HomePage;
