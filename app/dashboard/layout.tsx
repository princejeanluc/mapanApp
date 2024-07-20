'use client'
import NavBar from '@/app/ui/dashboard/Layout/NavBar'
import {Fragment, createContext, useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import BottomNavigation from "@/app/ui/dashboard/Layout/BottomNavigation";
import {getAllEventFromUser, getUserInf} from "@/app/lib/mapanApi"
const Cookies = require("js-cookie")
const UserContext = createContext(null)
const EventsFromOwnerContext = createContext(null)
// user => {pk: 1, username: 'prince', email: 'lucprince14@gmail.com', first_name: '', last_name: ''}
export default  function Layout({children}:{children:React.ReactNode}){
    const router = useRouter()
    const [user, setUser]= useState(null)

    const [organizer, setOrganizer]= useState(null)

    useEffect( ()=>{
        getUserInf(router,(data:any)=>{
            setUser(data)
            console.log(data)
        })
        //getAllEventFromUser(router, setEvents)
    }, [])
    return (<>
        <UserContext.Provider value={user}>
            <div className=" bg-white relative">

                <NavBar></NavBar>
                <div className={`my-20`}>
                    {children}
                </div>
                <BottomNavigation></BottomNavigation>
            </div>
        </UserContext.Provider>
    </>)
}
export {UserContext, EventsFromOwnerContext, Layout}