import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "@/lib/axios";
import { UserType } from "@/types/users";
import { PostLoginRequestType } from "@/types/auth";
import { useRouter } from "next/router";

interface AuthContextType {
  user: UserType | null;
  login: (data: PostLoginRequestType) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getMe = async () => {
    try {
      const response = await axios.get("/users/me");
      const data = response.data;
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  };

  const login = async (data: PostLoginRequestType) => {
    const response = await axios.post("/auth/login", data);
    const token = await response.data.accessToken;
    localStorage.setItem("login", token);
    await getMe();
    router.push("/mydashboard");
  };

  const logout = () => {
    localStorage.removeItem("login");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
