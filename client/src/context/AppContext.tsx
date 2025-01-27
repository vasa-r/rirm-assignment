/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loginContext: (token: string) => void;
  logoutContext: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: AppProviderProps) => {
  const initialData = window.localStorage.getItem("token") || null;

  const [token, setToken] = useState(initialData);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  const loginContext = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/main/");
  };

  const logoutContext = () => {
    setToken(null);

    localStorage.removeItem("token");
    navigate("/login");
  };

  const values = {
    token,
    setToken,
    loginContext,
    logoutContext,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AppProvider;
