import test, { expect } from "@playwright/test";
import EmployeeAPI from "../pageObjects/API/employeeAPI";
import LoginAPI from "../pageObjects/API/loginAPI";
import Employees from "../testData/employees";

const employeeId = 99999

test('It is not possible to login with invalid password', async ({ request }) => {
  const loginAPI = new LoginAPI(request)
  const employeeAPI = new EmployeeAPI(request);
  const loginResponse = await loginAPI.postUserCredentials(Employees.manager.username, 'kartul');
  const loginResponseBody = await loginResponse.json()
  expect(loginResponse.status()).toEqual(401);
  expect(loginResponseBody.errors[0]["code"]).toEqual("invalid_username_or_password")
  const employeeResponse = await employeeAPI.getEmployeeInfo("")

  expect(employeeResponse.status()).toEqual(401)
});

test('It is not possible to activate session with other invalid employee id', async ({request}) => {
  const loginAPI = new LoginAPI(request)
  const loginResponse = await loginAPI.postUserCredentials(Employees.manager.username, Employees.manager.password);
  
  const loginResponseBody = await loginResponse.json()
  expect(loginResponse.status()).toEqual(200);
  expect(loginResponseBody.credentialToken).toBeTruthy()
  
  const sessionResponse = await loginAPI.postSession(loginResponseBody.credentialToken, employeeId)
  const sessionResponseBody = await sessionResponse.json()
  expect(sessionResponse.status()).toEqual(401);
  expect(sessionResponseBody.errors[0]["code"]).toEqual("invalid_credential_token_or_client_id")
})

test('It is possible to login with valid username and password', async ({ request }) => {
  const loginAPI = new LoginAPI(request)
  const employeeAPI = new EmployeeAPI(request);
  const loginResponse = await loginAPI.postUserCredentials(Employees.manager.username, Employees.manager.password);
  
  const loginResponseBody = await loginResponse.json()
  expect(loginResponse.status()).toEqual(200);
  expect(await loginResponseBody.credentialToken).toBeTruthy()
  
  const sessionResponse = await loginAPI.postSession(await loginResponseBody.credentialToken, await loginResponseBody.employees[0]["id"])
  const sessionResponseBody = await sessionResponse.json()
  expect(sessionResponse.status()).toEqual(200);
  
  const employeeResponse = await employeeAPI.getEmployeeInfo(sessionResponseBody.sessionToken)
  const employeeResponseBody = await employeeResponse.json()
  expect(employeeResponse.status()).toEqual(200)
  expect(employeeResponseBody.person.firstName).toEqual(Employees.manager.name.split(' ')[0])
});