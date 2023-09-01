import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "../../types/Task";

interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    /**
     * Add multiple tasks to the store. If a task already exists, update it.
     */
    addTasks: (state, action) => {
      action.payload.forEach((task: Task) => {
        const index = state.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          state.tasks[index] = task;
        } else {
          state.tasks.push(task);
        }
      });
    },

    updateStatusOfTask: (
      state,
      action: PayloadAction<{ id: number; status: TaskStatus }>,
    ) => {
      const { id, status } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index].status = status;
      }
    },

    removeTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { addTask, addTasks, updateStatusOfTask, removeTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
