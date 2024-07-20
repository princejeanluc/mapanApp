import DateTimePicker from "@/app/ui/dashboard/Components/DateTimePicker";
import CreateEventFormInput from "@/app/ui/dashboard/Components/CreateEventFormInput";
import {useContext, useEffect, useRef, useState} from "react";
import {
    CreateEventAddressContext,
    CreateEventDatetimeContext, CreateEventDescriptionContext, CreateEventImageContext,
    CreateEventTitleContext,
    CreateEventTypeContext
} from "@/app/dashboard/event/create/page";
import {Eventtype, getEventtypes} from "@/app/lib/api/mapan";
import {createEvent} from "@/app/lib/utils/crud";
import {useRouter} from "next/navigation";

// @ts-ignore
export  default function  CreateEventLayout({createEvent, setTitle, setDescription, setAddress, setDatetime,setType , setImage}){
    //Context
    const title = useContext(CreateEventTitleContext);
    const type = useContext(CreateEventTypeContext);
    const address = useContext(CreateEventAddressContext);
    const description = useContext(CreateEventDescriptionContext)
    const datetime = useContext(CreateEventDatetimeContext);
    const image = useContext(CreateEventImageContext);

    //Router
    const router = useRouter()

    const [eventtypes, setEventtypes] = useState<Eventtype[]>([])

    const imageRef = useRef(null)
    const fileRef = useRef(null)


    useEffect(()=>{
        getEventtypes().then((data:any)=>{
            console.log(data)
            setEventtypes(data)
        })
    },[])
    return <>
        <div className={`bg-white p-1 overflow-scroll w-full mb-20`}>
            <form className="p-4 md:p-5" onSubmit={(e) => {
                e.preventDefault()
                createEvent(title ||"", description||"", type||0, address||"", image, datetime||"", router)
            }}>
                <div className="grid gap-4 mb-4 grid-cols-1 p-2">
                    <CreateEventFormInput label={`title`} setAttr={setTitle} placeholder={"Event Title"} value={title}></CreateEventFormInput>
                    <div className="col-span-2">
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" rows={3}
                                  onChange={(e) => {
                                      setDescription(e.target.value)
                                  }}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write event description here"></textarea>
                    </div>
                    <CreateEventFormInput label={`address`} setAttr={setAddress} placeholder={"Event Address"} value={address}></CreateEventFormInput>
                    <div className={``}>
                        <DateTimePicker datetime={datetime} setDatetime={setDatetime}></DateTimePicker>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="EventType"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="EventType" onChange={(e) => {
                            setType(e.target.value)
                        }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">

                            {
                                eventtypes.map((eventtype: any, i: number) => {
                                    if (i == 0) return <option defaultValue={1} value={eventtype.pk}
                                                               key={eventtype.pk}>{eventtype.label}</option>
                                    return <option value={eventtype.pk}
                                                   key={eventtype.pk}>{eventtype.label}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className={`flex  flex-col  items-center`}>
                        <div>
                            <label htmlFor="image" className={`block`}>Choose poster</label>
                        </div>
                        <div className={``}>
                            <input ref={fileRef}
                                className="hidden"
                                id="file_input" type="file" name={`image`} onChange={(e) => {
                                const files = e.target.files
                                if (files && files.length != 0) {
                                    // @ts-ignore
                                    imageRef.current.src = URL.createObjectURL(files[0])
                                    // @ts-ignore
                                    setImage(files[0])
                                }
                            }}/>

                            <img ref={imageRef}
                                 className="block mt-1 transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
                                 src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
                                 alt="image description" onClick={()=>{
                                     // @ts-ignore
                                    fileRef.current.click()
                            }}/>
                        </div>

                    </div>
                </div>
                <div className={`flex justify-center`}>
                    <button type="submit"
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Add new Event
                    </button>
                </div>
            </form>

        </div>
    </>
}