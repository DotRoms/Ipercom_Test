// import { useEffect, useState } from "react";

// export const useCheckIfUserAlreadyConnect = () => {
//   const [userIsConnected, setUserIsConnected] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setUserIsConnected(!!token);
//   }, []); 

//   const handleConnectUser = (token: string) => {
//     localStorage.setItem("token", token);
//     setUserIsConnected(true);
//   };

//   const handleDisconnectUser = () => {
//     localStorage.removeItem("token");
//     setUserIsConnected(false);
//   };

//   return { userIsConnected, handleConnectUser, handleDisconnectUser };
// };
