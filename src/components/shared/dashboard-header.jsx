import { Link } from "react-router-dom";

import { Button } from "../ui/button";

export default function DashboardHeader({ title, button, href }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>

      {button && (
        <Link to={href}>
          <Button>{button}</Button>
        </Link>
      )}

      {/* <Badge variant="outline">{productsData?.total || 0} categories</Badge> */}
    </div>
  );
}
