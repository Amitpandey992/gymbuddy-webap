import { GenericResponse } from "../shared/type";
import User from "./../models/user.model";
import { generateToken } from "../utils/generateToken";
import bcryptjs from "bcryptjs";
import Otp from "./../models/otp.model";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import EmailTemplates from "../utils/emailTemplates";
export class UserService {
    static async loginUser(
        email: string,
        password: string
    ): Promise<GenericResponse<any>> {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    success: false,
                    data: null,
                    message: "User not found",
                };
            }
            if (!password) {
                return {
                    success: false,
                    data: null,
                    message: "Password is required...",
                };
            }

            if (!user.password) {
                return {
                    success: false,
                    data: null,
                    message: "User has no password set",
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
                    user,
                    token: generateToken(user._id.toString()),
                },
                message: "Login successful",
            };
        } catch (error: any) {
            console.error(error);
            throw new Error("Error during login");
        }
    }

    static async sendOtpForVerification(
        email: string
    ): Promise<GenericResponse<any>> {
        try {
            const twentyFourHoursAgo = new Date(
                Date.now() - 24 * 60 * 60 * 1000
            );
            const otpCount = await Otp.countDocuments({
                email,
                createdAt: { $gte: twentyFourHoursAgo },
            });

            if (otpCount >= 3) {
                return {
                    success: false,
                    data: null,
                    message:
                        "OTP limit exceeded. You can only request 3 OTPs per day.",
                };
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            await Otp.create({ email, otp });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const htmlTemplate = EmailTemplates.getOTPTemplate(otp);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "🔐 Your Secure OTP Code",
                html: htmlTemplate,
                text: `Your OTP for signup is: ${otp}. This code will expire in 10 minutes. Please do not share this code with anyone.`,
            };

            const result = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", result.messageId);

            return {
                success: true,
                data: { otp },
                message: "OTP sent successfully...",
            };
        } catch (error: any) {
            console.error("error during sending otp", error);
            return {
                success: false,
                data: null,
                message: error?.response?.data?.message || error?.message,
            };
        }
    }

    static async verifyOtp(
        email: string,
        otp: string
    ): Promise<GenericResponse<any>> {
        try {
            const validOtp = await Otp.findOne({ email, otp });
            if (!validOtp) {
                return {
                    success: false,
                    data: null,
                    message: "otp verification failed",
                };
            }

            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({ email, isVerified: true });
            } else {
                user.isVerified = true;
                await user.save();
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY!,
                {
                    expiresIn: "1d",
                }
            );

            return {
                success: true,
                data: {
                    token,
                },
                message: "Otp verified and sign up successfully",
            };
        } catch (error: any) {
            console.error("error during otp verification", error);
            return {
                success: false,
                data: null,
                message:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Opt verification failed",
            };
        }
    }

    static async registerUserWithUserNameAndPassword(
        userData: {
            fullName: string;
            password: string;
        },
        token: string
    ): Promise<GenericResponse<any>> {
        try {
            console.log(token);
            if (!token) {
                return {
                    success: false,
                    data: null,
                    message: "Token is required",
                };
            }
            console.log(token);

            if (!userData.fullName || !userData.password) {
                return {
                    success: false,
                    data: null,
                    message: "username and password is required",
                };
            }

            const decoded = (await jwt.verify(
                token,
                process.env.JWT_SECRET_KEY!
            )) as {
                id: string;
            };

            const user = await User.findById(decoded.id);

            if (!user) {
                return {
                    success: false,
                    data: null,
                    message: "User not found for the given token",
                };
            }

            if (user.password) {
                return {
                    success: false,
                    data: null,
                    message: "User already has a password",
                };
            }

            if (
                user.phoneNumber &&
                user.gender &&
                user.dateOfBirth &&
                user.profession &&
                user.city &&
                user.state
            ) {
                return {
                    success: false,
                    data: null,
                    message:
                        "User registration is already completed. Cannot update again.",
                };
            }

            const hashPassword = await bcryptjs.hash(userData.password, 10);

            user.fullName = userData.fullName;
            user.password = hashPassword;

            await user.save();

            return {
                success: true,
                data: {
                    id: user._id.toString(),
                    fullName: user.fullName || "",
                    email: user.email,
                    token: generateToken(user._id.toString()),
                },
                message: "User registered successfully",
            };
        } catch (error: any) {
            console.error(
                "Error during user registration with name and password",
                error
            );
            return {
                success: false,
                data: null,
                message: error?.respones?.data?.message || error?.message,
            };
        }
    }

    static async completeUserRegistration(
        userData: {
            phoneNumber: number;
            gender: string;
            dateOfBirth: Date;
            profilePicture: string;
            profession: string;
            city: string;
            state: string;
            latitude: number;
            longitude: number;
        },
        token: string
    ): Promise<GenericResponse<any>> {
        try {
            if (!userData) {
                return {
                    success: false,
                    data: null,
                    message: "All fields are required...",
                };
            }
            const decoded = (await jwt.verify(
                token,
                process.env.JWT_SECRET_KEY!
            )) as {
                id: string;
            };

            const user = await User.findById(decoded.id);

            if (!user) {
                return {
                    success: false,
                    data: null,
                    message: "User not found for the given token",
                };
            }

            if (
                user.phoneNumber &&
                user.gender &&
                user.dateOfBirth &&
                user.profession &&
                user.city &&
                user.state
            ) {
                return {
                    success: false,
                    data: null,
                    message:
                        "User registration is already completed. Cannot update again.",
                };
            }

            user.phoneNumber = userData.phoneNumber;
            user.gender = userData.gender as "male" | "female" | "other";
            user.dateOfBirth = userData.dateOfBirth;
            user.profilePicture = userData.profilePicture;
            user.profession = userData.profession;
            user.city = userData.city;
            user.state = userData.state;
            user.latitude = userData.latitude;
            user.longitude = userData.longitude;

            await user.save();

            return {
                success: true,
                data: user,
                message: "User information updated successfully",
            };
        } catch (error: any) {
            console.error(
                "Error during user registration with user informations",
                error
            );
            return {
                success: false,
                data: null,
                message: error?.respones?.data?.message || error?.message,
            };
        }
    }

    static async getAllCoUser(user: any): Promise<GenericResponse<any>> {
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

    static async filterUsers(
        minAge: number,
        maxAge: number,
        city: string,
        state: string
    ): Promise<GenericResponse<any>> {
        try {
            // let filters: any = {};
            // if (city) filters.city = city;
            // if (state) filters.state = state;
            // if (minAge || maxAge) {
            //     const currentYear = new Date().getFullYear();
            //     if (minAge) {
            //         filters.dateOfBirth = {
            //             ...filters.dateOfBirth,
            //             $lte: new Date(`${currentYear - Number(minAge)}-12-31`),
            //         };
            //     }
            //     if (maxAge) {
            //         filters.dateOfBirth = {
            //             ...filters.dateOfBirth,
            //             $gte: new Date(`${currentYear - Number(maxAge)}-01-01`),
            //         };
            //     }
            // }
            if (city) {
                const findUsersByCity = await User.findOne({ city });
                if (!findUsersByCity) {
                    return {
                        success: false,
                        data: null,
                        message: "No users exists in this city",
                    };
                } else {
                    return {
                        success: true,
                        data: findUsersByCity,
                        message: "Users fetched successfully with this filter",
                    };
                }
            }
            if (state) {
                const findUsersBystate = await User.findOne({ state });
                if (!findUsersBystate) {
                    return {
                        success: false,
                        data: null,
                        message: "No users exists in this state",
                    };
                } else {
                    return {
                        success: true,
                        data: findUsersBystate,
                        message: "Users fetched successfully with this filter",
                    };
                }
            }

            return {
                success: false,
                data: null,
                message: "Please provide at least one filter criteria",
            };
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching filtered users");
        }
    }
}
