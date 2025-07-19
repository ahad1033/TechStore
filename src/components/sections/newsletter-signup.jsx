/* eslint-disable no-unused-vars */
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight } from "lucide-react";

import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useCreateSubscriberMutation } from "@/store/features/subscribersApi";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const [subscribe, { isLoading }] = useCreateSubscriberMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Please enter your email address!");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dataToSend = {
        email,
      };
      const res = await subscribe(dataToSend).unwrap();

      if (res.success) {
        toast.success(
          res.message ||
            `Thanks for signing up with ${email} to get our latest updates!`
        );

        setEmail("");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message);
    }
  };

  // Animation variants for the bouncing effect
  const bounceAnimation = {
    y: [0, -25, 0],
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
    <section className="container section-padding ">
      <div className="bg-primary/10 rounded-lg">
        <motion.div
          className="bg-primary rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary opacity-95"></div>

          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 lg:p-16">
            <div className="flex flex-col items-center justify-center space-y-6 order-2 lg:order-1">
              <motion.div className="relative" animate={bounceAnimation}>
                <motion.img
                  src="/images/blue-headphone.png"
                  alt="Premium Headphones"
                  className="w-64 h-64 lg:w-100 lg:h-100 object-contain drop-shadow-2xl"
                  animate={floatingAnimation}
                />

                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-75 -z-10"></div>
              </motion.div>

              <motion.div
                className="text-center text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl lg:text-2xl font-bold mb-2">
                  Premium Audio Experience
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Discover the latest in audio technology
                </p>
              </motion.div>
            </div>

            <motion.div
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 lg:p-8 bg-white/5 backdrop-blur-sm border-white/20 shadow-xl">
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
                        className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white focus:ring-white/20 h-12 lg:h-14 lg:text-lg rounded-xl"
                        required
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading || !email}
                        className="w-full bg-white text-primary hover:bg-gray-100 disabled:opacity-50 h-12 lg:h-14 text-base lg:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isLoading ? (
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

                  <p className="text-xs lg:text-sm text-white/60 text-center leading-relaxed">
                    By subscribing, you agree to our Privacy Policy & Terms of
                    Service
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
