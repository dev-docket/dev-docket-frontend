import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "../../types/Task";
import {
  createTask,
  deleteTask,
  fetchAllUserTasks,
  patchTask,
} from "./actions/task";

interface TaskState {
  tasks: Task[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
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

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
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

    removeTaskById: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllUserTasks.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      fetchAllUserTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        state.loading = "idle";
        state.tasks = action.payload;
      },
    );
    builder.addCase(fetchAllUserTasks.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(patchTask.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createTask.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      createTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.loading = "idle";
        state.tasks.push(action.payload);
      },
    );
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(
      patchTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.loading = "idle";
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      },
    );
    builder.addCase(patchTask.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = "idle";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      },
    );
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export const {
  addTask,
  addTasks,
  updateTask,
  updateStatusOfTask,
  removeTasks,
  removeTaskById,
} = taskSlice.actions;
export default taskSlice.reducer;
