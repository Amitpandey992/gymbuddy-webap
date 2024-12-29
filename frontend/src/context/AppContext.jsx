import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(null);
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = (data) => {
    return axiosInstance
      .post("/users/login", data)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.token);
        setAccessToken(response.data.token);
        setUser(response.data.user);
        return response;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const signup = (data) => {
    return axiosInstance
      .post("/users/register", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.token);
        setAccessToken(response.data.token);
        setUser(response.data.user);
        return response
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const fetchUserProfile = () => {
    return axiosInstance
      .get("/users/profile")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        login,
        signup,
        fetchUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
