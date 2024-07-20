import {createMapanEvent, getMapanEventsFromOrganizer, updateMapanEvent} from "@/app/lib/api/mapan";
import Swal from "sweetalert2";


export const createEvent =( title : string, description: string, type: number , address : string,image:any, datetime: string ,router:any)=>{
    try{

        createMapanEvent(title || "", description||"", type||0, image, address||"", datetime||"")
            .then((res)=>{
                if (res.status == 201){
                    Swal.fire({
                        title: 'Created!',
                        text: "Event Successfully created",
                        icon: 'success',
                        confirmButtonText: 'ok',
                        didClose:()=>{
                            router.push("/dashboard/event/")
                        }
                    })

                }else{
                    res.text().then((value:string)=>{
                        Swal.fire({
                            title: 'Something went wrong!',
                            text: value,
                            icon: 'error',
                            confirmButtonText: 'close',
                        })
                    })

                }
            })
    } catch (e:any){
        Swal.fire({
            title: 'Something went Wrong!',
            text: e.text(),
            icon: 'error',
            confirmButtonText: 'close',
        })
    }

}


export const updateEvent = (pk: string | number, title: string, description: string, type: number, address: string, image: any, datetime: string, router: any)=>{
    try{
        updateMapanEvent(Number(pk),title || "", description||"", type||0, image, address||"", datetime||"")
            .then((res)=>{
                if (res.status == 200){
                    Swal.fire({
                        title: 'Updated!',
                        text: "Event Successfully updated",
                        icon: 'success',
                        confirmButtonText: 'ok',
                        didClose:()=>{
                            router.push("/dashboard/event/")
                        }
                    })

                }else{
                    res.text().then((value:string)=>{
                        Swal.fire({
                            title: 'Something went wrong!',
                            text: value,
                            icon: 'error',
                            confirmButtonText: 'close',
                        })
                    })

                }
            })
    } catch (e:any){
        Swal.fire({
            title: 'An error has occured!',
            text: e.text(),
            icon: 'error',
            confirmButtonText: 'close',
        })
    }

}


export const ListEvents = (setListEvent:any)=> {
    getMapanEventsFromOrganizer().then((body)=>{
        setListEvent(body["data"])
    })
}