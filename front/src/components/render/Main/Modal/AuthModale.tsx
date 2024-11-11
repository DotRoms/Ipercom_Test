import { LoginFormLogic } from "../../../logic/Main/Modal/LoginForm-logic";
import { SignupFormLogic } from "../../../logic/Main/Modal/SignupForm-logic";

import { CloseIcon } from "../../../UI/design-system/Icons/Icons";

interface AuthModalProps {
    userNeedLogin: boolean;
    handleClickOnCloseIcon: () => void;
    setUserNeedLogin: (value: boolean) => void;
    setUserNeedSignup: (value: boolean) => void;
}

export const AuthModal = ({
    userNeedLogin,
    handleClickOnCloseIcon,
    setUserNeedLogin,
    setUserNeedSignup,
}: AuthModalProps) => {
    return (
        <div className="flex items-center text-white justify-center fixed inset-0 z-50 p-6 bg-secondary bg-opacity-50">
            <div className="flex flex-col fixed z-50 p-4 border border-primary bg-secondary shadow-xl w-[94%] sm:w-[580px] max-h-[94%] rounded-lg">
                <div className="flex justify-end">
                    <button
                        aria-label="Fermer la modal"
                        className="text-end"
                        onClick={handleClickOnCloseIcon}
                    >
                        <CloseIcon size="25" color="#FFF" />
                    </button>
                </div>
                <div className="text-xl flex gap-8 m-auto">
                    <button
                        aria-label="Afficher la modal d'inscription"
                        onClick={() => (
                            setUserNeedSignup(true), setUserNeedLogin(false)
                        )}
                        className={`${
                            !userNeedLogin &&
                            "underline underline-offset-8 decoration-primary"
                        }`}
                    >
                        Inscription
                    </button>
                    <button
                        aria-label="Afficher la modal de connexion"
                        onClick={() => (
                            setUserNeedLogin(true), setUserNeedSignup(false)
                        )}
                        className={`${
                            userNeedLogin &&
                            "underline underline-offset-8 decoration-primary"
                        }`}
                    >
                        Connexion
                    </button>
                </div>

                {userNeedLogin ? <LoginFormLogic /> : <SignupFormLogic />}
            </div>
        </div>
    );
};
