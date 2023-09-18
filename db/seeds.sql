INSERT INTO department (id, department_name)
VALUES (1, "Marketing"),
       (2, "Fiance"), 
       (3, "Human Resources"),
       (4, "IT"),
       (5, "Research and Development"),
       (6, "Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 120000, 1),
       ("Digital Marketing Specialist",80000, 1), 
       ("Financial Analyst", 75000, 2),
       ("Account Executive", 60000, 2),
       ("Chief Human Resources Officer", 150000, 3),
       ("Talent Acquisition Specialist", 80000, 3),
       ("IT Support Technician", 65000, 4),
       ("IT Project Manager", 80000, 4),
       ("Lead Researcher", 100000, 5),
       ("Development Engineer", 100000, 5),
       ("Customer Service Representative", 45000, 6),
       ("Customer Service Manager", 80000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emily", "Johnson", 1, NULL),
       ("Samuel", "Davis", 2, 1),
       ("Sophia", "Martinez", 3, NULL),
       ("Benjamin", "Wilson", 4, NULL),
       ("Olivia", "Anderson", 5, NULL),
       ("William", "Taylor", 6, NULL),
       ("Ava", "Rodriguez", 7, 8),
       ("James", "Clark", 8, NULL),
       ("Mia", "Hernandez", 9, NULL),
       ("Alexander", "Lewis", 10, 9),
       ("Natalie", "Baker", 11, 12),
       ("Ethan", "Thompson", 12, NULL);
