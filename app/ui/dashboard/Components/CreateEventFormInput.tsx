import {Dispatch, SetStateAction} from "react";


export  default function  CreateEventFormInput({label,setAttr,placeholder, value}:any){
    return <>
        <div className="col-span-2">
            <label htmlFor={label}
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type="text" name="title" id="title" onChange={(e) => {
                setAttr(e.target.value)
            }} value={value? value: ""}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder={placeholder} required/>
        </div>
    </>
}