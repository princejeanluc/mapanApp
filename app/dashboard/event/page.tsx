'use client'
import SearchComponent from "@/app/ui/dashboard/Components/SearchComponent";
import {useContext, useEffect, useState} from "react";
import {EventsFromOwnerContext} from "@/app/dashboard/layout";
import EventList from "@/app/ui/dashboard/Components/EventList";
import {ListEvents} from "@/app/lib/utils/crud";



export default function Page(){
    const [events , setEvents]= useState()
    const [updateListEvents , setUpdateListEvents]= useState(false)
    useEffect(()=>{
        ListEvents( setEvents)
    },[updateListEvents])

    return <>
        <div >
            <div className={`h-20 p-5 `}>
                <SearchComponent>

                </SearchComponent>
            </div>

            <div className={`p-5 md:p-10 h-full`}>

                <EventList evs={events}></EventList>
            </div>
        </div>
    </>
}