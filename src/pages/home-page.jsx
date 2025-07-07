import {
  HeroSection,
  StatSection,
  Testimonials,
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
    </>
  );
};

export default HomePage;
