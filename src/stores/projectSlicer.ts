import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface PropsProject {
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
const initialState = [{ id: "123", name: "Inbox", tasks: [] }];
export const projectSlicer = createSlice({
  name: "projects",
  initialState,
  reducers: {
    createNewProject: (state, action) => {
      state.push({
        id: uuidv4(),
        name: action.payload,
        tasks: [],
      });
    },

    deleteProject: (state, action) => {
      const copyProjects = [...state];
      console.log({ action });
      state = copyProjects.filter((project) => project.id == action.payload.id);
    },

    createNewTask: (state, action) => {
      const copyProjects = [...state];
      const projecteSelectedIndex = state.findIndex(
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
