import {CookieValueTypes} from "cookies-next";


export const getEventTypeFromeventTypeList= (pk: any, eventTypelist: any[])=>{
    for ( let i = 0 ; i < eventTypelist.length; i++){
        if (eventTypelist[i]["pk"] == pk ) return eventTypelist[i]
    }
}