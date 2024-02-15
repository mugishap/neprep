import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useContext, useState } from "react";

const CommonContext = createContext<any>({})

export const useCommon = () => {
  return useContext(CommonContext);
}

interface Props {
  children?: ReactNode
}

const CommonContextProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(async () => (await AsyncStorage.getItem("token")) ? true : false)
  return (

    <CommonContext.Provider value={{
      user,
      setUser,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </CommonContext.Provider>

  );
}

export default CommonContextProvider;