'use client'
import DateTimePicker from "@/app/ui/dashboard/Components/DateTimePicker";
import {createContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {getCookie, getCookies} from "cookies-next";
import Swal from "sweetalert2";
import {createMapanEvent, Eventtype, getEventtypes} from "@/app/lib/api/mapan";
import CreateEventLayout from "@/app/ui/dashboard/BaseLayouts/CreateEventLayout";
import {createEvent} from "@/app/lib/utils/crud";
import { motion } from "framer-motion"

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
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
        <CreateEventTitleContext.Provider value={title}>
            <CreateEventAddressContext.Provider value={address}>
                <CreateEventDescriptionContext.Provider value={description}>
                    <CreateEventTypeContext.Provider value={type}>
                        <CreateEventImageContext.Provider value={image}>
                            <CreateEventDatetimeContext.Provider value={datetime}>
                                <CreateEventLayout
                                    createEvent={createEvent}
                                    setTitle={setTitle}
                                    setDescription={setDescription}
                                    setAddress={setAddress}
                                    setDatetime={setDatetime}
                                    setType={setType}
                                    setImage={setImage}
                                ></CreateEventLayout>
                            </CreateEventDatetimeContext.Provider>
                        </CreateEventImageContext.Provider>
                    </CreateEventTypeContext.Provider>
                </CreateEventDescriptionContext.Provider>
            </CreateEventAddressContext.Provider>
        </CreateEventTitleContext.Provider>
        </motion.div>
    </>
}

export {CreateEventTitleContext,CreateEventAddressContext ,CreateEventDescriptionContext ,CreateEventTypeContext,  CreateEventImageContext,CreateEventDatetimeContext }
