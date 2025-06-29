import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Mail, Gift, Shield, ArrowRight, CheckCircle } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter signup:", email);
    setIsSubmitted(true);
    setEmail("");
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Exclusive Offers",
      description: "Get early access to sales and special discounts",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "No Spam",
      description: "We respect your privacy and only send relevant content",
    },
  ];

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome to TechStore!</h2>
          <p className="text-xl mb-8 opacity-90">
            Thank you for subscribing to our newsletter. You'll receive your
            first email shortly.
          </p>
          <Button
            variant="secondary"
            onClick={() => setIsSubmitted(false)}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Subscribe Another Email
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Get the Latest Tech Updates
            </h2>

            <p className="text-lg opacity-90 leading-relaxed">
              Subscribe to our newsletter and be the first to know about new
              products, exclusive offers, tech tips, and industry insights.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{benefit.title}</h4>
                    <p className="text-sm opacity-80">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Signup Form */}
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Subscribe Now</h3>
                <p className="text-sm opacity-80">
                  Join 50,000+ tech enthusiasts
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder-white/70 focus:border-white focus:ring-white/20"
                  required
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-white text-primary hover:bg-gray-100 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe to Newsletter
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Privacy Notice */}
              <p className="text-xs opacity-70 text-center">
                By subscribing, you agree to our{" "}
                <a href="/privacy" className="underline hover:opacity-100">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms" className="underline hover:opacity-100">
                  Terms of Service
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
