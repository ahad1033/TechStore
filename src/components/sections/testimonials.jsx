import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { TESTIMONEALS_DATA } from "@/lib/data";

import SectionHeading from "../shared/section-heading";

const Testimonials = () => {
  const firstLineTestimoneal = TESTIMONEALS_DATA.slice(
    0,
    Math.ceil(TESTIMONEALS_DATA.length / 2)
  );
  const secondLineTestimoneal = TESTIMONEALS_DATA.slice(
    Math.ceil(TESTIMONEALS_DATA.length / 2)
  );

  function MarqueeLine({ testimoneals, direction, speed = 50 }) {
    return (
      <div className="relative overflow-hidden py-4">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: direction === "left" ? [0, -1920] : [-1920, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {[
            ...testimoneals,
            ...testimoneals,
            ...testimoneals,
            ...testimoneals,
          ].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="min-w-[320px] w-[320px] h-[250px]"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-6 rounded-xl h-full flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-primary/80" />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed break-words whitespace-pre-line">
                  “{testimonial.content}”
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      <div className="container section-padding">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Don't just take our word for it. Here's what our satisfied customers
            have to say about their TechStore experience."
          quote={
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Quote className="w-8 h-8 text-primary" />
            </div>
          }
        />

        <MarqueeLine
          testimoneals={firstLineTestimoneal}
          direction="left"
          speed={40}
        />

        <MarqueeLine
          testimoneals={secondLineTestimoneal}
          direction="right"
          speed={50}
        />
      </div>
    </section>
  );
};

export default Testimonials;
