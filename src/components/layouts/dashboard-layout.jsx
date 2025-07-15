import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  User,
  Heart,
} from "lucide-react";

import { logout, useCurrentUser } from "@/store/slices/authSlice";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useBoolean from "@/hooks/use-boolean";
import { ThemeToggle } from "../theme/theme-toggle";

const adminMenuItems = [
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Package, label: "Categories", path: "/dashboard/categories" },
  // { icon: Package, label: "Subcategories", path: "/dashboard/subcategories" },
  { icon: ShoppingCart, label: "Products", path: "/dashboard/products" },
  { icon: Users, label: "Orders", path: "/dashboard/orders" },
];

const userMenuItems = [
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: ShoppingCart, label: "Orders", path: "/dashboard/orders" },
  { icon: Heart, label: "Wishlist", path: "/dashboard/wishlist" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
];

export default function DashboardLayout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const logoutLoading = useBoolean();

  const user = useSelector(useCurrentUser)?.user;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAdmin = user?.role === "admin";

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    logoutLoading.onTrue();

    try {
      await dispatch(logout());

      toast.success("Logged out successfully!");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Could not log out. Try again.");
    } finally {
      logoutLoading.onFalse();
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar
        className="border-r"
        collapsible="icon"
        variant="inset"
        collapsed={!isSidebarOpen}
        onCollapsedChange={setIsSidebarOpen}
      >
        <SidebarHeader className="border-b p-4">
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">TechStore</span>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive = location.pathname === item.path;

              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full justify-start gap-3 px-6 ${
                      isActive
                        ? "bg-primary/30 text-primary  hover:bg-primary/20 font-semibold"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="border-b bg-primary sticky top-0 z-50">
          <div className="flex h-16 items-center  justify-between px-8">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-white" />

              <h1 className="text-lg font-semibold text-white">
                {menuItems.find((item) => item.path === location.pathname)
                  ?.label || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-4 ">
              {/* <Badge variant={isAdmin ? "default" : "secondary"} className="bg-white text-primary font-semibold">
                {isAdmin ? "Admin" : "User"}
              </Badge> */}

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />

                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="section-padding flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
