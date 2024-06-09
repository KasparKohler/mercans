import { Locator, Page } from "@playwright/test";

export default class DialogBoxFE {
    readonly page: Page;
    readonly confirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmButton = page.locator(`button[data-test="confirm-action-button"]`)
    }

    /**
     * [Dialog box] Click "Yes" button.
     */
    async clickConfirmButton() {
        console.log(`[Dialog box] Click "Yes" button.`)
        await this.confirmButton.click()
    }
}