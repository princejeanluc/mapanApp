'use client'
import {useEffect, useRef, useState} from "react";
import {Modal} from "flowbite";
import {Datepicker} from "flowbite-react";


// @ts-ignore
export  default function DateTimePicker({datetime, setDatetime}){
    const now = (new Date())
    const TimePickerModal = useRef(null);
    const [time , setTime]= useState(now.toTimeString().split(" ")[0])
    const [date, setDate]= useState(now.toDateString())

    useEffect(()=>{
        setDatetime(`${date} ${time}`)
        console.log(datetime)
    }, [time, date])
    const options:any = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
            'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
            console.log('DateTimePicker is hidden');
        },
        onShow: () => {
            console.log('DateTimePicker is shown');
        },
        onToggle: () => {
            console.log('DateTimePicker has been toggled');
        },
    };
    // instance options object
    const instanceOptions = {
        id: 'timepicker-modal',
        override: true
    };
    const timePickerWindow = new Modal(TimePickerModal.current, options, instanceOptions);
    return <>
        <div className={``}>
            <button type="button" onClick={() => {
                timePickerWindow.show()
            }} data-modal-target="timepicker-modal" data-modal-toggle="timepicker-modal"
                    className="min-w-60 inline-flex text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                <svg className="w4 h-4 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24"
                     fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"/>
                </svg>
                {datetime}
            </button>
        </div>


        {/*Main Modal */}
        <div id="timepicker-modal" ref={TimePickerModal} tabIndex={-1} aria-hidden="true"
             className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
            <div className="relative p-4 w-full max-w-[23rem] max-h-full">
                {/*Modal Content*/}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    {/*Modal header*/}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Schedule
                        </h3>
                        <button type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="timepicker-modal" onClick={()=>{timePickerWindow.hide()}}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/*Modal body*/}
                    <div className={`m-4`}>
                        <Datepicker onSelectedDateChanged ={(date)=>{setDate(date.toLocaleDateString().split("/").reverse().join("-"))}}></Datepicker>
                    </div>
                    <div className="p-4 pt-0">
                        <div inline-datepicker={"true"} datepicker-autoselect-today={"true"}
                             className="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"></div>
                        <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                            Pick your time
                        </label>
                        <div className="flex">
                            <input type="time" id="time" name={"time"}
                                   className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={time} onChange={(e)=>{setTime(e.target.value)}} required/>
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}