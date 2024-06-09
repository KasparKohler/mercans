import { Locator, expect, type Page } from '@playwright/test';
import HomePageFE from './homePageFE';

export default class LoginPageFE {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly homePageFE: HomePageFE;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[data-test="perform-login"]');
        this.homePageFE = new HomePageFE(page);
    }

    /**
     * [LoginPage] Set username.
     * @param username username
     */
    async setUsername(username: string) {
        console.log('[Login Page] Set username.')
        await this.usernameInput.clear()
        await this.usernameInput.fill(username)
    }

    /**
     * [LoginPage] Set password.
     * @param password password
     */
    async setPassword(password: string) {
        console.log('[Login Page] Set password.')
        await this.passwordInput.clear()
        await this.passwordInput.fill(password)
    }

    /**
     * [LoginPage] Click "Login" button.
     */
    async clickLoginButton() {
        console.log('[Login Page] Click "Login" button.')
        await this.loginButton.click()
    }

    /**
     * [Login page] Login with username and password.
     * @param username username
     * @param password password
     */
    async logInWithUsernameAndPassword(username: string, password: string) {
        console.log('[Login Page] Login with username and password.')
        await this.setUsername(username)
        await this.setPassword(password)
        await this.clickLoginButton()
        await expect(this.homePageFE.producLogoSubtitleSpan).toBeVisible({ timeout: 20000 })
    }
}