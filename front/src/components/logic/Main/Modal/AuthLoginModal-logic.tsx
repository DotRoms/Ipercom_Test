import { useAuthModal } from "../../../../context/ModalContext";

import { AuthModal } from "../../../render/Main/Modal/AuthModale";

export const AuthModalLogic = () => {

    // useContext from ModalContext for handling the modal
    const {
        userNeedLogin,
        handleClickOnCloseIcon,
        setUserNeedLogin,
        setUserNeedSignup,
    } = useAuthModal();

    return (
        
        <AuthModal
            userNeedLogin={userNeedLogin}
            handleClickOnCloseIcon={handleClickOnCloseIcon}
            setUserNeedLogin={setUserNeedLogin}
            setUserNeedSignup={setUserNeedSignup}
        />
    );
};
