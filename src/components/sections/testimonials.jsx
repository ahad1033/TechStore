import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content:
        "TechStore has become my go-to destination for all things tech. The quality of products and customer service is exceptional. I recently purchased the iPhone 15 Pro and the delivery was lightning fast!",
      product: "iPhone 15 Pro",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content:
        "As a developer, I need reliable equipment. TechStore delivered exactly what I needed with their MacBook Air M2. The performance is outstanding and the price was competitive.",
      product: "MacBook Air M2",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Creator",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content:
        "I love the Sony WH-1000XM5 headphones I got from TechStore. The sound quality is incredible and the noise cancellation is perfect for my video editing work. Highly recommended!",
      product: "Sony WH-1000XM5",
    },
    // {
    //   id: 4,
    //   name: "David Thompson",
    //   role: "Gaming Streamer",
    //   avatar:
    //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    //   rating: 5,
    //   content:
    //     "The PlayStation 5 I ordered arrived in perfect condition. TechStore's packaging was excellent and the setup was seamless. My viewers love the improved streaming quality!",
    //   product: "PlayStation 5",
    // },
    // {
    //   id: 5,
    //   name: "Lisa Wang",
    //   role: "Photographer",
    //   avatar:
    //     "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    //   rating: 5,
    //   content:
    //     "My Canon EOS R6 Mark II from TechStore has transformed my photography business. The image quality is stunning and the customer support team was incredibly helpful with my questions.",
    //   product: "Canon EOS R6 Mark II",
    // },
    // {
    //   id: 6,
    //   name: "James Wilson",
    //   role: "Business Owner",
    //   avatar:
    //     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    //   rating: 5,
    //   content:
    //     "I've been buying from TechStore for my company's IT needs for over a year now. Their bulk pricing and reliable delivery have made them our preferred supplier. Excellent service!",
    //   product: "Various IT Equipment",
    // },
  ];

  return (
    <section
    // className="bg-gradient-to-br from-blue-600 via-white to-purple-600"
    >
      <div className="container section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Quote className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their TechStore experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/80" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Product */}
              <div className="mb-4">
                <span className="text-sm text-gray-500">Purchased:</span>
                <p className="text-sm font-medium text-primary">
                  {testimonial.product}
                </p>
              </div>

              {/* Author */}
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
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
