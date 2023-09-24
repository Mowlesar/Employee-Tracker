const mysql = require('mysql2')
const inquirer = require('inquirer');
const { response } = require('express');

const database = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "Vash@12349",
    database: "employee_db"
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        }
    ]).then(response => {
        if (response.choice === "View all employees") {
            viewEmployees()
        }
        else if (response.choice === "View all departments") {
            viewDepartments()
        }
        else if (response.choice === "View all roles") {
            viewRoles()
        }
        else if (response.choice === "Add a department") {
            addDepartment()
        }
        else if (response.choice === "Add a role") {
            addRole()
        }
        else if (response.choice === "Add an employee") {
            addEmployee()
        }
        else if (response.choice === "Update an employee role") {
            updateRole()
        }
        else if (response.choice === "Exit") {
            console.log("Exited")
        }
    })
}

function viewEmployees() {
    database.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
}

function viewDepartments() {
    database.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
}

function viewRoles() {
    database.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "Please enter the name of the new role."
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the salary for the new role."
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "Please enter the department this role belongs to."
        }
    ]).then(res => {
        database.query(
            "SELECT id FROM department WHERE department_name = ?",
            [res.roleDepartment],
            (err, results) => {
                if (err) throw err;
                if (results.length === 0) {
                    console.log(`Department ${res.roleDepartment} not found.`);
                    start();
                } else {
                    const departmentId = results[0].id;
                    database.query(
                        'INSERT INTO roles SET ?',
                        {
                            title: res.newRole,
                            salary: res.salary,
                            department_id: departmentId
                        },
                        (err, result) => {
                            if (err) throw err;
                            console.log(`Added ${res.newRole} to the database.`);
                            start();
                        }
                    );
                }
            }
        );
    });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: "What is the employee's role id?"
            },
            {
                type: 'input',
                name: 'manager',
                message: "What is the employee's manager id?"
            },
        ])
        .then(res => {
            const { firstName, lastName, employeeRole, manager } = res;

            // Check if the entered role and manager IDs exist in the database
            db.query(
                "SELECT COUNT(*) AS roleCount FROM role WHERE id = ?; SELECT COUNT(*) AS employeeCount FROM employee WHERE id = ?",
                [employeeRole, manager],
                (checkErr, checkResults) => {
                    if (checkErr) {
                        console.error("Error checking role and manager IDs:", checkErr);
                        start();
                        return;
                    }

                    const roleCount = checkResults[0][0].roleCount;
                    const employeeCount = checkResults[1][0].employeeCount;

                    if (roleCount === 0 || employeeCount === 0) {
                        console.log("Role or Manager ID not found in the database.");
                        start();
                        return;
                    }

                    // If everything is valid, perform the insertion
                    db.query(
                        `INSERT INTO employee SET ?`,
                        {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: employeeRole,
                            manager_id: manager
                        },
                        (err, result) => {
                            if (err) {
                                console.error("Error adding employee:", err);
                            } else {
                                console.log(`Added ${firstName} ${lastName} to the database`);
                            }
                            start();
                        }
                    );
                }
            );
        });
}

function updateRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: "Enter the ID of the employee you want to update:",
            },
            {
                type: 'input',
                name: 'newRole',
                message: "Enter the new role ID for the employee:",
            },
        ])
        .then(res => {
            const { employeeId, newRole } = res;

            // Check if the entered employee ID and new role ID exist in the database
            db.query(
                "SELECT COUNT(*) AS employeeCount FROM employee WHERE id = ?; SELECT COUNT(*) AS roleCount FROM role WHERE id = ?",
                [employeeId, newRole],
                (checkErr, checkResults) => {
                    if (checkErr) {
                        console.error("Error checking employee and role IDs:", checkErr);
                        start();
                        return;
                    }

                    const employeeCount = checkResults[0][0].employeeCount;
                    const roleCount = checkResults[1][0].roleCount;

                    if (employeeCount === 0 || roleCount === 0) {
                        console.log("Employee or Role ID not found in the database.");
                        start();
                        return;
                    }

                    // Update the employee's role
                    db.query(
                        "UPDATE employee SET role_id = ? WHERE id = ?",
                        [newRole, employeeId],
                        (updateErr, updateResult) => {
                            if (updateErr) {
                                console.error("Error updating employee role:", updateErr);
                            } else {
                                console.log(`Updated role for employee with ID ${employeeId}`);
                            }
                            start();
                        }
                    );
                }
            );
        });
}
