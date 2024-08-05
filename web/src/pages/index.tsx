import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { TiTick, TiPlus, TiDelete } from "react-icons/ti";
import { BiMoon, BiSun } from "react-icons/bi";
import { Inter } from "next/font/google";
import { initialTasks } from "@/utils/TaskList"; // Adjust import path as necessary
import Task from "@/model/Task"; // Ensure the correct path

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const filterTasks = (group: number) => {
    return tasks.filter(task => task.group === group && !task.completed);
  };

  const filterCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  const handleDoneClick = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true, group: 2 } : task
      );

      // Find the first available task in the "To-Do" section
      const toDoTasks = updatedTasks.filter(task => task.group === 3 && !task.completed);
      if (toDoTasks.length > 0) {
        const newTask = toDoTasks[0]; // Get the first To-Do task
        const updatedNewTask = { ...newTask, group: 1 }; // Move it to In Progress
        return updatedTasks.map(task =>
          task.id === newTask.id ? updatedNewTask : task
        );
      }

      return updatedTasks;
    });
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "" || newTaskDescription.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }
    const newTask: Task = new Task(
      tasks.length + 1,
      newTaskTitle,
      newTaskDescription,
      "Intern",
      3
    );
    setTasks([...tasks, newTask]);
    setShowForm(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="description" content="Task Board Documentation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          body { font-family: ${inter.style.fontFamily}; }
        `}</style>
      </Head>
      <main className={`${styles.main} ${darkMode ? styles.darkMode : ''}`}>
        <header className={`${styles.header} ${darkMode ? styles.darkMode : ''}`}>
          <h1 className={styles.title}>Task Board</h1>
          <button className={styles.toggleButton} onClick={toggleDarkMode}>
            {darkMode ? < BiSun className={styles.toggleButtons} /> : <BiMoon />}
          </button>
        </header>
        <div className={styles.grid}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                To-Do <span className={styles.taskCounttodo}>{filterTasks(3).length}</span>
              </h2>
              <button className={styles.createTaskButton} onClick={() => setShowForm(!showForm)}>
                <TiPlus /> Create New Task
              </button>
            </div>
            {showForm && (
              <div className={styles.newTaskForm}>
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <textarea
                  placeholder="Task Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <button className={styles.addTaskButton} onClick={handleAddTask}>
                  Add
                </button>
              </div>
            )}
            {filterTasks(3).map(task => (
              <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButtonin} disabled>
                    <TiTick className={styles.tick} /> Done
                  </button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              In Progress <span className={styles.taskCountinpr}>{filterTasks(1).length}</span>
            </h2>
            {filterTasks(1).map(task => (
              <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButton} onClick={() => handleDoneClick(task.id)}>
                    <TiTick className={styles.tick} /> Done
                  </button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Completed <span className={styles.taskCountcmpt}>{filterCompletedTasks().length}</span>
            </h2>
            {filterCompletedTasks().map(task => (
              <div className={`${styles.card} ${styles.completedCard}`} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButtonct} disabled>
                     Completed
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteTask(task.id)}>
                    <TiDelete />
                  </button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
