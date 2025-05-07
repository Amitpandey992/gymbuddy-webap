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

function App() {
  const { user, setUser, accessToken, fetchUserProfile } = useAppContext();

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
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            {/* <Route path="/membership" element={<Membership />} /> */}
           
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/membership" element={<Navigate to="/" replace />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
