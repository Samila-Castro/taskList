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
  title: string;
  //description?: string;
  //completed?: boolean;
  //startDate?: Date;
  //dueDate?: Date;
  priority?: "Baixa" | "Normal" | "Alta";
  //state?: "Novo" | "Em Andamento" | "Pronto";
  //tags?: string[];
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
        (project) => project.id == action.payload.id
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
          title: action.payload.taskInput,
        },
      ];
      copyProjects[projecteSelectedIndex].tasks = newTaskArray;
    },
  },
});

export const { createNewProject, deleteProject } = projectSlicer.actions;
export default projectSlicer.reducer;
