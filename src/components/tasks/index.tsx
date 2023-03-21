import styles from "./tasks.module.css";
import { PlusCircle, Trash, Truck } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface datas {
  id: string;
  name: string;
  isCompleted: boolean;
}

const Tasks = () => {
  const [nameTask, setNameTask] = useState<string>("");
  const [tasks, setNewTasks] = useState<datas[]>([
    {
      id: uuidv4(),
      name: " Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      isCompleted: false,
    },
  ]);

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameTask(event.target.value);
    event.target.setCustomValidity("");
  };

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();
    const newTask = {
      id: uuidv4(),
      name: nameTask,
      isCompleted: false,
    };
    setNewTasks([...tasks, newTask]);
    setNameTask("");
  };

  const tasksCreated = tasks.length;

  const Taskscompleted = tasks.filter((task) => {
    return task.isCompleted !== false;
  });

  const deleteTask = (id: string) => {
    const index = tasks.filter((task) => {
      return task.id !== id;
    });
    setNewTasks(index);
  };

  const handleTaskCompleted = (id: string, checked: boolean) => {
    const gettingIndex = tasks.findIndex((task) => {
      return task.id === id;
    });
    tasks[gettingIndex].isCompleted = !checked;
    setNewTasks([...tasks]);
  };

  const handleNewTaskInvalid = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("digite uma tarefa");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleCreateNewTask}>
        <div className={styles.newTask}>
          <input
            required={true}
            value={nameTask}
            onChange={handleNewTaskChange}
            placeholder="Adicione uma nova tarefa"
            type="text"
            onInvalid={handleNewTaskInvalid}
          />
          <button type="submit">
            Criar
            <PlusCircle size={19} />
          </button>
        </div>
      </form>
      <div className={styles.container}>
        <div className={styles.containerTasksCreated}>
          <div className={styles.tasksCreated}>
            <span>Tarefas criadas</span>
            <span>{tasksCreated}</span>
          </div>
          <div className={styles.Taskscompleted}>
            <span>Concluídas</span>
            <span>
              {Taskscompleted.length} de {tasksCreated}
            </span>
          </div>
        </div>
        {tasks.map((task) => {
          return (
            <div className={styles.salve1}>
              <div className={styles.salve2}>
                <div className={styles.peido}>
                  <input
                    onClick={() => {
                      handleTaskCompleted(task.id, task.isCompleted);
                    }}
                    type="checkbox"
                  />
                </div>
                <p
                  className={
                    task.isCompleted ? styles.isCompleted : styles.notCompleted
                  }
                >
                  {task.name}
                </p>
              </div>
              <button
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                <Trash size={19} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Tasks };
