const mysql = require('mysql2')
const inquirer = require('inquirer');


const database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Vash@12349",
    database: "employee_db"
});

database.connect(function (err) {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("MySQL Connected");
    start();
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
    ]).then(res => {
        if (res.choice === "View all employees") {
            viewEmployees()
        }
        else if (res.choice === "View all departments") {
            viewDepartments()
        }
        else if (res.choice === "View all roles") {
            viewRoles()
        }
        else if (res.choice === "Add a department") {
            addDepartment()
        }
        else if (res.choice === "Add a role") {
            addRole()
        }
        else if (res.choice === "Add an employee") {
            addEmployee()
        }
        else if (res.choice === "Update an employee role") {
            updateRole()
        }
        else if (res.choice === "Exit") {
            console.log("Exited")
        }
    })
}

function viewEmployees() {
    database.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewDepartments() {
    database.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewRoles() {
    database.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Please enter the name of the new department."
        }
    ]).then(answers => {
        // Insert the new department into the database
        const newDepartmentName = answers.newDepartment; // Store the department name in a separate variable

        database.query(
            'INSERT INTO department (department_name) VALUES (?)',
            [newDepartmentName],
            (err, result) => {
                if (err) {
                    console.error('Error adding department:', err);
                } else {
                    console.log(`Successfully added department: ${newDepartmentName}`);
                }
                // Return to the start menu
                start();
            }
        );
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
                        'INSERT INTO role SET ?',
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
                name: 'employeeRoleId',
                message: "What is the employee's role id?"
            },
            {
                type: 'input',
                name: 'managerId',
                message: "What is the employee's manager id?"
            },
        ]).then(res => {
            const query = `INSERT INTO employee SET ?`
            database.query(
                query, {
                first_name: res.firstName,
                last_name: res.lastName,
                role_id: res.employeeRoleId,
                manager_id: res.managerId
            }
            )
            console.log(`Added ${res.firstName} ${res.lastName} to the database`);
            start();
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
        .then((res) => {
            const { employeeId, newRole } = res;

            // Check if the entered employee ID exists in the database
            const employeeCountQuery = "SELECT COUNT(*) AS employeeCount FROM employee WHERE id = ?";
            database.query(employeeCountQuery, [employeeId], (employeeCountErr, employeeCountResults) => {
                if (employeeCountErr) {
                    console.error("Error checking employee ID:", employeeCountErr);
                    start();
                    return;
                }

                const employeeCount = employeeCountResults[0].employeeCount;

                if (employeeCount === 0) {
                    console.log("Employee ID not found in the database.");
                    start();
                    return;
                }

                // Check if the entered role ID exists in the database
                const roleCountQuery = "SELECT COUNT(*) AS roleCount FROM role WHERE id = ?";
                database.query(roleCountQuery, [newRole], (roleCountErr, roleCountResults) => {
                    if (roleCountErr) {
                        console.error("Error checking role ID:", roleCountErr);
                        start();
                        return;
                    }

                    const roleCount = roleCountResults[0].roleCount;

                    if (roleCount === 0) {
                        console.log("Role ID not found in the database.");
                        start();
                        return;
                    }

                    // Update the employee's role
                    const updateQuery = "UPDATE employee SET role_id = ? WHERE id = ?";
                    database.query(updateQuery, [newRole, employeeId], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error("Error updating employee role:", updateErr);
                        } else {
                            console.log(`Updated role for employee with ID ${employeeId}`);
                        }
                        start();
                    });
                });
            });
        });
}