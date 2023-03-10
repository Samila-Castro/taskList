import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
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
  startDate: string;
  dueDate: string;
  //priority?: "Baixa" | "Normal" | "Alta";
}
const inboxProject = { id: uuidv4(), name: "Inbox", tasks: [] };
const initialState: State = {
  projects: [inboxProject],
  selectedProjectId: inboxProject.id,
};

dayjs.extend(localizedFormat);
dayjs().format("L ll");

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
    editProject: (state, action) => {
      const copyProjects = [...state.projects];
      const projecteSelectedIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );

      state.projects[projecteSelectedIndex].name = action.payload.name;
    },

    deleteProject: (state, action) => {
      const copyProjects = [...state.projects];

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
      const newTask = {
        ...action.payload.taskInput,
        id: uuidv4(),
        startDate: dayjs(new Date()).format("YYYY-MM-DD"),
        dueDate: dayjs(new Date()).format("YYYY-MM-DD"),
      };
      const newTaskArray = [...currectProject.tasks, newTask];
      copyProjects[projecteSelectedIndex].tasks = newTaskArray.sort((a, b) => {
        if (dayjs(a.startDate).isAfter(dayjs(b.startDate))) return 1;
        return -1;
      });
    },

    editTask: (state, action) => {
      const copyProjects = [...state.projects];
      const projecteSelectedIndex = state.projects.findIndex(
        (project) => project.id === state.selectedProjectId
      );

      const taskSelectedIndex = state.projects[
        projecteSelectedIndex
      ].tasks.findIndex((task) => task.id === action.payload.id);
      state.projects[projecteSelectedIndex].tasks[taskSelectedIndex] =
        action.payload;

      state.projects[projecteSelectedIndex].tasks = state.projects[
        projecteSelectedIndex
      ].tasks.sort((a, b) => {
        if (dayjs(a.startDate).isAfter(dayjs(b.startDate))) return 1;
        return -1;
      });
    },
    deleteTask: (state, action) => {
      const projecteSelectedIndex = state.projects.findIndex(
        (project) => project.id === state.selectedProjectId
      );

      const tasks = state.projects[projecteSelectedIndex].tasks;
      state.projects[projecteSelectedIndex].tasks = tasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
  },
});

export const {
  createNewProject,
  deleteProject,
  editProject,
  deleteTask,
  editTask,
} = projectSlicer.actions;
export default projectSlicer.reducer;
