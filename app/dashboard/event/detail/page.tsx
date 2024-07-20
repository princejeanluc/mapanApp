'use client'
import {Suspense, useContext, useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";
import {deleteMapanEvent, getEventtype, getMapanEvent, getUserFromOrganizer} from "@/app/lib/api/mapan";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot , faClock } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {
    CreateEventAddressContext, CreateEventDatetimeContext, CreateEventDescriptionContext, CreateEventImageContext,
    CreateEventTitleContext,
    CreateEventTypeContext
} from "@/app/dashboard/event/create/page";
import Image from "next/image";
import Loading from "@/app/dashboard/event/detail/Loading";

export  default  function Page(){
    const [idCurrentEvent, setIdCurrentEvent] = useState(Number(getCookie("idCurrentEvent")))
    const [mapanEvent, setMapanEvent] = useState(null)
    const [user, setUser] = useState(null)
    const [eventType, setEventType] = useState(null)
    const router = useRouter()
    useEffect(()=>{
        getMapanEvent(idCurrentEvent).then(async (data: any) => {
            console.log(data["creator"])
            console.log(data)
            const user = (await getUserFromOrganizer(data["creator"]))["data"]
            const type = (await getEventtype(data["eventType"]))
            setUser(user)
            setEventType(type)
            setMapanEvent(data)
        })
    },[])




    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return <>
        <Suspense  fallback={<Loading/>}>
        <div className="p-2">
            <div className="w-full flex justify-center">
                <figure className="cursor-pointer relative w-3/4">
                    <span className="absolute z-10 bottom-4 right-4 flex items-center px-2 bg-yellow-100 text-yellow-800 text-xs text-center font-medium  rounded dark:bg-yellow-900 dark:text-yellow-300 ">{eventType? eventType["label"] : "event"}</span>
                        <Image
                            className="w-full block rounded"
                            src={mapanEvent ? mapanEvent["image"] : ""}
                            alt={mapanEvent ? mapanEvent["image"] : ""}
                            width={2048}
                            height={2048}
                            quality={100}
                        />
                    <figcaption
                        className="absolute px-4 text-lg text-white bottom-0 bg-gradient-to-t from-black/75 to-gray-500/0 w-full  rounded-b h-1/5 ">
                        <div className={`flex justify-between`}>
                            <div className="absolute bottom-0 flex items-center mb-3 ">
                                <Image
                                    className="w-7 h-7 rounded-full"
                                    src="https://thispersondoesnotexist.com/"
                                    alt="profil"
                                    width={100}
                                    height={100}
                                    quality={100}
                                />
                                <div className="ml-1 font-medium dark:text-white  ">
                                    <p>{user ? user["username"] : "Unknown"}</p>
                                </div>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
            <div className={`mt-2 p-4`}>
                <div className={``}>
                    <h5 className="text-xl font-bold dark:text-white">{mapanEvent ? mapanEvent["title"] : ""}</h5>


                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                    </div>

                </div>
                <div className={`flex justify-between mt-2 text-sm`}>
                    <p className={``}><FontAwesomeIcon icon={faLocationDot}/> <span
                        className={`ml-1`}>{mapanEvent ? mapanEvent["address"] : ""}</span>
                    </p>
                    <p className={``}><FontAwesomeIcon icon={faClock}/> <span
                        className={`ml-1`}>{mapanEvent ? mapanEvent["date"] : ""}</span></p>
                </div>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                <p className="mt-5 text-sm text-justify text-gray-900 dark:text-white">{(mapanEvent ? mapanEvent["description"] : "").slice(0,255) + " ..."}</p>
                <div className={`mt-5 flex justify-between mt-2`}>
                    <button type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-1/3"
                            onClick={()=>{
                                if (mapanEvent!=null){
                                    deleteMapanEvent(mapanEvent["pk"]).then((data)=>{
                                        Swal.fire({
                                            title: 'Created!',
                                            text: "Event Successfully deleted",
                                            icon: 'success',
                                            confirmButtonText: 'ok',
                                            didClose:()=>{
                                                router.push("/dashboard/event/")
                                            }})
                                    }).catch((error)=>{
                                        Swal.fire({
                                            title: 'failed !',
                                            text: error.toString(),
                                            icon: 'error',
                                            confirmButtonText: 'ok',
                                        })
                                    })
                                }
                            }
                    }>Delete
                    </button>
                    <button type="button"
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 w-1/2"
                            onClick={()=>{
                                if (mapanEvent!= null){
                                    // @ts-ignore
                                    console.log(mapanEvent)
                                    setCookie("mapanEvent_title",mapanEvent["title"])
                                    setCookie("mapanEvent_type",mapanEvent["eventType"])
                                    setCookie("mapanEvent_address",mapanEvent["address"])
                                    setCookie("mapanEvent_description",mapanEvent["description"])
                                    setCookie("mapanEvent_date",mapanEvent["date"])
                                    setCookie("mapanEvent_time",mapanEvent["time"])
                                    setCookie("mapanEvent_image",mapanEvent["image"])
                                    setCookie("mapanEvent_pk",mapanEvent["pk"])
                                    router.push("/dashboard/event/modify/")
                                }
                            }}
                    >Modify
                    </button>
                </div>
            </div>
        </div>
        </Suspense>
    </>
}