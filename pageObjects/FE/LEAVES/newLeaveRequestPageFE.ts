import { Locator, Page, expect } from "@playwright/test";
import DialogBoxFE from "../GENERAL/dialogBoxFe";
import LeaveRequestData from "../../../testData/leaveRequestData";
import BasePageFE from "../GENERAL/basePageFE";

var leaveRequestDataObject = LeaveRequestData.samples.annualLeave

export default class NewLeaveRequestPageFE {
    readonly page: Page;
    readonly selectedLeaveTypeDiv: Locator;
    readonly datePickerHeaderContentDiv: Locator;
    readonly calenderDateDiv: (dateId: string) => Locator;
    readonly requestLeaveButton: Locator;
    readonly dialogBoxFE: DialogBoxFE;
    readonly basePageFE: BasePageFE;

    constructor(page: Page) {
        this.page = page;
        this.selectedLeaveTypeDiv = page.locator('#leave-types div.c-dd__selected-preview');
        this.datePickerHeaderContentDiv = page.locator('div.date-picker__header__content');
        this.calenderDateDiv = (dateId: string) => page.locator(`[id="${dateId}"]`);
        this.requestLeaveButton = page.locator('button[data-test="submit-approve"]');
        this.dialogBoxFE = new DialogBoxFE(page)
        this.basePageFE = new BasePageFE(page)
    }

    /**
     * Click calendar header.
     */
    async clickCalendarYearHeader() {
        console.log('[New leave request page] Click calendar header.')
        await this.datePickerHeaderContentDiv.click()
    }

    /**
     * [New leave request page] Set date
     * @param date date in format DD.MM.YYYY
     */
    async setDate(date: string) {
        console.log(`[New leave request page] Set date: ${date}`)
        console.log(`[New leave request page] Click year: ${date.split('.')[2]}`)
        await this.calenderDateDiv(date.split('.')[2]).click()
        console.log(`[New leave request page] Click month: ${date.split('.')[1]}`)
        await this.calenderDateDiv(`${date.split('.')[2]}-${date.split('.')[1]}`).click()
        console.log(`[New leave request page] Click day: ${date.split('.')[0]}`)
        await this.calenderDateDiv(`${date.split('.')[2]}-${date.split('.')[1]}-${date.split('.')[0]}`).click()
    }

    /**
     * [New leave request page] Set date range
     * @param startDate star date in format DD.MM.YYYY
     * @param endDate end date in format DD.MM.YYYY
     */
    async setDateRange(startDate: string, endDate: string) {
        console.log(`[New leave request page] Set date range: ${startDate} - ${endDate}.`)
        await this.clickCalendarYearHeader()
        await this.clickCalendarYearHeader()
        console.log('[New leave request page] Set start date:')
        await this.setDate(startDate)
        await this.clickCalendarYearHeader()
        await this.clickCalendarYearHeader()
        console.log('[New leave request page] Set end date:')
        await this.setDate(endDate)
    }

    /**
     * [New leave request page] Set leave type
     * @param leaveType leave type (annual, sick...)
     */
    async setLeaveType(leaveType: string) {
        console.log(`[New leave request page] Set leave type: "${leaveType}".`)
        const selectedLeaveType = await this.selectedLeaveTypeDiv.textContent()
        if (selectedLeaveType == leaveType) {
            console.log('[New leave request page] Correct leave type all ready selected')
        } else {
            // TODO: if multiple options available for person.
            // TODO: in future
        }
    }

    /**
     * [New leave request page] Click "Request leave" button.
     */
    async clickRequestLeaveButton() {
        console.log('[New leave request page] Click "Request leave" button.')
        await this.requestLeaveButton.click()
    }

    /**
     * [New leave request page] Create new leave request.
     * @param leaveRequest leave request information
     */
    async createLeaveRequest(leaveRequest: typeof leaveRequestDataObject) {
        console.log(`[New leave request page] Create new leave request.`)
        await this.setLeaveType(leaveRequest.type)
        await this.setDateRange(leaveRequest.startDate, leaveRequest.endDate)
        await this.clickRequestLeaveButton()
        await this.dialogBoxFE.clickConfirmButton()
        expect(await this.basePageFE.snackBarMessageDiv.textContent()).toEqual("Request has been submitted")
    }
}