import { useState } from "react";

export const useSelectModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [userNeedLogin, setUserNeedLogin] = useState(false);
    const [userNeedSignup, setUserNeedSignup] = useState(false);

    const handleClickOnCloseIcon = () => {
        setOpenModal(false);
    }
    return {
        openModal,
        setOpenModal,
        userNeedLogin,
        userNeedSignup,
        setUserNeedLogin,
        setUserNeedSignup,
        handleClickOnCloseIcon
    };
};
