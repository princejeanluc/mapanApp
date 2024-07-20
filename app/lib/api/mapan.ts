// utils/api.ts
import {CookieValueTypes, getCookie, getCookies} from "cookies-next";
import {getUser} from "@/app/lib/auth/auth";
import exp from "node:constants";
import Swal from "sweetalert2";

const API_URL:string = 'http://192.168.1.105:8000';

export  interface Organizer {
    pk:number,
    user :number,
    linkedin :string,
    twitter :string,
    facebook :string,
    instagram :string,
    created :string,
    updated :string,
    creator: number,
}

export interface Eventtype{
    pk : number,
    label : string,
}


export  interface  MapanEvent{
    pk:number,
    title :string,
    description :string,
    date : string,
    time :string,
    longitude : number,
    latitude : number,
    address :string,
    image :string,
    eventType : number,
    organizer : number,
    created :string,
    updated :string
    creator : number
}

export interface Formula {
    pk: number;
    label: string;
    description: string;
    price: number;
    event: number;
}

export interface Ticket {
    pk: number;
    formula: number;
    firstname: string;
    lastname: string;
    email: string;
    code: string;
    barcode_image: string;
    qr_code_image: string;
    created: string;
}

export interface MapanEvent{
    title :string,
    description :string,
    date :string,
    time :string,
    longitude : number,
    latitude : number,
    address :string,
    image :string,
    eventType :number,
    organizer :number,
    created :string,
    updated :string,
    creator :number
}

//////// Utils

const initAttrForEventCreation= (title: any, description:any, type: any, image:any, datetime : any , address: any)=>{
    const form = new FormData()
    form.append('title',title?title:"")
    form.append('description',description?description:"")
    form.append('eventType',type?type:"")
    form.append('image',image?image:"")
    form.append('address',address?address:"")
    const datetimevalue : string = datetime ? datetime : Date().toString()
    form.append('date',datetimevalue.split(" ")[0])
    form.append('time',datetimevalue.split(" ")[1])
    return form
}
const initAttrForEventUpdate= (title: any, description:any, type: any, image:any, datetime : any , address: any)=>{
    const form = new FormData()
    form.append('title',title?title:"")
    form.append('description',description?description:"")
    form.append('eventType',type?type:"")
    if(typeof(image) !=typeof("")){
        form.append('image',image?image:"")
    }
    form.append('address',address?address:"")
    const datetimevalue : string = datetime ? datetime : Date().toString()
    form.append('date',datetimevalue.split(" ")[0])
    form.append('time',datetimevalue.split(" ")[1])
    return form
}



// Fonction pour obtenir le token d'authentification
const getToken = (): CookieValueTypes => {
    // Récupérer le token depuis le cookie ou le stockage local, selon votre méthode d'authentification
    // Par exemple, si vous utilisez cookies-next :
    return getCookie('token');
};

// Fonction utilitaire pour créer les options de requête avec le token d'authentification
const getAuthHeaders = (): HeadersInit => {
    const token = getToken();
    if (token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        };
    } else {
        return {
            'Content-Type': 'application/json'
        };
    }
};

