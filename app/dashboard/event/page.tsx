'use client'
import SearchComponent from "@/app/ui/dashboard/event/SearchComponent";
import JumbotronImage from "@/app/ui/dashboard/event/JumbotronImage";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {useContext} from "react";
import {EventsFromOwnerContext} from "@/app/dashboard/layout";


export default function Page(){

    const events:any = useContext(EventsFromOwnerContext)
    console.log(events)
    // @ts-ignore
    return <>
        <div >
            <div className={`h-20 p-5 `}>
                <SearchComponent>

                </SearchComponent>
            </div>

            <div className={`p-5 md:p-10 h-full`}>

                <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 2, 900: 3}} >
                    <Masonry gutter="10px">
                        {events ? events.map((event:any, i:number) => (
                            <div className={``} key={event.pk}>
                                <img className={`rounded `}
                                    key={i}
                                    src={"http://127.0.0.1:8000/" + event.image}
                                    style={{width: "100%", display: "block"}}
                                />
                            <div className={`relative block top-0 left-0 w-4/5 bg-amber-300`}></div>
                            </div>

                        )) : <div></div>}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    </>
}