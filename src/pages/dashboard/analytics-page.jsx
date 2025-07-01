import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  BarChart3,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  useGetDashboardAnalyticsQuery,
  useGetUserAnalyticsQuery,
} from "@/store/features/analyticsApi";
import { useCurrentUser } from "@/store/slices/authSlice";

export default function AnalyticsPage() {

  const user = useSelector(useCurrentUser)?.user;

  const isAdmin = user?.role === "admin";

  const { data: dashboardAnalytics, isLoading: dashboardLoading } =
    useGetDashboardAnalyticsQuery(user?.role, { skip: !user?.role });

  const { data: userAnalytics, isLoading: userLoading } =
    useGetUserAnalyticsQuery(user?.id, { skip: !user?.id || isAdmin });

  const analytics = isAdmin ? dashboardAnalytics : userAnalytics;
  const loading = isAdmin ? dashboardLoading : userLoading;

  // eslint-disable-next-line no-unused-vars
  const getMetricIcon = (metric) => {
    const icons = {
      totalSales: DollarSign,
      totalOrders: ShoppingCart,
      totalProducts: Package,
      totalUsers: Users,
      totalPurchases: ShoppingCart,
      orderCount: ShoppingCart,
    };
    return icons[metric] || BarChart3;
  };

  const getMetricColor = (trend) => {
    return trend >= 0 ? "text-green-600" : "text-red-600";
  };

  const getMetricTrendIcon = (trend) => {
    return trend >= 0 ? TrendingUp : TrendingDown;
  };

  if (loading) {
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
          value: `$${analytics?.totalSales?.toLocaleString() || 1200}`,
          description: "Total revenue this month",
          trend: analytics?.salesTrend || 15,
          icon: DollarSign,
        },
        {
          title: "Total Orders",
          value: analytics?.totalOrders?.toLocaleString() || 8,
          description: "Orders this month",
          trend: analytics?.ordersTrend || 5,
          icon: ShoppingCart,
        },
        {
          title: "Total Products",
          value: analytics?.totalProducts?.toLocaleString() || 18,
          description: "Active products",
          trend: analytics?.productsTrend || 2,
          icon: Package,
        },
        {
          title: "Total Users",
          value: analytics?.totalUsers?.toLocaleString() || 2,
          description: "Registered users",
          trend: analytics?.usersTrend || 1,
          icon: Users,
        },
      ]
    : [
        {
          title: "Total Purchases",
          value: analytics?.totalPurchases?.toLocaleString() || 450,
          description: "Your total purchases",
          trend: analytics?.purchasesTrend || 5,
          icon: ShoppingCart,
        },
        {
          title: "Order Count",
          value: analytics?.orderCount?.toLocaleString() || 5,
          description: "Total orders placed",
          trend: analytics?.orderTrend || 1,
          icon: ShoppingCart,
        },
        {
          title: "Total Spent",
          value: `$${analytics?.totalSpent?.toLocaleString() || 450}`,
          description: "Total amount spent",
          trend: analytics?.spentTrend || 5,
          icon: DollarSign,
        },
        {
          title: "Wishlist Items",
          value: analytics?.wishlistCount?.toLocaleString() || 2,
          description: "Items in wishlist",
          trend: analytics?.wishlistTrend || 1,
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
          const TrendIcon = getMetricTrendIcon(metric.trend);

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
                <div
                  className={`flex items-center text-xs ${getMetricColor(
                    metric.trend
                  )} mt-2`}
                >
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {Math.abs(metric.trend)}% from last month
                </div>
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
                {analytics?.topProducts?.slice(0, 5).map((product, index) => (
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
                {analytics?.favoriteCategories
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
