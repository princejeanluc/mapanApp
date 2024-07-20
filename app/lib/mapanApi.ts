import {getCookie, getCookies} from "cookies-next";
import {getUser} from "@/app/lib/auth/auth";

const URL_API =  "http://192.168.1.105:8000"
function getUserInf(router:any,callback:any){
    try {
        const user  =  getUser().then(
            (data:any)=>{
                callback(data)
            }
        ).catch((error:any)=>{
            router.push("/auth/login/")
        })


        // const jsonData = await response.json();
    } catch (error) {
        console.log(error)
    }
}

function getAllEventFromUser(router:any, callback:any){
    try {
        console.log(getCookies())
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+getCookie("token"));

        fetch(URL_API+'/events/getEventFromUser/',{headers:headers,credentials:"include"})
            .then((res)=>{
                if (res.status == 200){
                    return   res.json()
                }else{
                    console.log(res)
                    router.push("/auth/login")
                }
            }).then((data)=>{
            callback(data)
        })


        // const jsonData = await response.json();
    } catch (error) {
        console.log(error)
    }
}

function getAllEventType(router:any, callback:any){
    try {
        console.log(getCookies())
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+getCookie("token"));

        fetch(URL_API+'/eventtypes/',{headers:headers,credentials:"include"})
            .then((res)=>{
                if (res.status == 200){
                    return   res.json()
                }else{
                    console.log(res)
                    router.push("/auth/login")
                }
            }).then((data)=>{
                console.log(data)
                callback(data.results)
        })


        // const jsonData = await response.json();
    } catch (error) {
        console.log(error)
    }
}




export {getUserInf, getAllEventFromUser, getAllEventType}