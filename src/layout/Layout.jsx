import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import bg from '../assets/background.svg';

export function Layout() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        setIsUserLoggedIn(!!localStorage.getItem('user'));
    }, []);
    return(
    <div className="h-screen w-full  flex justify-center items-center  bg-center bg-cover bg-amber-50">
        <div className={`h-full w-[430px] shadow-[0px_0px_8px_3px_#444444c4] overflow-auto ${isUserLoggedIn ? "bg-[url('/background.png')] bg-center bg-cover p-[15px]" : "bg-[url('/background-index.png')] bg-center bg-cover"}`}>
            <Outlet />
        </div>
    </div>
    )
}