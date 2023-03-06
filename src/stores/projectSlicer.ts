import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface State {
  projects: Project[];
  selectedProjectId: string;
}
interface Project {
  id: string;
  name: string;
  tasks: TaskProps[];
}

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  //priority?: "Baixa" | "Normal" | "Alta";
}
const inboxProject = { id: uuidv4(), name: "Inbox", tasks: [] };
const initialState: State = {
  projects: [inboxProject],
  selectedProjectId: inboxProject.id,
};

export const projectSlicer = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    createNewProject: (state, action) => {
      state.projects.push({
        id: uuidv4(),
        name: action.payload,
        tasks: [],
      });
    },

    deleteProject: (state, action) => {
      const copyProjects = [...state.projects];
      console.log({ action });
      state.projects = copyProjects.filter(
        (project) => project.id !== action.payload.id
      );
    },

    createNewTask: (state, action) => {
      const copyProjects = [...state.projects];
      const projecteSelectedIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      const currectProject = copyProjects[projecteSelectedIndex];
      const newTaskArray = [
        ...currectProject.tasks,
        {
          id: uuidv4(),
          startDate: new Date("2023-02-12").toDateString(),
          ...action.payload.taskInput,
        },
      ];
      copyProjects[projecteSelectedIndex].tasks = newTaskArray;
    },
    deleteTask: (state, action) => {
      console.log({ action });
      const projecteSelectedIndex = state.projects.findIndex(
        (project) => project.id === state.selectedProjectId
      );

      const tasks = state.projects[projecteSelectedIndex].tasks;
      state.projects[projecteSelectedIndex].tasks = tasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    editProject: (state, action) => {},
  },
});

export const { createNewProject, deleteProject, deleteTask } =
  projectSlicer.actions;
export default projectSlicer.reducer;
