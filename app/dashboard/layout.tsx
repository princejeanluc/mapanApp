'use client'
import NavBar from '@/app/ui/dashboard/NavBar'
import {Fragment, createContext, useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import BottomNavigation from "@/app/ui/dashboard/BottomNavigation";
import {getAllEventFromUser, getUserInf} from "@/app/lib/mapanApi"
const Cookies = require("js-cookie")
const UserContext = createContext(null)
const EventsFromOwnerContext = createContext(null)

export default  function Layout({children}:{children:React.ReactNode}){
    const router = useRouter()
    const [user, setUser]= useState(null)
    const [events , setEvents]= useState(null)

    useEffect( ()=>{
        getUserInf(router,setUser)
        getAllEventFromUser(router, setEvents)
    }, [])
    return (<>
        <UserContext.Provider value={user}>
        <EventsFromOwnerContext.Provider value={events}>
            <div className=" bg-white relative">
                <NavBar></NavBar>
                <div >
                    {children}
                </div>
                <BottomNavigation></BottomNavigation>
            </div>
        </EventsFromOwnerContext.Provider>
        </UserContext.Provider>
    </>)
}
export {UserContext, EventsFromOwnerContext, Layout}