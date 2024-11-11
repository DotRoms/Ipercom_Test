import { useAuthModal } from "../../../../context/ModalContext";
import { CallToAction } from "../../../render/Main/Home/CallToAction";

export const CallToActionLogic = () => {
    const {
        openModal,
        userNeedLogin,
        userNeedSignup,
        setUserNeedLogin,
        setUserNeedSignup,
        setOpenModal,
    } = useAuthModal();

    return (
        <CallToAction
            openModal={openModal}
            userNeedLogin={userNeedLogin}
            userNeedSignup={userNeedSignup}
            setUserNeedLogin={setUserNeedLogin}
            setUserNeedSignup={setUserNeedSignup}
            setOpenModal={setOpenModal}
        />
    );
};
