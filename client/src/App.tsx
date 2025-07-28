import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import SignUp from "./pages/Signup";
import axiosInstance from "./shared/interceptor";
import { requestPermissionAndGetToken } from "./firebase.messaging";
import OtpVerify from "./pages/OtpVerify";
import CompleteProfile from "./pages/CompleteProfile";
import { LandingPage } from "./pages/LandingPage";
import ThemePage from "./pages/ThemePage";
import CreateProfile from "./pages/RegisterStepTwo";
import RegisterWithOtp from "./pages/RegisterWithOtp";

function App() {
    const { user, setUser, accessToken, fetchUserProfile } = useAppContext();

    useEffect(() => {
        const registerFCMToken = async () => {
            const token = await requestPermissionAndGetToken();

            if (token) {
                await axiosInstance.post("/save-fcm-token", {
                    userId: user?.id,
                    fcmToken: token,
                });
            }
        };

        registerFCMToken();
    }, []);

    useEffect(() => {
        if (accessToken && !user) {
            fetchUserProfile()
                .then((response) => setUser(response.data.user))
                .catch(() => localStorage.removeItem("accessToken"));
        }
    }, [accessToken]);

    return (
        <Router>
            <Routes>
                {accessToken ? (
                    <>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route
                            path="/login"
                            element={<Navigate to="/" replace />}
                        />
                        <Route
                            path="/signup"
                            element={<Navigate to="/" replace />}
                        />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterWithOtp />} />
                        <Route path="/verify-otp" element={<OtpVerify />} />
                        <Route
                            path="/create-profile"
                            element={<CreateProfile />}
                        />
                        <Route
                            path="/completeProfile"
                            element={<CompleteProfile />}
                        />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/theme" element={<ThemePage />} />
                        <Route
                            path="/membership"
                            element={<Navigate to="/" replace />}
                        />
                    </>
                )}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
