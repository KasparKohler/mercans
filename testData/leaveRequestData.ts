import GeneralHelpers from "../helperMethods/generalHelpers"

/**
 * Information for leave request
 */
export default class LeaveRequestData {
    static samples = {
        "annualLeave": {
            "type": "Annual leave",
            "startDate": GeneralHelpers.getNextWorkingDay().format('DD.MM.YYYY'),
            "endDate": GeneralHelpers.getNextWorkingDay().format('DD.MM.YYYY'),
            "employeeId": `${process.env.NODE_EMPLOYEE_ID}`
        }
    }

    static oneDayAnnualLeaveForNexPossibleWorkDay = this.samples.annualLeave
}