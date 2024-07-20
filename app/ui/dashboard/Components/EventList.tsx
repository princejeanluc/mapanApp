'use client'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import Image from "next/image";

const URL_API = "http://192.168.1.19:8000"
// @ts-ignore
export default function EventList({evs}){
    const router = useRouter()
    return <>
        <div className={`md:p-14`}>
            <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 2, 900: 3}} >
                <Masonry gutter="10px">
                    {evs ? evs.map((event:any, i:number) => (
                        <div className={``} key={event.pk}>
                            <Image className={`rounded `}
                                   alt={event["description"]}
                                 key={event.pk}
                                 src={ URL_API+event.image}
                                 style={{width: "100%", display: "block"}}
                                 onClick={()=>{
                                     setCookie("idCurrentEvent",event.pk)
                                     router.push("/dashboard/event/detail/")
                                 }}
                                   width={100}
                                   height={100}
                            />
                            <div className={`relative block top-0 left-0 w-4/5 bg-amber-300`}></div>
                        </div>

                    )) : <div></div>}
                </Masonry>
            </ResponsiveMasonry>
        </div>
        </>
}
