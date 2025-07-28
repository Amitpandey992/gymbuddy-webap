import axiosInstance from "@/shared/interceptor";
import { OtpResponse, VerifyOtpResponse } from "@/shared/interface";
import { GenericResponse } from "@/shared/types";

export class AuthService {
    static async sendOtp(
        email: string
    ): Promise<GenericResponse<OtpResponse | null>> {
        try {
            const response = await axiosInstance.post(
                "/user/auth/send-otp",
                email
            );
            return response.data;
        } catch (error: unknown) {
            console.error("error during sending opt", error);
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                data: null,
                message: errorMessage,
            };
        }
    }

    static async verifyOtp(
        email: string,
        otp: string
    ): Promise<GenericResponse<VerifyOtpResponse | null>> {
        try {
            const response = await axiosInstance.post("/user/auth/verify-otp", {
                email,
                otp,
            });
            return response.data;
        } catch (error: unknown) {
            console.error("error during sending opt", error);
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                data: null,
                message: errorMessage,
            };
        }
    }
}
