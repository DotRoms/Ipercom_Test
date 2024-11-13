import { useAuthModal } from "../../../../context/ModalContext";
import { useAuth } from "../../../../context/userIsConnected";

import { NavigationBar } from "../../../render/Header/Navigation/NavigationBar";

// NavigationBar logic component
// This component is the logic part of the navigation bar
export const NavigationBarLogic = () => {

    // useContext from ModalContext for handling the modal
    const {
        openModal,
        userNeedLogin,
        userNeedSignup,
        setUserNeedLogin,
        setUserNeedSignup,
        setOpenModal,
    } = useAuthModal();

    // useContext from userIsConnected for checking if user is connected
    const {userIsConnected, handleDisconnectUser} = useAuth();

    return (
        <NavigationBar
            openModal={openModal}
            userNeedLogin={userNeedLogin}
            userNeedSignup={userNeedSignup}
            setOpenModal={setOpenModal}
            setUserNeedLogin={setUserNeedLogin}
            setUserNeedSignup={setUserNeedSignup}
            userIsConnected={userIsConnected}
            handleDisconnectUser={handleDisconnectUser}
        />
    );
};
