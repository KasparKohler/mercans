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

test('Create Annual leave to worker', async ({ page }) => {
    await page.goto('https://access.hrblizz.dev/login');
    const loginPageFE = new LoginPageFE(page);
    const homePageFE = new HomePageFE(page);
    const myLeavesPageFE = new MyLeavesPageFE(page);
    const newLeaveRequestPageFE = new NewLeaveRequestPageFE(page);
    await loginPageFE.logInWithUsernameAndPassword(Employees.employee.username, Employees.employee.password);
    await homePageFE.clickLeavesDashboardTile();
    await myLeavesPageFE.clickNewLeaveRequestPlusButton();
    await newLeaveRequestPageFE.createLeaveRequest(LeaveRequestData.oneDayAnnualLeaveForNexPossibleWorkDay)
    await expect(myLeavesPageFE.requestTilesDiv).toHaveCount(1)
})

test('Reject annual vacation request by manager', async ({ page }) => {
    await page.goto('https://access.hrblizz.dev/login');
    const loginPageFE = new LoginPageFE(page);
    const basePageFE = new BasePageFE(page);
    const managerLeavesFE = new ManagerLeavesFE(page);
    const requestApprovalModalFE = new RequestApprovalModalFE(page);
    await loginPageFE.logInWithUsernameAndPassword(Employees.manager.username, Employees.manager.password);
    await basePageFE.openLeavesSidebarMenuItem();
    await basePageFE.openManagerLeavesMenuItem();
    await managerLeavesFE.clickLeaveRequest(LeaveRequestData.oneDayAnnualLeaveForNexPossibleWorkDay.employeeId);
    await requestApprovalModalFE.rejectLeaveRequest("sorry")
    await expect(managerLeavesFE.leaveRequestSpan(LeaveRequestData.oneDayAnnualLeaveForNexPossibleWorkDay.employeeId)).toHaveCount(0)
})