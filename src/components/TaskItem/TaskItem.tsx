import { useRouter } from "next/router";
import styles from "./TaskItem.module.scss";
import Button from "@/components/ui/Button/Button";
import { useAppDispatch } from "@/redux/hooks";
import { toggleTaskStatus, removeTask } from "@/redux/tasks";

type TaskItemProps = {
  id: number;
  title: string;
  completed: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskStatus(id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeTask(id));
  };

  const handleOnShowClick = () => {
    router.push(`/tasks/${id}`);
  };

  const toggleText = !completed ? "Active" : "Done";
  const toggleColor = !completed ? "primary" : "secondary";

  return (
    <li className={styles.task} onClick={handleOnShowClick}>
      <p className={`${styles.title} ${completed ? styles.completed : ""}`}>
        {`#${id} - ${title}`}
      </p>
      <div className={styles.buttons}>
        <Button
          onClick={handleToggleStatus}
          text={toggleText}
          color={toggleColor}
        />
        <Button onClick={handleDelete} text={"Delete"} color={"warning"} />
      </div>
    </li>
  );
};

export default TaskItem;
