import { APIRequestContext } from "@playwright/test";

export default class EmployeeAPI {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * [/employee] GET request.
     * @param authToken 
     * @returns Promise<APIResponse>
     */
    async getEmployeeInfo(authToken: string) {
        console.log('[/employee] GET request.')
        return await this.request.get(`${process.env.NODE_API_URL2}/employee`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Basic ${process.env.NODE_BASIC_AUTH_TOKEN}`,
                "X-Session-Token": authToken
            }
        })
    }
}