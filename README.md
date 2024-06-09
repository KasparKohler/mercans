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
7. Run tests (locally: then credentials, urls should be replaced with real ones ($MANAGER_ID replaced and so on). In CI these are taken from secrets)
```console
  NODE_MANAGER_ID=$MANAGER_ID NODE_MANAGER_USERNAME=$MANAGER_USERNAME NODE_MANAGER_PASSWORD=$MANAGER_PASSWORD NODE_EMPLOYEE_ID=$EMPLOYEE_ID NODE_EMPLOYEE_USERNAME=$EMPLOYEE_USERNAME NODE_EMPLOYEE_PASSWORD=$EMPLOYEE_PASSWORD NODE_API_LOGIN_URL=$API_LOGIN_URL NODE_BASIC_AUTH_TOKEN=$BASIC_AUTH_TOKEN NODE_API_URL2=$API_URL2 npx playwright test
```