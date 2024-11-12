// AuthContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
  userIsConnected: boolean;
  handleConnectUser: (token: string) => void;
  handleDisconnectUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userIsConnected, setUserIsConnected] = useState(() => !!localStorage.getItem("token"));

  const handleConnectUser = (token: string) => {
    localStorage.setItem("token", token);
    setUserIsConnected(true);
  };

  const handleDisconnectUser = () => {
    localStorage.removeItem("token");
    setUserIsConnected(false);
  };

  return (
    <AuthContext.Provider value={{ userIsConnected, handleConnectUser, handleDisconnectUser }}>
      {children}
    </AuthContext.Provider>
  );
};
