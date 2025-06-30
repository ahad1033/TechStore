import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Rocket,
  Package,
  Lightbulb,
  ArrowRight,
  Headphones,
  ShieldCheck,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero-like About Section */}
      <div className="bg-gradient-to-br from-background to-primary/5">
        <div className="container section-padding text-center">
          <Badge
            variant="secondary"
            className="inline-flex items-center space-x-2 px-4 py-2 border border-primary rounded-full mb-6"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Our Story</span>
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Innovating the Future of Tech Retail
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            At TechStore, we believe in bringing the latest and greatest
            technology directly to your fingertips. Founded on a passion for
            innovation and a commitment to quality, we strive to be your trusted
            source for all things tech.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="text-lg px-8 py-4">
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission */}
          <div className="space-y-6">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              Our Mission
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Empowering Your Digital Life
            </h2>
            <p className="text-lg text-gray-600">
              Our mission is to provide a seamless and enjoyable shopping
              experience for tech enthusiasts and everyday users alike. We
              curate a diverse range of high-quality products, ensuring you have
              access to the best technology that enhances your life, work, and
              play.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-primary mr-2" />
                <span>Quality Assurance on Every Product</span>
              </li>
              <li className="flex items-center">
                <Headphones className="w-5 h-5 text-primary mr-2" />
                <span>Exceptional Customer Support</span>
              </li>
              <li className="flex items-center">
                <Package className="w-5 h-5 text-primary mr-2" />
                <span>Fast & Reliable Shipping</span>
              </li>
            </ul>
          </div>

          {/* Vision Image/Placeholder */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white text-2xl font-semibold text-center p-4">
                "Connecting You to Tomorrow's Technology, Today."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-tr from-background to-secondary/5">
        <div className="container section-padding text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose TechStore?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We are more than just a store; we are a community dedicated to
            providing the best tech experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
              <p className="text-gray-600">
                Handpicked products from leading brands, ensuring top-tier
                quality and performance.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our knowledgeable team is always ready to assist you with any
                questions or concerns.
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-gray-600">
                Enjoy quick delivery and secure transactions for a worry-free
                shopping experience.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container section-padding text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Ready to Explore?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Dive into our extensive catalog and find the perfect tech to elevate
          your everyday.
        </p>
        <Link to="/products">
          <Button size="lg" className="text-lg px-8 py-4">
            Start Shopping Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
