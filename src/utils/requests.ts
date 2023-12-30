import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../config/system";


export  function requestBackEnd( config: AxiosRequestConfig) {
    return axios({...config, baseURL: BASE_URL})
}