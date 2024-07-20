import DateTimePicker from "@/app/ui/dashboard/Components/DateTimePicker";
import CreateEventFormInput from "@/app/ui/dashboard/Components/CreateEventFormInput";
import {useContext, useEffect, useRef, useState} from "react";
import {
    CreateEventAddressContext,
    CreateEventDatetimeContext, CreateEventDescriptionContext, CreateEventImageContext,
    CreateEventTitleContext,
    CreateEventTypeContext
} from "@/app/dashboard/event/modify/page";
import {Eventtype, getEventtypes, updateMapanEvent} from "@/app/lib/api/mapan";
import {createEvent, updateEvent} from "@/app/lib/utils/crud";
import {useRouter} from "next/navigation";
import {getCookie, setCookie} from "cookies-next";
import {getEventTypeFromeventTypeList} from "@/app/lib/utils/libs";

// @ts-ignore
export  default function  ModifyEventLayout({updateEvent, setTitle, setDescription, setAddress, setDatetime,setType , setImage}){
    //Context
    const title = useContext(CreateEventTitleContext);
    const type = useContext(CreateEventTypeContext);
    const address = useContext(CreateEventAddressContext);
    const description = useContext(CreateEventDescriptionContext)
    const datetime = useContext(CreateEventDatetimeContext);
    const image = useContext(CreateEventImageContext);
    const mapanEvent = getCookie("mapanEvent")
    //Router
    const router = useRouter()
    const datetime_value = getCookie("mapanEvent_date")+" "+getCookie("mapanEvent_time")
    const [eventtypes, setEventtypes] = useState<Eventtype[]>([])

    const imageRef = useRef(null)
    const fileRef = useRef(null)





    useEffect(()=>{
        setDatetime(datetime_value)
        setTitle(getCookie("mapanEvent_title"))
        setType(getCookie("mapanEvent_type"))
        setDescription(getCookie("mapanEvent_description"))
        setImage(getCookie("mapanEvent_image"))
        setAddress(getCookie("mapanEvent_address"))
        getEventtypes().then((data:any)=>{
            console.log(data)
            setEventtypes(data)
        })
    },[])
    return <>
        <div className={`bg-white p-1 overflow-scroll w-full mb-20`}>
            <form className="p-4 md:p-5" onSubmit={(e) => {
                e.preventDefault()
                updateEvent(getCookie("mapanEvent_pk")||0,title ||"", description||"", type||0, address||"", image, datetime||"", router)
            }}>
                <div className="grid gap-4 mb-4 grid-cols-1 p-2">
                    <CreateEventFormInput label={`title`} setAttr={setTitle} placeholder={"Event Title"} value={getCookie("mapanEvent_title")}></CreateEventFormInput>
                    <div className="col-span-2">
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" rows={3} value={getCookie("mapanEvent_description")}
                                  onChange={(e) => {
                                      setDescription(e.target.value)
                                  }}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write event description here"></textarea>
                    </div>
                    <CreateEventFormInput label={`address`} setAttr={setAddress} placeholder={"Event Address"} value={getCookie("mapanEvent_address")}></CreateEventFormInput>
                    <div className={` flex flex-col items-center`}>
                        <DateTimePicker datetime={datetime} setDatetime={setDatetime}></DateTimePicker>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="EventType"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="EventType" onChange={(e) => {
                            setType(e.target.value)
                        }} defaultValue={getCookie("mapanEvent_type")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">

                            {
                                eventtypes.map((eventtype: any, i: number) => {


                                    return <option value={eventtype.pk}
                                                   key={eventtype.pk}>{eventtype.label}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className={`flex  flex-col  items-center`}>
                        <div>
                            <label htmlFor="image" className={`block`}>Change poster</label>
                        </div>
                        <div className={`relative`}>
                            <img ref={imageRef}
                                 className="absolute w-1/3 z-10 bottom-2 right-2  border-2 transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
                                 src={getCookie("mapanEvent_image")}
                                 alt="image description" />
                            <input ref={fileRef}
                                   className="hidden"
                                   id="file_input" type="file" name={`image`} onChange={(e) => {
                                const files = e.target.files
                                if (files && files.length != 0) {
                                    // @ts-ignore
                                    imageRef.current.src = URL.createObjectURL(files[0])
                                    // @ts-ignore
                                    setImage(files[0])
                                } else {
                                    setImage(getCookie("mapanEvent_image"))
                                }
                            }}/>

                            <img ref={imageRef}
                                 className="block mt-1 transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
                                 src={getCookie("mapanEvent_image")}
                                 alt="image description" onClick={() => {
                                // @ts-ignore
                                fileRef.current.click()
                            }}/>
                        </div>

                    </div>
                </div>
                <div className={`flex justify-center`}>
                    <button type="submit"
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                        Update
                    </button>
                </div>
            </form>

        </div>
    </>
}