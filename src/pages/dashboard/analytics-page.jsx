import { useSelector } from "react-redux";
import { Users, Package, DollarSign, ShoppingCart } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useCurrentUser } from "@/store/slices/authSlice";
import { useGetAnalyticsSummaryQuery } from "@/store/features/analyticsApi";

export default function AnalyticsPage() {
  const user = useSelector(useCurrentUser)?.user;

  const isAdmin = user?.role === "admin";

  const { data: analyticsData, isLoading } = useGetAnalyticsSummaryQuery();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <Badge variant={isAdmin ? "default" : "secondary"}>
            {isAdmin ? "Admin" : "User"} Dashboard
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Loading...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const metrics = isAdmin
    ? [
        {
          title: "Total Sales",
          value: `$${analyticsData?.data?.totalSell?.toLocaleString() || 0}`,
          description: "Total revenue",
          icon: DollarSign,
        },
        {
          title: "Total Orders",
          value: analyticsData?.data?.totalOrder?.toLocaleString() || 0,
          description: "Orders this month",
          icon: ShoppingCart,
        },
        {
          title: "Total Products",
          value: analyticsData?.data?.totalProduct?.toLocaleString() || 0,
          description: "Active products",
          icon: Package,
        },
        {
          title: "Total Users",
          value: analyticsData?.data?.totalUser?.toLocaleString() || 0,
          description: "Registered users",
          icon: Users,
        },
      ]
    : [
        {
          title: "Total Purchases",
          value: analyticsData?.data?.totalSpent?.toLocaleString() || 0,
          description: "Your total purchases",
          icon: ShoppingCart,
        },
        {
          title: "Order Count",
          value: analyticsData?.data?.totalOrders?.toLocaleString() || 0,
          description: "Total orders placed",
          icon: ShoppingCart,
        },
        {
          title: "Total Spent",
          value: `$${analyticsData?.data?.totalSpent?.toLocaleString() || 0}`,
          description: "Total amount spent",
          icon: DollarSign,
        },
        {
          title: "Wishlist Items",
          value: 2,
          description: "Items in wishlist",
          icon: Package,
        },
      ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Badge variant={isAdmin ? "default" : "secondary"}>
          {isAdmin ? "Admin" : "User"} Dashboard
        </Badge>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
                {/* <div
                  className={`flex items-center text-xs ${getMetricColor(
                    metric.trend
                  )} mt-2`}
                >
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {Math.abs(metric.trend)}% from last month
                </div> */}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      {isAdmin && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Integrate with Chart.js or Recharts
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analyticsData?.topProducts
                  ?.slice(0, 5)
                  .map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{product.name}</span>
                      <Badge variant="outline">{product.sales} sold</Badge>
                    </div>
                  )) || (
                  <div className="text-muted-foreground text-sm">
                    No data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User-specific charts */}
      {!isAdmin && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>Your recent purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Integrate with Chart.js or Recharts
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Favorite Categories</CardTitle>
              <CardDescription>Categories you shop most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analyticsData?.favoriteCategories
                  ?.slice(0, 5)
                  .map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="outline">{category.count} items</Badge>
                    </div>
                  )) || (
                  <div className="text-muted-foreground text-sm">
                    No data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
