import { APIRequestContext } from "@playwright/test"

export default class LoginAPI {
    readonly request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * /login/credentials: POST request.
     * @param username username
     * @param password password
     * @returns Promise
     */
    async postUserCredentials(username: string, password: string) {
        console.log('[/login/credential]: POST request.')
        return await this.request.post(`${process.env.NODE_API_LOGIN_URL}/login/credential`, {
            data: {
                "loginUsername": username,
                "loginPassword": password
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${process.env.NODE_BASIC_AUTH_TOKEN}`
            }
        })
    }

    /**
     * [/login/session] POST request.
     * @param credentialToken 
     * @param employeeId 
     * @returns 
     */
    async postSession(credentialToken: string, employeeId: number) {
        console.log('[/login/session] POST request.')
        return await this.request.post(`${process.env.NODE_API_LOGIN_URL}/login/session`, {
            data: {
                "credentialToken": credentialToken,
                "employeeId": employeeId
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Basic ${process.env.NODE_BASIC_AUTH_TOKEN}`
            }
        })
    }
}