// AuthContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
    userIsConnected: boolean;
    handleConnectUser: (token: string) => void;
    handleDisconnectUser: () => void;
}

// Create the context for managing the user state.
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook to access the user context.
// This hook will throw an error if it is used outside of an AuthContextProvider.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// This component wraps the application to provide access to the context.
export const AuthProvider = ({ children }: { children: ReactNode }) => {

  // Using the userIsConnected state to manage user state.
    const [userIsConnected, setUserIsConnected] = useState(
        () => !!localStorage.getItem("token")
    );

    // Function to connect the user
    const handleConnectUser = (token: string) => {
        localStorage.setItem("token", token);
        setUserIsConnected(true);
    };

    // Function to disconnect the user
    const handleDisconnectUser = () => {
        localStorage.removeItem("token");
        setUserIsConnected(false);
    };

    return (
        <AuthContext.Provider
            value={{ userIsConnected, handleConnectUser, handleDisconnectUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
