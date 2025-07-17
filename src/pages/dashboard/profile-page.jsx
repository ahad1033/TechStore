import { useState } from "react";
import { useSelector } from "react-redux";
import { Mail, Phone, User, Home } from "lucide-react";

import { useCurrentUser } from "@/store/slices/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder for the form component
const ProfileForm = () => (
  <div className="flex items-center justify-center text-muted-foreground p-8">
    <p>Profile editing form will be here.</p>
  </div>
);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const user = useSelector(useCurrentUser)?.user;

  // Fallback initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full">
      {/* Cover and Avatar Section */}
      <div className="relative mb-16">
        {/* Cover Image */}
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/1200x300/E2E8F0/4A5568?text=Cover+Image"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-12 left-8">
          <Avatar className="w-24 h-24 border-4 border-background">
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
            <AvatarFallback className="text-2xl">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Tabs List */}
        <div className="absolute bottom-0 right-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="details">Profile Details</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tabs Content Section */}
      <Tabs value={activeTab} className="w-full">
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user?.name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user?.email || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{user?.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Home className="w-5 h-5 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {user?.address || "Not provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Update Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
