import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button/Button";
import TaskItem from "@/components/TaskItem/TaskItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTasks } from "@/redux/tasks";
import { RootState } from "@/redux/store";
import { fetchTasks } from "./api/todos";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadTasks = () => {
      let userId = sessionStorage.getItem("userId");
      if (!userId) {
        userId = (Math.floor(Math.random() * 10) + 1).toString();
        sessionStorage.setItem("userId", userId);
      }

      setIsLoading(true);
      fetchTasks()
        .then((tasks) => {
          const filteredTasks = tasks.filter(
            (task: { userId: number }) => task.userId === Number(userId)
          );
          dispatch(setTasks(filteredTasks));
        })
        .catch((error) => {
          console.error("Failed to load tasks:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (tasks.length === 0) {
      loadTasks();
    }
  }, [dispatch, tasks.length]);

  const handleOnAddClick = () => {
    router.push(`/add-task`);
  };

  return (
    <div className="container">
      <h1>Tasks list</h1>
      <Button
        onClick={handleOnAddClick}
        text={"Add task"}
        color={"secondary"}
      />
      {isLoading ? (
        <h2>Tasks Loading...</h2>
      ) : (
        <ul className="tasks-container">
          {tasks.map((task) => (
            <TaskItem
              id={task.id}
              title={task.title}
              completed={task.completed}
              key={task.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
