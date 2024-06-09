import { Locator, Page, expect } from "@playwright/test";
import MyLeavesPageFE from "../LEAVES/myLeavesPageFE";

export default class HomePageFE {
    readonly page: Page;
    readonly producLogoSubtitleSpan: Locator;
    readonly leavesDashboardTileLinkA: Locator;
    readonly myLeavesPageFE: MyLeavesPageFE;

    constructor(page: Page) {
        this.page = page;
        this.producLogoSubtitleSpan = page.locator('span.product-logo__subtitle')
        this.leavesDashboardTileLinkA = page.locator('a.lp-dashboard-card[href*="my-leaves"]')
        this.myLeavesPageFE = new MyLeavesPageFE(page)
    }

    /**
     * [Homepage] Click "Leaves" tile on dashboard.
     */
    async clickLeavesDashboardTile(){
        console.log('[Home Page] Click "Leaves" tile on dashboard.')
        await this.leavesDashboardTileLinkA.click()
        await expect.poll(async () => this.myLeavesPageFE.balanceCardDataDiv.count()).toBeGreaterThan(0);
    }
}