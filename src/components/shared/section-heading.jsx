import { Badge } from "../ui/badge";

export default function SectionHeading({ title, subtitle, badge }) {
  return (
    <div className="text-center mb-12">
      {badge && <Badge className="mb-4 px-2 py-1">{badge}</Badge>}

      <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
