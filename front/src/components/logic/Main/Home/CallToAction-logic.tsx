import { useAuthModal } from "../../../../context/ModalContext";

import { CallToAction } from "../../../render/Main/Home/CallToAction";

// CallToAction logic component
// This component is the logic part of the call to action component
export const CallToActionLogic = () => {

    // useContext from ModalContext for handling the modal
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
