const StatSection = () => {
  return (
    <div className="container section-padding grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      <div>
        <div className="text-3xl font-bold text-primary mb-2">50K+</div>
        <div className="text-muted-foreground">Happy Customers</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
        <div className="text-muted-foreground">Average Rating</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-primary mb-2">98%</div>
        <div className="text-muted-foreground">Satisfaction Rate</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-primary mb-2">24/7</div>
        <div className="text-muted-foreground">Customer Support</div>
      </div>
    </div>
  );
};

export default StatSection;
