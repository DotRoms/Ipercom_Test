import { createContext, ReactNode, useContext } from "react";

import { useSelectModal } from "../hook/useSelectModal";

interface AuthModalContextProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    userNeedLogin: boolean;
    userNeedSignup: boolean;
    setUserNeedLogin: (value: boolean) => void;
    setUserNeedSignup: (value: boolean) => void;
    handleClickOnCloseIcon: () => void;
}

// Create the context for managing the authentication modal state.
const AuthModalContext = createContext<AuthModalContextProps | undefined>(
    undefined
);

// Custom hook to access the AuthModal context.
// This hook will throw an error if it is used outside of an AuthModalProvider.
export const useAuthModal = () => {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error(
            "useAuthModal must be used within an AuthModaleProvider"
        );
    }
    return context;
};

// This component wraps the application to provide access to the context.
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {

    // Using the useSelectModal hook to manage the modal state.
    const authModaleProps = useSelectModal();

    return (
        <AuthModalContext.Provider value={authModaleProps}>
            {children}
        </AuthModalContext.Provider>
    );
};
