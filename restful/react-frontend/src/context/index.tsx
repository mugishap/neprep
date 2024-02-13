import { Dispatch } from "@reduxjs/toolkit";
import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CommonContext = createContext<any>({})

export const CommonProvider = ({ children }: any) => {

    const [showNavbar, setShowNavbar] = useState(false)

    const userSlice = useSelector((state: any) => state.userSlice)

    const dispatch: Dispatch = useDispatch();
    const isLoggedIn: boolean = userSlice.isLoggedIn;

    return (
        <CommonContext.Provider value={{
            showNavbar,
            setShowNavbar,
            dispatch,
            isLoggedIn,
            user: userSlice.user,
        }}>
            {children}
        </CommonContext.Provider>
    )
}