import Task from '@/model/Task';

export const initialTasks: Task[] = [
  new Task(1, 'Initial Setup', 'Set up the development environment.', 'Intern', 1), // In Progress
  new Task(2, 'Basic Introduction', 'Complete the introductory module.', 'Intern', 3), // Completed
  new Task(3, 'Basic Git', 'Learn basic Git commands.', 'Intern', 3), // To-Do
  new Task(4, 'Git Collaboration', 'Collaborate on a Git repository.', 'Intern', 3), // To-Do
  new Task(5, 'JavaScript Basics', 'Complete JavaScript basics tutorial.', 'Intern', 3), // To-Do
  new Task(6, 'JavaScript Project', 'Create a small JavaScript project.', 'Intern', 3), // To-Do
  new Task(7, 'API Introduction', 'Learn about RESTful APIs.', 'Intern', 3), // To-Do
  new Task(8, 'API Consumption', 'Consume an API in a project.', 'Intern', 3), // To-Do
  new Task(9, 'Final Project', 'Complete the final project.', 'Intern', 3), // To-Do
  new Task(10, 'Project Presentation', 'Present the final project.', 'Intern', 3), // To-Do
];
