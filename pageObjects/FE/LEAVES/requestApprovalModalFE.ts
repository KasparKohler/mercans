import { Locator, Page, expect } from "@playwright/test";
import BasePageFE from "../GENERAL/basePageFE";
import ManagerLeavesFE from "./managerLeavesFE";

export default class RequestApprovalModalFE {
    readonly page: Page;
    readonly rejectButton: Locator;
    readonly rejectReasonTextArea: Locator;
    readonly basePageFE: BasePageFE;
    readonly managerLeavesFE: ManagerLeavesFE;

    constructor(page: Page) {
        this.page = page;
        this.rejectButton = page.locator('button[data-test="reject-request"]');
        this.rejectReasonTextArea = page.locator('#rejected_notes');
        this.basePageFE = new BasePageFE(page);
        this.managerLeavesFE = new ManagerLeavesFE(page);
    }

    /**
     * [Request approval modal] Click "Reject" button.
     */
    async clickRejectButton() {
        console.log('[Request approval modal] Click "Reject" button.');
        await this.rejectButton.click();
    }

    /**
     * [Request approval modal] Set reject reason
     * @param rejectReason 
     */
    async setRejectReason(rejectReason: string) {
        console.log(`[Request approval modal] Set reject reason "${rejectReason}".`);
        await this.rejectReasonTextArea.clear();
        await this.rejectReasonTextArea.fill(rejectReason);
    }

    /**
     * [Request approval moda] Reject leave request.
     * @param rejectReason 
     */
    async rejectLeaveRequest(rejectReason: string) {
        console.log(`[Request approval moda] Reject leave request.`)
        await this.clickRejectButton()
        await this.setRejectReason(rejectReason)
        await this.clickRejectButton()
        await expect(this.basePageFE.snackBarMessageDiv).toHaveText("Review step has been rejected. Request new status: rejected")
    }
}