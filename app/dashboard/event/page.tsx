'use client'
import SearchComponent from "@/app/ui/dashboard/event/SearchComponent";
import {useContext} from "react";
import {EventsFromOwnerContext} from "@/app/dashboard/layout";
import EventList from "@/app/ui/dashboard/event/EventList";


export default function Page(){

    const events:any = useContext(EventsFromOwnerContext)

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