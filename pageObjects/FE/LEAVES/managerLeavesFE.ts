import { Locator, Page } from "@playwright/test";

export default class ManagerLeavesFE {
    readonly page: Page;
    readonly leaveRequestSpan: (employeeId: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.leaveRequestSpan = (employeeId: string) => page.locator(`td[label="ID & Name"] span`).getByText(employeeId)
    }

    /**
     * [Manager leaves page] Click employee leave request.
     * @param employeeId 
     */
    async clickLeaveRequest(employeeId: string) {
        console.log(`[Manager leaves page] Click employee leave request by employee id.`)
        await this.leaveRequestSpan(employeeId).click()
    }
}