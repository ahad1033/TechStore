import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  User,
  Heart,
  Search,
  Grid2X2,
  Loader2,
  ShoppingCart,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import useBoolean from "@/hooks/use-boolean";

import { ThemeToggle } from "../theme/theme-toggle";
import { useCurrentCart } from "@/store/slices/cartSlice";
import { logout, useCurrentUser } from "@/store/slices/authSlice";
import { useGetCategoriesQuery } from "@/store/features/categoriesApi";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Dashboard", path: "/dashboard/analytics" },
];

// ----------------------------------------------------------------------

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutLoading = useBoolean();

  const { data: categoriesData, isLoading } = useGetCategoriesQuery({
    page: 1,
    limit: 9,
  });
  const categories = categoriesData?.data || [];

  const currentUser = useSelector(useCurrentUser)?.user;

  const cartProducts = useSelector(useCurrentCart).items;

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

  return (
    <nav className="sticky bg-primary text-background dark:text-foreground top-0 z-50 w-full">
      <div className="container">
        {/* Top Nav */}
        <div className="hidden lg:w-full lg:flex justify-between items-center h-10 text-base">
          <div>
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-black mr-12"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-8">
            {!currentUser ? (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-background hover:text-foreground"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            ) : (
              <Button
                size="sm"
                variant="destructiveOutline"
                onClick={handleLogout}
                disabled={logoutLoading.value}
                className="font-semibold"
              >
                Logout
              </Button>
            )}

            {/* <Link
              to="/wishlist"
              className="flex text-white hover:text-black items-center space-x-1"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </Link> */}
          </div>
        </div>

        {/* Main Nav */}
        <div className="py-4">
          <div className="flex justify-between items-center gap-4 lg:grid lg:grid-cols-12">
            {/* Logo */}
            <div className="col-span-2">
              <Link to="/" className="text-2xl font-bold">
                <img
                  src="/techstore-logo.webp"
                  alt="TechStore"
                  className="w-50 lg:w-56 mt-1"
                />
              </Link>
            </div>

            {/* Category and Search */}
            <div className="hidden lg:col-span-8 lg:flex items-center gap-6 relative">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className="
                        p-0 
                        text-lg 
                        hover:bg-transparent 
                        focus:bg-transparent 
                        active:bg-transparent 
                        data-[state=open]:bg-transparent 
                        data-[state=open]:hover:bg-transparent 
                        data-[state=open]:focus:bg-transparent 
                        !bg-transparent !hover:bg-transparent !focus:bg-transparent !active:bg-transparent"
                    >
                      <div className="flex items-center space-x-1">
                        <Grid2X2 className="w-5 h-5" />
                        <span>Categories</span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-[400px] md:w-[550px] lg:w-[750px]">
                        {isLoading ? (
                          <div className="flex justify-center items-center h-32">
                            <Loader2 className="h-8 w-8 animate-spin" />
                          </div>
                        ) : (
                          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((cat) => (
                              <ListItem
                                key={cat._id}
                                title={cat.name}
                                to={`/products?category=${cat.name.toLowerCase()}`}
                                imageUrl={cat.image}
                              >
                                {cat.description}
                              </ListItem>
                            ))}
                          </ul>
                        )}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="col-span-2 flex justify-end items-center space-x-4">
              <ThemeToggle />

              <Link
                to="/cart"
                className="relative flex items-center text-whire hover:text-black"
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-3 -right-3 h-5 w-5 text-sm flex items-center justify-center"
                >
                  {cartProducts.length}
                </Badge>
              </Link>

              <Sheet>
                <SheetTrigger className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent side="left" className="p-4">
                  <div className="space-y-4">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="block text-lg hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="pt-4 border-t">
                      <Link to="/login" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Sign In</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        className="flex items-center space-x-2 text-white hover:text-black"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Wishlist</span>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 py-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

function ListItem({ title, children, to, imageUrl }) {
  return (
    <li className="h-full">
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className="group !flex !flex-row w-full overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md h-[100px] md:h-[110px] lg:h-[120px]"
        >
          {/* Left: Fixed Image */}
          <div className="w-20 h-full flex-shrink-0 bg-muted">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Right: Content aligned with image height */}
          <div className="flex flex-col justify-center p-3 w-full overflow-hidden">
            <h4 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Navbar;
