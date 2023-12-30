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

