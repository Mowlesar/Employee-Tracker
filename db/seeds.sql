-- Insert departments
INSERT INTO department (department_name)
VALUES
  ("Marketing"),
  ("Finance"),
  ("Human Resources"),
  ("IT"),
  ("Research and Development"),
  ("Customer Service");

-- Insert roles
INSERT INTO role (title, salary, department_id)
VALUES
  ("Marketing Manager", 120000, 1),
  ("Digital Marketing", 60000, 1),
  ("Financial Analyst", 75000, 2),
  ("Account Executive", 55000, 2),
  ("Human Resources Officer", 150000, 3),
  ("Talent Specialist", 80000, 3),
  ("IT Manager", 80000, 4),
  ("IT Technician", 65000, 4),
  ("Lead Researcher", 100000, 5),
  ("Engineer", 90000, 5),
  ("Customer Service Manager", 80000, 6),
  ("Receptionist", 45000, 6);

-- Insert employees with managers (managers first)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Emily", "Johnson", 1, NULL),             -- Marketing Manager
  ("Samuel", "Davis", 2, 1),                 -- Digital Marketing (Managed by Emily)
  ("Sophia", "Martinez", 3, NULL),           -- Human Resources Officer
  ("Benjamin", "Wilson", 4, NULL),          -- IT Manager
  ("Olivia", "Anderson", 5, NULL),           -- Lead Researcher
  ("William", "Taylor", 6, NULL),           -- Customer Service Manager
  ("Sarah", "Smith", 2, 1),                 -- Digital Marketing (Managed by Emily)
  ("Linda", "Brown", 4, 3),                 -- Account Executive (Managed by Samuel)
  ("David", "Lee", 6, 5),                   -- Talent Specialist (Managed by Sophia)
  ("Rachel", "Moore", 8, 7),                -- IT Technician (Managed by Benjamin)
  ("Ethan", "White", 10, 9),                -- Engineer (Managed by Olivia)
  ("Ava", "Rodriguez", 12, 11);             -- Receptionist (Managed by William);