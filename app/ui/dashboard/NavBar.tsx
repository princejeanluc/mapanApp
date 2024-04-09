import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Fragment, useContext, useState} from "react";
import {Collapse} from "react-bootstrap";
import {UserContext} from "@/app/dashboard/layout";




export default function NavBar(){
    const [navbarIsShown, setNavbarIsShown] = useState(false)
    const [userMenuIsShown, setUserMenuIsShown] = useState(false)
    // @ts-ignore
    const user:any = useContext(UserContext)

    return <>
        <nav className="hidden md:block bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button"
                            className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button" aria-expanded={userMenuIsShown ? 'true':'false'} data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                            aria-controls="user-dropdown"
                            onClick={()=> setUserMenuIsShown(!userMenuIsShown)}
                            >
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="/images/icon-user-24.png"
                             alt="user photo"/>
                    </button>

                    <div
                        className={`${userMenuIsShown? '':'hidden'} absolute right-5 top-10  z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                        id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{user? `${user.first_name} ${user.last_name}`:"unknown"}</span>
                            <span
                                className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user ? user.email : "unknwon@gmail.com"}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a href="/dashboard/event"
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user" aria-expanded={navbarIsShown ? 'true':'false'}
                            onClick={()=> setNavbarIsShown(!navbarIsShown)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                    <div
                        className={`${navbarIsShown ? '':'hidden'} items-center justify-between  w-full md:flex md:w-auto md:order-1`}
                        id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/dashboard/event"
                                   className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                   aria-current="page">Dashboard</a>
                            </li>
                        </ul>
                    </div>
            </div>
        </nav>
    </>
}