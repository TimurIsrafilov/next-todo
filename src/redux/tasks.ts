import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeTask } from "@/types/task";

type TasksState = {
  tasks: TypeTask[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TypeTask[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<TypeTask>) {
      state.tasks.unshift(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus(state, action: PayloadAction<number>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask(state, action: PayloadAction<TypeTask>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, addTask, removeTask, toggleTaskStatus, editTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
