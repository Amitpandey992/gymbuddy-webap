import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Main = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files
          ? URL.createObjectURL(e.target.files[0])
          : "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add logic to submit the form data to your API or backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {formData.profilePicture ? (
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 flex items-center justify-center h-full">
                No Image
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-2 text-sm"
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="mt-2 w-full"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="mt-2 w-full"
          />
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
            className="mt-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Main;
