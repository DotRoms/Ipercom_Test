import { useAuth } from "../../../../context/userIsConnected";
import { Index } from "../../../render/Main/Home/Index";

export const IndexLogic = () => {

    const { userIsConnected } = useAuth();
    console.log(userIsConnected)
    return (
        <Index userIsConnected={userIsConnected}/>
    )
}