import { APIRequestContext, expect } from "@playwright/test"

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
     * [/login/credential] Log in with username and password.
     * @param username 
     * @param password 
     * @returns Promise<any>
     */
    async logInWithUsernameAndPassword(username: string, password: string) {
        console.log('Log in with username and password.')
        const postUserCredentialsResponse = await this.postUserCredentials(username, password)
        const postUserCredentialsResponseBody = await postUserCredentialsResponse.json()
        expect(postUserCredentialsResponse.status()).toEqual(200);
        expect(postUserCredentialsResponseBody.credentialToken).toBeTruthy()

        return postUserCredentialsResponseBody
    }

    /**
     * [/login/session] POST request.
     * @param credentialToken 
     * @param employeeId 
     * @returns apiResponse Promise<APIResponse>
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

    /**
     * [/login] Activate user session.
     * @param credentialToken 
     * @param employeeId 
     * @returns Promise<any>
     */
    async activateSession(credentialToken: string, employeeId: number) {
        console.log('Activate user session.')
        const sessionResponse = await this.postSession(credentialToken, employeeId)
        const sessionResponseBody = await sessionResponse.json()
        expect(sessionResponse.status()).toEqual(200);
        expect(sessionResponseBody.sessionToken).toBeTruthy()

        return sessionResponseBody
    }

    /**
     * Log in with username and password and activate session.
     * @param username 
     * @param password 
     * @returns sessionToken
     */
    async loginWithUsernameAndPasswordAndActivateSession(username: string, password: string) {
        console.log('Log in with username and password and activate session.')
        const loginResponseBody = await this.logInWithUsernameAndPassword(username, password)
        const sessionResponseBody = await this.activateSession(loginResponseBody.credentialToken, loginResponseBody.employees[0]["id"])
        
        return sessionResponseBody.sessionToken
    }
}