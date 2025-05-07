import React from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { Card as ShadCard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the type for userDetail
interface UserDetail {
  fullName?: string;
  gender?: string;
  profilePicture?: string;
  bio?: string;
}

interface CardProps {
  userDetail: UserDetail;
  likedButtonClicked: boolean;
  handleLikeButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({ userDetail, likedButtonClicked, handleLikeButtonClick }) => {
  return (
    <ShadCard className="overflow-hidden rounded-xl bg-gray-800 shadow-2xl ring-1 ring-gray-700 mt-16">
      {/* Image Section */}
      <div className="relative">
        <img
          src={
            userDetail?.profilePicture ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"
          }
          alt="User"
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 to-transparent" />
      </div>

      {/* Content Section */}
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-100 mb-1">
              {userDetail?.fullName || "User Name"}
            </h2>
            <p className="text-sm text-indigo-400 font-medium">
              {userDetail?.gender || ""}
            </p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          {userDetail?.bio ||
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, exercitationem? Magnam, harum. Maxime totam pariatur sunt. Inventore doloremque dolorem dicta!"}
        </p>
      </CardContent>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex space-x-3">
        <Button
          onClick={handleLikeButtonClick}
          className={`flex justify-center items-center flex-1 py-2.5 px-4 rounded-lg font-medium gap-2 transition-all duration-200 ${
            likedButtonClicked
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-indigo-600 text-white hover:bg-indigo-500"
          }`}
        >
          <span>{likedButtonClicked ? "Liked" : "Like"}</span>
          <ThumbsUp
            size={18}
            className={likedButtonClicked ? "fill-current" : ""}
          />
        </Button>

        <Button
          className="flex justify-center items-center gap-2 bg-gray-700 text-gray-300 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
        >
          <span>Chat</span>
          <MessageCircle size={18} />
        </Button>
      </div>
    </ShadCard>
  );
};



export default Card;
