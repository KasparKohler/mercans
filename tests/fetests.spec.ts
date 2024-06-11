import test, { expect } from "@playwright/test";
import BasePageFE from "../pageObjects/FE/GENERAL/basePageFE";
import HomePageFE from "../pageObjects/FE/GENERAL/homePageFE";
import LoginPageFE from "../pageObjects/FE/GENERAL/loginPageFE";
import MyLeavesPageFE from "../pageObjects/FE/LEAVES/myLeavesPageFE";
import ManagerLeavesFE from "../pageObjects/FE/LEAVES/managerLeavesFE";
import NewLeaveRequestPageFE from "../pageObjects/FE/LEAVES/newLeaveRequestPageFE";
import RequestApprovalModalFE from "../pageObjects/FE/LEAVES/requestApprovalModalFE";
import LeaveRequestData from "../testData/leaveRequestData";
import Employees from "../testData/employees";

var loginPageFE: LoginPageFE;
var homePageFE: HomePageFE;
var basePageFE: BasePageFE;

test.beforeEach('Open FE homepage', async ({ page }) => {
    await page.goto(`${process.env.NODE_FE_URL}`);
    loginPageFE = new LoginPageFE(page);
    homePageFE = new HomePageFE(page);
    basePageFE = new BasePageFE(page);
})

test('Create Annual leave to worker', async ({ page }) => {
    const myLeavesPageFE = new MyLeavesPageFE(page);
    const newLeaveRequestPageFE = new NewLeaveRequestPageFE(page);
    await loginPageFE.logInWithUsernameAndPassword(Employees.employee.username, Employees.employee.password);
    await homePageFE.clickLeavesDashboardTile();
    await myLeavesPageFE.clickNewLeaveRequestPlusButton();
    await newLeaveRequestPageFE.createLeaveRequest(LeaveRequestData.oneDayAnnualLeaveForNexPossibleWorkDay)
    await expect(myLeavesPageFE.requestTilesDiv).toHaveCount(1)
})

test('Reject annual vacation request by manager', async ({ page }) => {
    const managerLeavesFE = new ManagerLeavesFE(page);
    const requestApprovalModalFE = new RequestApprovalModalFE(page);
    await loginPageFE.logInWithUsernameAndPassword(Employees.manager.username, Employees.manager.password);
    await basePageFE.openLeavesSidebarMenuItem();
    await basePageFE.openManagerLeavesMenuItem();
    await managerLeavesFE.clickLeaveRequest(LeaveRequestData.oneDayAnnualLeaveForNexPossibleWorkDay.employeeId);
    await requestApprovalModalFE.rejectLeaveRequest("sorry")
    await expect(managerLeavesFE.leaveRequestSpan(LeaveRequestData.oneDayAnnualLeaveForNexPossibleWorkDay.employeeId)).toHaveCount(0)
})