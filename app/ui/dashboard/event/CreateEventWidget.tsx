import {useEffect, useState} from "react";
import {Modal} from "flowbite";
import {useRouter} from "next/navigation";
import {getAllEventType} from "@/app/lib/mapanApi";
import DateTimePicker from "@/app/ui/dashboard/event/DateTimePicker";
import {getCookie, getCookies} from "cookies-next";
import Swal from "sweetalert2";
// @ts-ignore
export default  function CreateEventWidget({CloseModal}){
    const [title , setTitle ] = useState("")
    const [address , setAddress ] = useState("")
    const [description , setDescription ] = useState("")
    const [type , setType ] = useState("1")
    const [image , setImage ] = useState(null)
    const [datetime , setDatetime ] = useState("")

    const [eventtypes , setEventtypes ] = useState<{pk:number, label:string}[]>([{
        pk:1,label:"Default Event"
    }])
    const router = useRouter()


    useEffect(()=>{
        getAllEventType(router, setEventtypes)
    }, [])
    const createEvent =()=>{
        if (image && datetime){
            const form = new FormData()
            form.append('title',title)
            form.append('description',description)
            form.append('eventType',type)
            form.append('image',image)
            form.append('address',address)
            form.append('date',datetime.split(" ")[0])
            form.append('time',datetime.split(" ")[1])
            try{
                console.log(getCookies())
                const headers = new Headers();
                headers.append('Authorization', 'Bearer '+getCookie("token"));

                fetch('http://127.0.0.1:8000/mapanevents/',{headers:headers,credentials:"include", method:"POST", body:form})
                    .then((res)=>{
                        if (res.status == 201){
                            Swal.fire({
                                title: 'Created!',
                                text: "Event Successfully created",
                                icon: 'success',
                                confirmButtonText: 'ok',
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
    }

    return <>
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/** Modal header **/}
                <div
                    className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Create New Event
                    </h3>
                    <button type="button" onClick={CloseModal}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="create-event">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={(e)=>{
                    e.preventDefault()
                    createEvent()
                    CloseModal()
                }}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="title"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name="title" id="title" onChange={(e)=>{setTitle(e.target.value)}}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Type event title" required/>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event
                                Description</label>
                            <textarea id="description" rows={3}
                                      onChange={(e)=>{setDescription(e.target.value)}}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Write event description here"></textarea>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="address"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event
                                Description</label>
                            <input type="text" name="address" id="title" onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Type event address" required/>
                        </div>
                        <div className={`flex justify-items-stretch  w-full`}>
                            <DateTimePicker datetime={datetime} setDatetime={setDatetime}></DateTimePicker>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="EventType"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select id="EventType" onChange={(e)=>{setType(e.target.value)}}
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

                        <div className={``}>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                   htmlFor="file_input">Poster</label>
                            <input
                                className="m- w-full  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input" type="file" name={`image`} onChange={(e) => { // @ts-ignore
                                setImage(e.target.files[0])
                            }}/>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG,
                                JPG or GIF </p>
                        </div>

                    </div>
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
                </form>
            </div>
        </div>
    </>
}