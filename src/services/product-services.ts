import  { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";

export function findRequestPage(page:number, name:string, size = 12, sort = "name")  {

    const axiosConfig:AxiosRequestConfig = {
        method: "GET",
        url: "/products",
        params: {
            page,
            size, 
            name,
            sort
        }

    }
    
    return requestBackEnd(axiosConfig);
};

export function findById(id: number) {
    return requestBackEnd({url: `/products/${id}`})
}

export function deleteById(id: number) {
    const axiosConfig:AxiosRequestConfig = {
        method: "DELETE",
        url: `/products/${id}`,
        withCredentials: true
     }

     return requestBackEnd(axiosConfig)
}
