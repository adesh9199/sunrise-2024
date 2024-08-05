import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

// Initialize tasks if needed (for example, if we want to reset tasks)
export function initializeTasks() {
  tasks = [...initialTasks];
}

// Get active tasks (tasks that are not completed)
export function getActiveTasks(): Task[] {
  return tasks.filter(task => !task.completed);
}

// Get completed tasks
export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

// Get all tasks
export function getAllTasks(): Task[] {
  return tasks;
}

// Mark a task as completed
export function completeTask(taskId: number): void {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: true, group: 2 } : task
  );
  // Move a task from To-Do to In Progress if available
  const toDoTask = tasks.find(task => task.group === 3 && !task.completed);
  if (toDoTask) {
    toDoTask.group = 1; // Move to In Progress
  }
}

// Create a new task
export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask: Task = new Task(
    tasks.length + 1,
    title,
    description,
    persona,
    group
  );
  tasks.push(newTask);
}

// Update a task
export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
}

// Delete a task
export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
