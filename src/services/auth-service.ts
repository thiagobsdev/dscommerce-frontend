import QueryString from "qs";
import { CLIENT_ID, CLIENT_SECRET } from "../config/system";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/auth";
import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";
import * as acessRepository from "../localStorage/acess-token-repository";
import jwtDecode from "jwt-decode";

export function loginRequest(loginData: CredentialsDTO) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const requestBody = QueryString.stringify({
    ...loginData,
    grant_type: "password",
  });

  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/oauth/token",
    data: requestBody,
    headers: headers,
  };

  return requestBackEnd(config);
}

export function logout() {
  acessRepository.remove();
}

export function saveAccessToken(token: string) {
  acessRepository.save(token);
}

export function getAccessToken() {
  return acessRepository.get();
}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
  try {
    const token = acessRepository.get();
    return token == null
      ? undefined
      : (jwtDecode(token) as AccessTokenPayloadDTO);
  } catch (error) {
    return undefined;
  }
}

export function isAuthenticated(): boolean {
  let tokenPayload = getAccessTokenPayload();
  return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
}

export function hasAnyRoles(roles: RoleEnum[]): boolean {
  if (roles.length === 0) {
    return true;
  }
  const tokenPayload = getAccessTokenPayload();
  if (tokenPayload !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (tokenPayload.authorities.includes(roles[i])) {
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role));
  }
  return false;
}
