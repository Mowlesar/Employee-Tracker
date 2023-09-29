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
  ("Financial Analyst", 75000, 2),
  ("Human Resources Officer", 150000, 3),
  ("IT Manager", 80000, 4),
  ("Lead Researcher", 100000, 5),
  ("Customer Service Manager", 80000, 6);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Emily", "Johnson", 1, NULL),
  ("Samuel", "Davis", 2, NULL),
  ("Sophia", "Martinez", 3, NULL),
  ("Benjamin", "Wilson", 4, NULL),
  ("Olivia", "Anderson", 5, NULL),
  ("William", "Taylor", 6, NULL);