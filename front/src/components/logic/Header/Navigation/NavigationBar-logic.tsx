import { useAuthModal } from "../../../../context/ModalContext";
import { useAuth } from "../../../../context/userIsConnected";
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
