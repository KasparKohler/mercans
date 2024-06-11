import test, { expect } from "@playwright/test";
import EmployeeAPI from "../pageObjects/API/employeeAPI";
import LoginAPI from "../pageObjects/API/loginAPI";
import Employees from "../testData/employees";

var loginAPI: LoginAPI;
var employeeAPI: EmployeeAPI;

test.beforeEach('Open FE ', async ({ request }) => {
  loginAPI = new LoginAPI(request);
  employeeAPI = new EmployeeAPI(request);
})

test('It is not possible to login with invalid password', async () => {
  const loginResponse = await loginAPI.postUserCredentials(Employees.manager.username, 'kartul');
  const loginResponseBody = await loginResponse.json()
  expect(loginResponse.status()).toEqual(401);
  expect(loginResponseBody.errors[0]["code"]).toEqual("invalid_username_or_password")
});

test('It is not possible to get info from employee endpoint without authenticated user', async () => {
  const employeeResponse = await employeeAPI.getEmployeeInfo("")
  expect(employeeResponse.status()).toEqual(401)
});

test('It is not possible to activate session with invalid employee id', async () => {
  const loginResponseBody = await loginAPI.logInWithUsernameAndPassword(Employees.manager.username, Employees.manager.password)

  const sessionResponse = await loginAPI.postSession(loginResponseBody.credentialToken, 99999)
  const sessionResponseBody = await sessionResponse.json()
  expect(sessionResponse.status()).toEqual(401);
  expect(sessionResponseBody.errors[0]["code"]).toEqual("invalid_credential_token_or_client_id")
})

test('It is possible to get information from Employee endpoint with authenticated user', async () => {
  const sessionToken = await loginAPI.loginWithUsernameAndPasswordAndActivateSession(Employees.manager.username, Employees.manager.password)

  const employeeResponse = await employeeAPI.getEmployeeInfo(sessionToken)
  const employeeResponseBody = await employeeResponse.json()
  expect(employeeResponse.status()).toEqual(200)
  expect(employeeResponseBody.person.firstName).toEqual(Employees.manager.name.split(' ')[0])
});