-- 1. get all statuses, not repeating, alphabetically ordered
SELECT DISTINCT tasks.status FROM tasks ORDER BY tasks.status ASC;

-- 2. get the count of all tasks in each project, order by tasks count descending
SELECT COUNT(*) AS tasks_count FROM projects, tasks WHERE tasks.project_id = projects.id
    GROUP BY projects.id ORDER BY tasks_count DESC;

-- 3. get the count of all tasks in each project, order by projects names
SELECT projects.name, COUNT(*) AS tasks_count FROM projects, tasks WHERE tasks.project_id = projects.id
    GROUP BY projects.id;

-- 4. get the tasks for all projects having the name begining with "N" letter
SELECT tasks.* FROM tasks, projects WHERE projects.name LIKE 'N%' AND tasks.project_id = projects.id;

-- 5. get the list of all projects containing the 'a' letter in the middle of the name,
-- and show the tasts count near each project. mention that there can exist projects without 
-- tasks and tasks with project_id=NULL
SELECT projects.id, projects.name, COUNT(*) AS tasks_count FROM projects, tasks
    WHERE projects.name LIKE '%a%' AND tasks.project_id = projects.id
    GROUP BY projects.id;

-- 6. get the list of tasks with duplicate names. order aplphabetically
SELECT name, COUNT(*) FROM tasks GROUP BY name HAVING  COUNT(*) > 1 
    ORDER BY name ASC;

-- 7. get the list of tasks having several exact matches of both name and status, from the project 'Garage'.
-- order by matches count
SELECT tasks.name, tasks.status, COUNT(*) AS exact_matches FROM projects, tasks
    WHERE tasks.project_id = projects.id AND projects.name LIKE 'Garage'
    GROUP BY tasks.name, tasks.status HAVING COUNT(*) > 1 ORDER BY exact_matches ASC;

-- 8. get the list of project names having more than 10 tasks is status 'completed'. order by project_id
SELECT projects.name, COUNT(tasks.status) FROM projects, tasks WHERE tasks.project_id = project.id
    AND tasks.status LIKE 'completed' GROUP BY tasks.status, projects.name, tasks.project_id
    HAVING COUNT(tasks.status) > 10 ORDER BY tasks.project_id ASC;