import { toast } from "sonner";
import React, { useState } from "react";
import { motion } from "motion/react";

import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail, Gift, Shield, ArrowRight, Sparkles } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    toast.success(
      `Thanks for signing up with ${email} to get our latest updates!`
    );

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
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Latest Tech",
      description: "Stay updated with cutting-edge audio technology",
    },
  ];

  // Animation variants for the bouncing effect
  const bounceAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Floating animation for subtle movement
  const floatingAnimation = {
    y: [0, -10, 0],
    x: [0, 5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="">
      <div className="container section-padding bg-primary rounded-lg">
        
        <motion.div
          className="bg-primary rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary opacity-95"></div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 lg:p-16">
            {/* Left Side - Image Section */}
            <div className="flex flex-col items-center justify-center space-y-6 order-2 lg:order-1">
              <motion.div className="relative" animate={bounceAnimation}>
                {/* Headphone Image */}
                <motion.img
                  src="/images/blue-headphone.png"
                  alt="Premium Headphones"
                  className="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                  animate={floatingAnimation}
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-75 -z-10"></div>
              </motion.div>

              {/* Animated Text */}
              <motion.div
                className="text-center text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h3 className="text-xl lg:text-2xl font-bold mb-2">
                  Premium Audio Experience
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Discover the latest in audio technology
                </p>
              </motion.div>
            </div>

            {/* Right Side - Newsletter Form */}
            <motion.div
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="text-white">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                  Get the Latest
                  <span className="block text-white/90">Tech Updates</span>
                </h2>
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8">
                  Subscribe to our newsletter and be the first to know about new
                  products, exclusive offers, and industry insights.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-0.5">
                      {benefit.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm lg:text-base">
                        {benefit.title}
                      </h4>
                      <p className="text-xs lg:text-sm text-white/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Newsletter Form */}
              <Card className="p-6 lg:p-8 bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Mail className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">
                      Subscribe Now
                    </h3>
                    <p className="text-sm lg:text-base text-white/70">
                      Join 50,000+ tech enthusiasts
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white focus:ring-white/20 h-12 lg:h-14 text-base lg:text-lg rounded-xl"
                        required
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="w-full bg-white text-primary hover:bg-gray-100 disabled:opacity-50 h-12 lg:h-14 text-base lg:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Subscribe to Newsletter
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Privacy Notice */}
                  <p className="text-xs lg:text-sm text-white/60 text-center leading-relaxed">
                    By subscribing, you agree to our{" "}
                    <a
                      href="/privacy"
                      className="underline hover:text-white/80 transition-colors"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms"
                      className="underline hover:text-white/80 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;

// import { toast } from "sonner";
// import React, { useState } from "react";

// import { Card } from "../ui/card";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Mail, Gift, Shield, ArrowRight } from "lucide-react";

// const NewsletterSignup = () => {
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) return;

//     setIsSubmitting(true);

//     await new Promise((resolve) => setTimeout(resolve, 500));

//     toast.success(
//       `Thanks for signed up with ${email} to get our latest updates!`
//     );

//     setEmail("");

//     setIsSubmitting(false);
//   };

//   const benefits = [
//     {
//       icon: <Gift className="w-5 h-5" />,
//       title: "Exclusive Offers",
//       description: "Get early access to sales and special discounts",
//     },
//     {
//       icon: <Shield className="w-5 h-5" />,
//       title: "No Spam",
//       description: "We respect your privacy and only send relevant content",
//     },
//   ];

//   return (
//     <section
//     // className="bg-gradient-to-br from-blue-200 via-white to-purple-200"
//     >
//       <div className="container section-padding">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="space-y-6">
//             <h2 className="text-3xl lg:text-4xl font-bold">
//               Get the Latest Tech Updates
//             </h2>

//             <p className="text-lg opacity-90 leading-relaxed">
//               Subscribe to our newsletter and be the first to know about new
//               products, exclusive offers, tech tips, and industry insights.
//             </p>

//             {/* Benefits */}
//             <div className="space-y-4">
//               {benefits.map((benefit, index) => (
//                 <div key={index} className="flex items-start space-x-3">
//                   <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
//                     {benefit.icon}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold">{benefit.title}</h4>
//                     <p className="text-sm opacity-80">{benefit.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Content - Signup Form */}
//           <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
//             <div className="space-y-6">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
//                   <Mail className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Subscribe Now</h3>
//                 <p className="text-sm opacity-80">
//                   Join 50,000+ tech enthusiasts
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="bg-white/10 border-white/30 text-white placeholder-white/70 focus:border-white focus:ring-white/20"
//                   required
//                 />

//                 <Button
//                   type="submit"
//                   disabled={isSubmitting || !email}
//                   className="w-full bg-white text-primary hover:bg-gray-100 disabled:opacity-50"
//                 >
//                   {isSubmitting ? (
//                     "Subscribing..."
//                   ) : (
//                     <>
//                       Subscribe to Newsletter
//                       <ArrowRight className="w-4 h-4 ml-2" />
//                     </>
//                   )}
//                 </Button>
//               </form>

//               {/* Privacy Notice */}
//               <p className="text-xs opacity-70 text-center">
//                 By subscribing, you agree to our{" "}
//                 <a href="/privacy" className="underline hover:opacity-100">
//                   Privacy Policy
//                 </a>{" "}
//                 and{" "}
//                 <a href="/terms" className="underline hover:opacity-100">
//                   Terms of Service
//                 </a>
//               </p>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsletterSignup;
