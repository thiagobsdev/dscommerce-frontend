import QueryString from "qs";
import { CLIENT_ID, CLIENT_SECRET } from "../config/system";
import { CredentialsDTO } from "../models/auth";
import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";
import * as acessRepository from "../localStorage/acess-token-repository"


export function loginRequest( loginData: CredentialsDTO) {

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }

    const requestBody =  QueryString.stringify({...loginData, grant_type: "password"})

    const config: AxiosRequestConfig = {
        method:"POST",
        url: "/oauth/token",
        data: requestBody,
        headers: headers
    }

    return requestBackEnd(config)
}

export function logout() {
    acessRepository.remove()
}

export function saveAccessToken( token: string) {
    acessRepository.save(token)
}

export function getAccessToken( ) {
    acessRepository.get()
}