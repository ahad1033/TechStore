"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  User,
  Heart,
  Camera,
  Search,
  Grid2X2,
  Gamepad2,
  Smartphone,
  Headphones,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import useBoolean from "@/hooks/use-boolean";

import { ThemeToggle } from "../theme/theme-toggle";
import { logout, useCurrentUser } from "@/store/slices/authSlice";
import { useCurrentCart } from "@/store/slices/cartSlice";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Dashboard", path: "/dashboard" },
];

const megaMenuCategories = [
  {
    name: "Electronics",
    icon: <Smartphone className="w-5 h-5" />,
    items: [
      { name: "Smartphones", path: "/products?category=smartphones" },
      { name: "Laptops", path: "/products?category=laptops" },
      { name: "Tablets", path: "/products?category=tablets" },
      { name: "Smartwatches", path: "/products?category=smartwatches" },
    ],
  },
  {
    name: "Audio",
    icon: <Headphones className="w-5 h-5" />,
    items: [
      { name: "Wireless Earbuds", path: "/products?category=earbuds" },
      { name: "Bluetooth Speakers", path: "/products?category=speakers" },
      { name: "Gaming Headsets", path: "/products?category=headsets" },
      { name: "Home Audio", path: "/products?category=home-audio" },
    ],
  },
  {
    name: "Gaming",
    icon: <Gamepad2 className="w-5 h-5" />,
    items: [
      { name: "Gaming Consoles", path: "/products?category=consoles" },
      {
        name: "Gaming Accessories",
        path: "/products?category=gaming-accessories",
      },
      { name: "PC Gaming", path: "/products?category=pc-gaming" },
      { name: "VR Headsets", path: "/products?category=vr" },
    ],
  },
  {
    name: "Photography",
    icon: <Camera className="w-5 h-5" />,
    items: [
      { name: "DSLR Cameras", path: "/products?category=dslr" },
      { name: "Mirrorless Cameras", path: "/products?category=mirrorless" },
      { name: "Lenses", path: "/products?category=lenses" },
      { name: "Accessories", path: "/products?category=camera-accessories" },
    ],
  },
];

// ----------------------------------------------------------------------

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutLoading = useBoolean();

  const currentUser = useSelector(useCurrentUser)?.user;

  const cartProducts = useSelector(useCurrentCart).items;

  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

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
            <div
              className="hidden lg:col-span-8 lg:flex items-center gap-6 relative"
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onMouseEnter={() => setActiveMegaMenu("categories")}
                className="flex items-center space-x-1 hover:text-black  text-lg"
              >
                <Grid2X2 className="w-5 h-5" />
                <span className="">Categories</span>
              </button>

              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>

              {activeMegaMenu === "categories" && (
                <div className="absolute top-full left-0 mt-2 w-max bg-background border shadow-lg grid grid-cols-4 gap-6 p-6 rounded-xl z-40">
                  {megaMenuCategories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center space-x-2 font-semibold text-primary mb-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <ul className="space-y-1">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.path}
                              className="text-sm text-foreground bg-background dark:text-foreground hover:text-primary dark:hover:text-primary"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
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

export default Navbar;
