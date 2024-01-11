import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";


export function findAllRequest()  {

    const axiosConfig:AxiosRequestConfig = {
        method: "GET",
        url: "/categories",
    }
    
    return requestBackEnd(axiosConfig);
};