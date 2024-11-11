import { useAuthModal } from "../../../../context/ModalContext";
import { NavigationBar } from "../../../render/Header/Navigation/NavigationBar";

export const NavigationBarLogic = () => {
    const {
        openModal,
        userNeedLogin,
        userNeedSignup,
        setUserNeedLogin,
        setUserNeedSignup,
        setOpenModal,
    } = useAuthModal();

    return (
        <NavigationBar
            openModal={openModal}
            userNeedLogin={userNeedLogin}
            userNeedSignup={userNeedSignup}
            setOpenModal={setOpenModal}
            setUserNeedLogin={setUserNeedLogin}
            setUserNeedSignup={setUserNeedSignup}
        />
    );
};
