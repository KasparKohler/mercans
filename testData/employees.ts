export default class Employees {
    static examples = {
        "manager": {
            "name": "Violet Davis",
            "id": process.env.NODE_MANAGER_ID,
            "username": `${process.env.NODE_MANAGER_USERNAME}`,
            "password": `${process.env.NODE_MANAGER_PASSWORD}`
        },
        "employee": {
            "name": "Stuart Ellis",
            "id": process.env.NODE_EMPLOYEE_ID,
            "username": `${process.env.NODE_EMPLOYEE_USERNAME}`,
            "password": `${process.env.NODE_EMPLOYEE_PASSWORD}`
        }
    }

    static manager = this.examples.manager
    static employee = this.examples.employee
}