import { APIRequestContext } from "@playwright/test";

var defaultHeader = {
    "Content-Type": 'application/json',
    "Authorization": `Basic ${process.env.NODE_BASIC_AUTH_TOKEN}`
}

export default class EmployeeAPI {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * [/employee] GET request.
     * @param authToken 
     * @param requestHeader
     * @returns Promise<APIResponse>
     */
    async getEmployeeInfo(authToken: string, requestHeader = defaultHeader) {
        console.log('[/employee] GET request.')
        return await this.request.get(`${process.env.NODE_API_URL2}/employee`, {
            headers: {
                ...requestHeader,
                "X-Session-Token": authToken
            }
        })
    }
}