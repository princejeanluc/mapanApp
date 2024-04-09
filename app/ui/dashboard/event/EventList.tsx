'use client'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

// @ts-ignore
export default function EventList({evs}){

    return <>
        <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 2, 900: 3}} >
            <Masonry gutter="10px">
                {evs ? evs.map((event:any, i:number) => (
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
        </ResponsiveMasonry></>
}
