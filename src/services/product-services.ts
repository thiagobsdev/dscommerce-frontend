import  { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";
import { ProductDTO } from "../models/product";

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

export function updateRequest(obj : ProductDTO) {

    const axiosConfig:AxiosRequestConfig = {
        method: "PUT",
        url: `/products/${obj.id}`,
        withCredentials: true,
        data: obj
     }

     return requestBackEnd(axiosConfig)
}

export function insertRequest(obj : ProductDTO) {
    
    const axiosConfig:AxiosRequestConfig = {
        method: "POST",
        url: `/products`,
        withCredentials: true,
        data: obj
     }

     return requestBackEnd(axiosConfig)
}