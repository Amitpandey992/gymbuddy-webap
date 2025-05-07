import React, { useEffect } from "react";
import {
  User,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  Twitter,
  Github,
  Mail,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/AppContext";

const Profile: React.FC = () => {
  const { fetchUserProfile } = useAppContext();

  useEffect(() => {
    const userProfile = async () => {
      await fetchUserProfile();
    };
    userProfile();
  }, [fetchUserProfile]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-56 w-full rounded-t-xl overflow-hidden mt-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
              alt="Profile cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <Card className=" bg-gray-800 rounded shadow-xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">Alex Thompson</h1>
                <p className="text-gray-400 mt-1 flex items-center gap-2">
                  <User size={18} />
                  Senior Software Engineer
                </p>
              </div>
              <Button variant="default">Edit Profile</Button>
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed">
              Passionate about creating elegant solutions to complex problems.
              Focused on React, TypeScript, and cloud architecture. Always
              learning and sharing knowledge with the developer community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold">1.2k</div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">427</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">43</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
            </div>

            <Separator />

            {/* Details */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={18} className="text-gray-400" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Briefcase size={18} className="text-gray-400" />
                TechCorp Inc.
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <LinkIcon size={18} className="text-gray-400" />
                <a href="#" className="text-indigo-400 hover:text-indigo-300">
                  portfolio.dev/alexthompson
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar size={18} className="text-gray-400" />
                Joined March 2020
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <Button variant="ghost" size="icon">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Github size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card className="mt-8 bg-gray-800 rounded-xl">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen size={20} />
              Recent Activity
            </h2>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/50"
                >
                  <Avatar className="w-12 h-12 bg-gray-600">
                    <AvatarFallback>
                      <Users size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      Contributed to React Project
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Implemented new feature and fixed critical bugs
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      2 days ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
