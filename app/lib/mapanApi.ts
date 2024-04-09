import {getCookie, getCookies} from "cookies-next";

function getUserInf(router:any,callback:any){
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+getCookie("token"));

        fetch('http://127.0.0.1:8000/organizer/'+getCookie("id")+'/',{headers:headers,credentials:"include"})
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

function getAllEventFromUser(router:any, callback:any){
    try {
        console.log(getCookies())
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+getCookie("token"));

        fetch('http://127.0.0.1:8000/events/getEventFromUser/',{headers:headers,credentials:"include"})
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

        fetch('http://127.0.0.1:8000/eventtypes/',{headers:headers,credentials:"include"})
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