const getAuthHeadersFormUrl = (): HeadersInit => {
    const token = getToken();
    if (token) {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Token ${token}`,
        };
    } else {
        return {
            'Content-Type': 'application/json'
        };
    }
};

// Fonction utilitaire pour gérer les erreurs de réponse HTTP
const handleResponse = async (response: Response): Promise<any> => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
    }
    return await response.json();
};

// CRUD pour les organisateurs

export const getOrganizer = async (): Promise<Organizer[]> => {
    const  user :any = getUser();
    const response = await fetch(`${API_URL}/organizer/crud/${user.id}/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getUserFromOrganizer = async (pk:number): Promise<any> => {
    const response = await fetch(`${API_URL}/organizer/getUserFromOrganizer/${pk}/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getOrganizerFromUser = async (): Promise<Organizer[]> => {
    const response = await fetch(`${API_URL}/organizer/getOrganizerFromUser/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};


export const getOrganizers = async (): Promise<Organizer[]> => {
    const response = await fetch(`${API_URL}/organizer/crud/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const createOrganizer = async (organizerData: Organizer): Promise<Organizer> => {
    const response = await fetch(`${API_URL}/organizer/crud/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(organizerData)
    });
    return handleResponse(response);
};

export const updateOrganizer = async (id: number, organizerData: Organizer): Promise<Organizer> => {
    const response = await fetch(`${API_URL}/organizer/crud/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(organizerData)
    });
    return handleResponse(response);
};

export const deleteOrganizer = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/organizer/crud/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};
////////////////////////////////////////////////////////////////////////////////////////////
// CRUD pour les types d'évènements


export const getEventtype = async (id:number): Promise<any> => {
    const  user :any = getUser();
    const response = await fetch(`${API_URL}/eventtype/crud/${id}/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getEventtypesFromUser = async (): Promise<any[]> => {
    const response = await fetch(`${API_URL}/eventtype/getEventtypeFromUser/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getEventtypes = async (): Promise<Eventtype[]> => {
    const response = await fetch(`${API_URL}/eventtype/crud/`, {
        method:'GET',
        headers: getAuthHeaders()
    });
    console.log(response)
    const data:any = await handleResponse(response)
    return data["results"];
};

export const createEventtype = async (organizerData: Eventtype): Promise<Organizer> => {
    const response = await fetch(`${API_URL}/eventtype/crud/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(organizerData)
    });
    return handleResponse(response);
};

export const updateEventtype = async (id: number, organizerData: Eventtype): Promise<Organizer> => {
    const response = await fetch(`${API_URL}/eventtype/crud/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(organizerData)
    });
    return handleResponse(response);
};

export const deleteEventtype = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/eventtype/crud/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};


////////////////////////////////////////////////////////////////////////////////////////////
// CRUD pour les évènements




export const getMapanEvent = async (id:number): Promise<MapanEvent[]> => {
    const  user :any = getUser();
    const response = await fetch(`${API_URL}/event/crud/${id}/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getMapanEventsFromOrganizer = async (): Promise<any> => {
    const response = await fetch(`${API_URL}/event/getMapanEventsFromUser/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getMapanEvents = async (): Promise<MapanEvent[]> => {
    const response = await fetch(`${API_URL}/event/crud/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const createMapanEvent = async (title:string,description:string,type:number,image:any,address:string,datetime:string ): Promise<any> => {
    console.log("on creating ... ")
    if (image && datetime){
        const form = initAttrForEventCreation(title, description, type , image, datetime, address)
        const headers = new Headers();
        headers.append('Authorization', 'Token '+getCookie("token"));
        const response = await fetch(`${API_URL}/event/crud/`, {
            method: 'POST',
            headers: headers,
            credentials:"include",
            body: form
        });
        console.log(response)
    return response;
    } throw Error("input need to be complete and correct")


};

export const updateMapanEvent = async (id: number, title:string,description:string,type:number,image:string,address:string,datetime:string): Promise<any> => {
    console.log("image = "+ image )
    console.log("datetime "+ datetime)
    const form = initAttrForEventUpdate(title, description, type , image, datetime, address)
    const headers = new Headers();
    headers.append('Authorization', 'Token '+getCookie("token"));
    const response = await fetch(`${API_URL}/event/crud/${id}/`, {
        method: 'PATCH',
        headers: headers,
        credentials:'include',
        body: form
    });
    return response;


};

export const deleteMapanEvent = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/event/crud/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};

// CRUD pour les formules

export const getFormula = async (id: number): Promise<Formula> => {
    const response = await fetch(`${API_URL}/formula/crud/${id}/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getFormulas = async (): Promise<Formula[]> => {
    const response = await fetch(`${API_URL}/formula/crud/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const createFormula = async (formulaData: Formula): Promise<Formula> => {
    const response = await fetch(`${API_URL}/formula/crud/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formulaData)
    });
    return handleResponse(response);
};

export const updateFormula = async (id: number, formulaData: Formula): Promise<Formula> => {
    const response = await fetch(`${API_URL}/formula/crud/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formulaData)
    });
    return handleResponse(response);
};

export const deleteFormula = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/formula/crud/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};

// CRUD pour les tickets

export const getTicket = async (id: number): Promise<Ticket> => {
    const response = await fetch(`${API_URL}/ticket/crud/${id}/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getTickets = async (): Promise<Ticket[]> => {
    const response = await fetch(`${API_URL}/ticket/crud/`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const createTicket = async (ticketData: Ticket): Promise<Ticket> => {
    const response = await fetch(`${API_URL}/ticket/crud/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ticketData)
    });
    return handleResponse(response);
};

export const updateTicket = async (id: number, ticketData: Ticket): Promise<Ticket> => {
    const response = await fetch(`${API_URL}/ticket/crud/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(ticketData)
    });
    return handleResponse(response);
};

export const deleteTicket = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/ticket/crud/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
};







