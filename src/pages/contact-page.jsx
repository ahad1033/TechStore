import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const schema = yup
    .object({
      firstName: yup
        .string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      lastName: yup
        .string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      phone: yup
        .string()
        .matches(
          /^(013|014|015|016|017|018|019)\d{8}$/,
          "Please enter a valid Bangladeshi phone number (11 digits)"
        )
        .required("Phone number is required"),
      subject: yup
        .string()
        .min(5, "Subject must be at least 5 characters")
        .required("Subject is required"),
      message: yup
        .string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submission:", data);
    reset();
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "support@techstore.com",
      subtitle: "We'll respond within 24 hours",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "01636428995",
      subtitle: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      content: "365 Mobarokshah Road Narayanganj",
      subtitle: "Visit us anytime",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM",
      subtitle: "Saturday: 10:00 AM - 4:00 PM",
    },
  ];

  if (isSubmitSuccessful) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold  mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <Button onClick={() => window.location.reload()}>
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Page Header */}
        <div className="text-center section-padding">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or need help? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 section-padding">
          {/* Contact Form */}
          <Card className="p-8">
            <div className="flex items-center space-x-2 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">
                Send us a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    First Name *
                  </label>
                  <Input
                    {...register("firstName")}
                    placeholder="John"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    Last Name *
                  </label>
                  <Input
                    {...register("lastName")}
                    placeholder="Doe"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Email Address *
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Phone Number
                </label>
                <Input
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Subject *
                </label>
                <Input
                  {...register("subject")}
                  placeholder="How can we help you?"
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Message *
                </label>
                <Textarea
                  {...register("message")}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold  mb-6">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                Reach out to us through any of these channels. We're here to
                help with any questions about our products or services.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold ">
                        {info.title}
                      </h3>
                      <p className=" font-medium">
                        {info.content}
                      </p>
                      <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium ">
                    What are your shipping options?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We offer free shipping on orders over $50 and express
                    shipping for urgent orders.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium ">
                    What is your return policy?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day return policy for all unused items in
                    original packaging.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium ">
                    Do you offer technical support?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we provide technical support for all products purchased
                    from our store.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
