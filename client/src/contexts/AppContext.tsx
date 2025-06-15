import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axiosInstance from "@/shared/interceptor";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppContextProps {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (data: Record<string, any>) => Promise<any>;
  signup: (data: Record<string, any>) => Promise<any>;
  fetchUserProfile: () => Promise<any>;
  fetchAllUsers: () => Promise<any>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await axiosInstance.get<User>("/users/profile");
          console.log(response.data, "user data");
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user profile:", err);
          localStorage.removeItem("accessToken");
          setAccessToken(null);
        }
      }
    };

    fetchUser();
  }, []);

  const login = (data: Record<string, any>) => {
    return axiosInstance
      .post<{ token: string; user: User }>("/users/login", data)
      .then(
        (response: {
          data: {
            token: React.SetStateAction<string | null>;
            user: React.SetStateAction<User | null>;
          };
        }) => {
          localStorage.setItem("accessToken", response.data.token as string);
          setAccessToken(response.data.token);
          setUser(response.data.user);
          return response;
        }
      )
      .catch((err: any) => {
        console.log(err);
        throw err;
      });
  };

  const signup = (data: Record<string, any>) => {
    return axiosInstance
      .post<{ token: string; user: User }>("/users/register", data)
      .then(
        (response: {
          data: {
            token: React.SetStateAction<string | null>;
            user: React.SetStateAction<User | null>;
          };
        }) => {
          localStorage.setItem("accessToken", response.data.token as string);
          setAccessToken(response.data.token);
          setUser(response.data.user);
          return response;
        }
      )
      .catch((err: any) => {
        console.log(err);
        throw err;
      });
  };

  const fetchUserProfile = () => {
    return axiosInstance
      .get<User>("/users/profile")
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        console.log(err);
        throw err;
      });
  };

  const fetchAllUsers = () => {
    return axiosInstance
      .get<User[]>("/users")
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        console.log(err);
        throw err;
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
        fetchAllUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export { AppContextProvider, useAppContext };
