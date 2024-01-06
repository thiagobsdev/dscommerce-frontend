
export type CredentialsDTO = {
    username: string,
    password: string
}

export type RoleEnum = "ROLE_CLIENT" | "ROLE_ADMIN";

export type AccessTokenPayloadDTO = {
    exp: number,
    user_name: string,
     authorities: RoleEnum[]
}