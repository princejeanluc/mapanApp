'use client'
import DateTimePicker from "@/app/ui/dashboard/Components/DateTimePicker";
import {createContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {getCookie, getCookies} from "cookies-next";
import Swal from "sweetalert2";
import {createMapanEvent, Eventtype, getEventtypes} from "@/app/lib/api/mapan";
import CreateEventLayout from "@/app/ui/dashboard/BaseLayouts/CreateEventLayout";
import { updateEvent} from "@/app/lib/utils/crud";
import ModifyEventLayout from "@/app/ui/dashboard/BaseLayouts/ModifyEventLayout";


const CreateEventTitleContext = createContext(null)
const CreateEventAddressContext = createContext(null)
const CreateEventDescriptionContext = createContext(null)
const CreateEventTypeContext = createContext(null)
const CreateEventImageContext = createContext(null)
const CreateEventDatetimeContext = createContext(null)

export  default  function Page(){
    const [title , setTitle ] = useState(null)
    const [address , setAddress ] = useState(null)
    const [description , setDescription ] = useState(null)
    const [type , setType ] = useState(null)
    const [image , setImage ] = useState(null)
    const [datetime , setDatetime ] = useState(null)

    const [eventtypes , setEventtypes ] = useState<Eventtype[]>([{
        pk : 0,
        label : "Default type",
    }])
    const router = useRouter()


    useEffect(()=>{
         getEventtypes().then((eventtypes)=>{
             setEventtypes([...eventtypes])
         })

    }, [])



    const imageRef = useRef<HTMLImageElement>(null)





    return <>
        <CreateEventTitleContext.Provider value={title}>
            <CreateEventAddressContext.Provider value={address}>
                <CreateEventDescriptionContext.Provider value={description}>
                    <CreateEventTypeContext.Provider value={type}>
                        <CreateEventImageContext.Provider value={image}>
                            <CreateEventDatetimeContext.Provider value={datetime}>
                                <ModifyEventLayout
                                    updateEvent={updateEvent}
                                    setTitle={setTitle}
                                    setDescription={setDescription}
                                    setAddress={setAddress}
                                    setDatetime={setDatetime}
                                    setType={setType}
                                    setImage={setImage}
                                ></ModifyEventLayout>
                            </CreateEventDatetimeContext.Provider>
                        </CreateEventImageContext.Provider>
                    </CreateEventTypeContext.Provider>
                </CreateEventDescriptionContext.Provider>
            </CreateEventAddressContext.Provider>
        </CreateEventTitleContext.Provider>
    </>
}

export {CreateEventTitleContext,CreateEventAddressContext ,CreateEventDescriptionContext ,CreateEventTypeContext,  CreateEventImageContext,CreateEventDatetimeContext }
