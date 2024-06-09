import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export default class BasePageFE {
    readonly page: Page;
    readonly snackBarMessageDiv: Locator;
    readonly leavesSidebarMenuDiv: Locator;
    readonly leavesSideBarMenuChildDivs: Locator;
    readonly managerLeavesLinkA: Locator;

    constructor(page: Page) {
        this.page = page;
        this.snackBarMessageDiv = page.locator('div.snackBar-message');
        this.leavesSidebarMenuDiv = page.locator('#leaves');
        this.leavesSideBarMenuChildDivs = page.locator('#leaves > div')
        this.managerLeavesLinkA = page.locator('a[href$="manager/listing"]')
    }

    /**
     * [Sidebar] Open "Leaves" menu item.
     */
    async openLeavesSidebarMenuItem() {
        console.log(`[Sidebar] Open "Leaves" menu item.`)
        const leavesSideBarChildDivsCount = await this.leavesSideBarMenuChildDivs.count()
        if (leavesSideBarChildDivsCount < 2) {
            console.log(`[Sidebar] Click "Leaves" menu item.`)
            await this.leavesSidebarMenuDiv.click()
        } else {
            console.log('Leaves juba avatud.')
        }
        await expect(this.leavesSideBarMenuChildDivs).toHaveCount(2)
    }

    /**
     * [Sidebar] Open manager "Leaves" menu item.
     */
    async openManagerLeavesMenuItem() {
        console.log(`[Sidebar] Open manager "Leaves" menu item.`)
        const managerLeavesLinkAClasses = await this.managerLeavesLinkA.getAttribute("class")
        if (managerLeavesLinkAClasses?.includes("link-active")) {
            console.log('[Sidebar] Manager "Leaves" menu item is already active.')
        } else {
            console.log('[Sidebar] Click manager "Leaves" menu item.')
            this.managerLeavesLinkA.click()
        }
        await expect(this.managerLeavesLinkA).toHaveClass(/router-link-active/)
    }
}