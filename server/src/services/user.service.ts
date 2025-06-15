import { GenericResponse, signupRequest, signupResponse } from "../shared/type";
import User from "./../models/user.model";
import { generateToken } from "../config/generateToken";

export class UserService {
    static async registerUser(
        userData: signupRequest
    ): Promise<GenericResponse<signupResponse>> {
        try {
            const user = await User.create(userData);
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
                    token: generateToken(user._id),
                },
                message: "User registered successfully",
            };
        } catch (error) {
            console.error(error);
            throw new Error("error during user registration...");
        }
    }
}
