import { Locator, Page, expect } from "@playwright/test";
import NewLeaveRequestPageFE from "./newLeaveRequestPageFE";

export default class MyLeavesPageFE {
    readonly page: Page;
    readonly balanceCardDataDiv: Locator;
    readonly newLeaveRequestPlusButton: Locator;
    readonly newLeaveRequestPageFE: NewLeaveRequestPageFE;
    readonly requestTilesDiv: Locator;

    constructor(page: Page) {
        this.page = page;
        this.balanceCardDataDiv = page.locator('div.balance-card__leave-data');
        this.newLeaveRequestPlusButton = page.locator('button[aria-label="Request new leave"]');
        this.newLeaveRequestPageFE = new NewLeaveRequestPageFE(page);
        this.requestTilesDiv = page.locator('div.tile-wrapper')
    }

    /**
     * [My Leaves Page] Click new leave request "+" button.
     */
    async clickNewLeaveRequestPlusButton() {
        console.log(`[My Leaves Page] Click new leave request "+" button.`)
        await this.newLeaveRequestPlusButton.click()
        await expect(this.newLeaveRequestPageFE.selectedLeaveTypeDiv).toBeVisible()
    }
}