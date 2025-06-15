import {
    GenericResponse,
    loginResponse,
    signupRequest,
    signupResponse,
} from "../shared/type";
import User from "./../models/user.model";
import { generateToken } from "../config/generateToken";
import bcryptjs from "bcryptjs";

export class UserService {
    static async registerUser(
        userData: signupRequest
    ): Promise<GenericResponse<signupResponse | null>> {
        try {
            const findUserByEmail = await User.findOne({
                email: userData.email,
            });

            const findUserByPhoneNumber = await User.findOne({
                phoneNumber: userData.phoneNumber,
            });

            if (findUserByEmail || findUserByPhoneNumber) {
                return {
                    success: false,
                    data: null,
                    message:
                        "User already registered with this email or phone number",
                };
            }

            const hashPassword = await bcryptjs.hash(userData.password, 10);

            const user = await User.create({
                ...userData,
                password: hashPassword,
                phoneNumber: userData.phoneNumber.toString(),
            });

            return {
                success: true,
                data: {
                    id: user._id.toString(),
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber.toString(),
                    gender: user.gender,
                    dateOfBirth: user.dateOfBirth,
                    profilePicture: user.profilePicture,
                    profession: user.profession,
                    city: user.city,
                    state: user.state,
                    token: generateToken(user._id.toString()),
                },
                message: "User registered successfully",
            };
        } catch (error) {
            console.error(error);
            throw new Error("Error during user registration...");
        }
    }

    static async loginUser(
        email: string,
        password: string
    ): Promise<GenericResponse<loginResponse | null>> {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    success: false,
                    data: null,
                    message: "User not found",
                };
            }

            const isPasswordValid = await bcryptjs.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return {
                    success: false,
                    data: null,
                    message: "Invalid password",
                };
            }

            return {
                success: true,
                data: {
                    id: user._id.toString(),
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber.toString(),
                    gender: user.gender,
                    dateOfBirth: user.dateOfBirth,
                    profilePicture: user.profilePicture,
                    profession: user.profession,
                    city: user.city,
                    state: user.state,
                    token: generateToken(user._id.toString()),
                },
                message: "Login successful",
            };
        } catch (error) {
            console.error(error);
            throw new Error("Error during login");
        }
    }

    static async getAllUser(user: any): Promise<GenericResponse<any>> {
        try {
            const users = await User.find({
                _id: { $ne: user._id },
            })
                .select("-password -__v")
                .lean();

            return {
                success: true,
                data: users,
                message: "All users fetched successfully",
            };
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching all users");
        }
    }
}
