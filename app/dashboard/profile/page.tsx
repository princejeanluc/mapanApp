'use client'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import ProfileInf from "@/app/ui/dashboard/profileInf";
import {refreshReducer} from "next/dist/client/components/router-reducer/reducers/refresh-reducer";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../layout"
const Cookies = require("js-cookie")
const Swal = require('sweetalert2')

export default function Page() {
    const user = useContext(UserContext)
    // @ts-ignore
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
                </div>
            </header>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    <main>
                        <div className="bg-white mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                            <ProfileInf user={user}></ProfileInf>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
