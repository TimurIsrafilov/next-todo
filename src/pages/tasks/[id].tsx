import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleTaskStatus, editTask } from "@/redux/tasks";
import { RootState } from "@/redux/store";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";

const Task: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const task = useAppSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === Number(id))
  );

  const [title, setTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleToggleStatus = () => {
    if (id) {
      dispatch(toggleTaskStatus(Number(id)));
    }
  };

  const handleEditTask = () => {
    if (task) {
      const updatedTask = {
        ...task,
        title: title,
      };
      dispatch(editTask(updatedTask));
      setIsEditing(false);
      router.push("/");
    }
  };

  if (!task) {
    return <h2>Task not found</h2>;
  }

  const toggleText = !task.completed ? "Active" : "Done";
  const toggleColor = !task.completed ? "primary" : "secondary";

  const handleOnBackClick = () => {
    router.push("/");
  };

  return (
    <div className="container">
      <h1>Task #{task.id}</h1>
      <Button onClick={handleOnBackClick} text={"Back"} color="primary" />
      <div className="section">
        <h3>Status: {toggleText}</h3>
        <Button
          onClick={handleToggleStatus}
          text={toggleText}
          color={toggleColor}
        />
      </div>

      {isEditing ? (
        <form onSubmit={(e) => e.preventDefault()} className="container">
          <label>
            Title:
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new task description"
              required={true}
            />
          </label>
          <Button
            onClick={handleEditTask}
            text={"Save"}
            color="secondary"
            disabled={!title.trim()}
          />
        </form>
      ) : (
        <div className="container">
          <h3 className="task">{task.title}</h3>
          <Button
            onClick={() => setIsEditing(true)}
            text={"Edit"}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default Task;
