import { useAuth } from "../../../../context/userIsConnected";

import { Index } from "../../../render/Main/Home/Index";

// IndexLogic logic component
// This component is the logic part of the home page
export const IndexLogic = () => {

    // useContext from userIsConnected for checking if user is connected
    const { userIsConnected } = useAuth();

    return <Index userIsConnected={userIsConnected} />;
};
