import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastProvider, Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
}

const SignUp: React.FC = () => {
  const { signup } = useAppContext();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.gender
    ) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      toast({
        title: "Error",
        description: "Phone number must be 10 digits.",
        variant: "destructive",
      });
      return;
    }

    try {
      await signup(formData);
      toast({
        title: "Success",
        description: "Sign-up successful!",
        variant: "default",
      });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-full max-w-md p-6">
          <CardContent>
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <Label>Gender</Label>
                <div className="flex items-center mt-2 space-x-4">
                  <Label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Male
                  </Label>
                  <Label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Female
                  </Label>
                  <Label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Other
                  </Label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
        <Toast />
      </div>
    </ToastProvider>
  );
};

export default SignUp;
