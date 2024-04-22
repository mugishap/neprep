import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { getToken } from "../utils";
const CommonContext = createContext<any>({})

export const useCommon = () => {
    return useContext(CommonContext);
}

interface Props {
    children?: ReactNode
}

const CommonContextProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(async () => await AsyncStorage.getItem("token") ? true : false)
    getToken().then((res) => {
        console.log(res)
    })
    
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