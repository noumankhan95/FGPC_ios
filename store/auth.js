import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const authCtx = createContext({
  userInfo: { name: "", cnic: "", token: "" },
  isloggedIn: false,
  setuserInfo: (user, loggedin) => {},
  LogoutUser: async () => {},
});

const authCtxProvider = (props) => {
  const [userDetails, setuserDetails] = useState();
  const [isloggedIn, setisloggedIn] = useState();

  const changeUserDetails = (u, loggedin) => {
    setuserDetails((p) => u);
    setisloggedIn((p) => loggedin);
  };
  const loguserOut = async () => {
    try {
      console.log("here remove");

      await AsyncStorage.removeItem("FGPC_token");
      await AsyncStorage.removeItem("FGPC_user");
      console.log("removed");
      setisloggedIn((p) => false);
    } catch (e) {
      console.log(e);
    }
  };
  const store = {
    userInfo: userDetails,
    setuserInfo: changeUserDetails,
    isloggedIn,
    LogoutUser: loguserOut,
  };
  return <authCtx.Provider value={store}>{props.children}</authCtx.Provider>;
};

export default authCtxProvider;
