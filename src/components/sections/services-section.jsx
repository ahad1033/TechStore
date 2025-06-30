import { CreditCard, RefreshCw, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Easy Returns",
    description: "30 day return policy",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Flexible Payment",
    description: "Multiple payment options",
  },
];
const ServicesSection = () => {
  return (
    <div className="container section-padding">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex justify-between space-x-3"
          >
            <div className="flex items-center mx-auto space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
