import { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { useAppDispatch } from "@/redux/hooks";
import { addTask } from "@/redux/tasks";

const AddTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = Number(sessionStorage.getItem("userId"));
    const taskId = Math.floor(Math.random() * 1000);
    dispatch(addTask({ userId: userId, id: taskId, title, completed: false }));
    router.push("/");
  };

  return (
    <div className="container">
      <h1>Add task</h1>
      <form onSubmit={handleSubmit} className="container">
        <label>
          Task description:
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add task description"
            required={true}
          />
        </label>
        <Button
          type="submit"
          text={"Save"}
          color="primary"
          disabled={!title.trim()}
        />
      </form>
    </div>
  );
};

export default AddTask;
