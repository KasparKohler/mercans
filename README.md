# Mercans testülesanne
### Setup on Windows machine
1. Install node.js
2. Install bash
3. Clone main branch from bash
```console
  git clone https://github.com/KasparKohler/mercans.git
```
4. Open cloned folder from bash
```console
  cd mercans
```
5. Install dependencies from package.json
```console
  npm ci
```
6. Install browsers
```console
  npx playwright install --with-deps
```
7. Run tests with local.env file (in CI values are passed as secrets)
```console
  Create local.env file in the root folder of the project
```
```console
Add values as key value pairs into local.env file:
NODE_MANAGER_ID=EXPECTED_VALUE
NODE_MANAGER_USERNAME=EXPECTED_VALUE
NODE_MANAGER_PASSWORD=EXPECTED_VALUE
NODE_EMPLOYEE_ID=EXPECTED_VALUE
NODE_EMPLOYEE_USERNAME=EXPECTED_VALUE
NODE_EMPLOYEE_PASSWORD=EXPECTED_VALUE
NODE_API_LOGIN_URL=EXPECTED_VALUE
NODE_BASIC_AUTH_TOKEN=EXPECTED_VALUE
NODE_API_URL2=EXPECTED_VALUE
NODE_FE_URL=EXPECTED_VALUE
```
```console
 npx playwright test
```