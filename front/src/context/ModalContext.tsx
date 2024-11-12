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

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error(
            "useAuthModal must be used within an AuthModaleProvider"
        );
    }
    return context;
};

import { createContext, ReactNode, useContext } from "react";
const AuthModalContext = createContext<AuthModalContextProps | undefined>(
    undefined
);

// Fournisseur de contexte
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    const authModaleProps = useSelectModal();

    return (
        <AuthModalContext.Provider value={authModaleProps}>
            {children}
        </AuthModalContext.Provider>
    );
};
