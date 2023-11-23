import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "../../types/Task";
import {
  createTask,
  deleteTask,
  fetchAllTasksInTeam,
  fetchAllUserTasks,
  patchTask,
} from "./actions/task";

interface TaskState {
  tasks: Task[];
  loading: {
    fetchAllTasksInTeam: "idle" | "pending" | "failed";
    fetchAllUserTasks: "idle" | "pending" | "failed";
    patchTask: "idle" | "pending" | "failed";
    createTask: "idle" | "pending" | "failed";
    deleteTask: "idle" | "pending" | "failed";
  };
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: {
    fetchAllTasksInTeam: "idle",
    fetchAllUserTasks: "idle",
    patchTask: "idle",
    createTask: "idle",
    deleteTask: "idle",
  },
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
        const updatedTask = state.tasks.splice(index, 1)[0]; // Remove the updated task from its current position
        state.tasks.push(updatedTask); // Add the updated task to the bottom of the list
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
    builder
      // Handle fetchAllTasksInTeam
      .addCase(fetchAllTasksInTeam.pending, (state) => {
        state.loading.fetchAllTasksInTeam = "pending";
      })
      .addCase(
        fetchAllTasksInTeam.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading.fetchAllTasksInTeam = "idle";
          state.tasks = action.payload;
        },
      )
      .addCase(fetchAllTasksInTeam.rejected, (state, action) => {
        state.loading.fetchAllTasksInTeam = "failed";
        state.error = action.error.message ?? null;
      })

      // Handle fetchAllUserTasks
      .addCase(fetchAllUserTasks.pending, (state) => {
        state.loading.fetchAllUserTasks = "pending";
      })
      .addCase(
        fetchAllUserTasks.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading.fetchAllUserTasks = "idle";
          state.tasks = action.payload;
        },
      )
      .addCase(fetchAllUserTasks.rejected, (state, action) => {
        state.loading.fetchAllUserTasks = "failed";
        state.error = action.error.message ?? null;
      })

      // Handle patchTask
      .addCase(patchTask.pending, (state) => {
        state.loading.patchTask = "pending";
      })
      .addCase(patchTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading.patchTask = "idle";
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(patchTask.rejected, (state, action) => {
        state.loading.patchTask = "failed";
        state.error = action.error.message ?? null;
      })

      // Handle createTask
      .addCase(createTask.pending, (state) => {
        state.loading.createTask = "pending";
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading.createTask = "idle";
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading.createTask = "failed";
        state.error = action.error.message ?? null;
      })

      // Handle deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading.deleteTask = "pending";
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading.deleteTask = "idle";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading.deleteTask = "failed";
        state.error = action.error.message ?? null;
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
