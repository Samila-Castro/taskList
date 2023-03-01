import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";
import App from "./App";

import store from "./stores";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

/*import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import { Button, IconButton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./stores";
import { Header } from "./components/Header/Header";

import "./global.css";
import Task from "./components/Task/Task";

const drawerWidth = 240;

interface TaskProps {
  title: string;
  //description?: string;
  //completed?: boolean;
  //startDate?: Date;
  //dueDate?: Date;
  //priority?: "Baixa" | "Normal" | "Alta";
  //state?: "Novo" | "Em Andamento" | "Pronto";
  //tags?: string[];
}
interface PropsProject {
  id: string;
  name: string;
  tasks: TaskProps[];
}

function App() {
  const [selectedProject, setSelectedProject] = React.useState<PropsProject>();
  const [input, setInput] = React.useState("");
  const [taskInput, setTaskInput] = React.useState("");
  const [requireNewProject, setRequireNewProject] = React.useState(false);
  const [clickedProject, setClickedProject] = React.useState(false);

  const projects = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleProjectClicked = (id: string) => {
    const selected = projects.find((project) => project.id === id);
    setSelectedProject(selected);
    setClickedProject(true);
  };

  const handleButtonClickCreateNewProject = () => {
    setRequireNewProject(true);
  };

  const handleCreateNewProject = () => {
    dispatch({
      type: "projects/createNewProject",
      payload: input,
    });

    setInput("");
    setRequireNewProject(false);
  };

  const handleCreatNewProjectCancell = () => {
    setRequireNewProject(false);
  };

  const handleDeleteProject = (id: string) => {
    dispatch({
      type: "projects/deleteProject",
      payload: {
        id,
      },
    });
  };

  const handleInputTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.currentTarget.value);
  };
  const handleCreateNewTask = (id: string) => {
    console.log(taskInput);
    dispatch({
      type: "projects/createNewTask",
      payload: {
        id,
        taskInput,
      },
    });
    setTaskInput("");
    handleProjectClicked(id);
    console.log(selectedProject);
    //setSelectedProject(projects.find((project) => project.id === id));
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Header />
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TodayIcon />
                  </ListItemIcon>
                  <ListItemText primary="Today" />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DateRangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="This week" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Typography variant="h6">Projects</Typography>
              <IconButton
                size="medium"
                aria-label="Adicionar novo projeto"
                onClick={handleButtonClickCreateNewProject}
              >
                <PlaylistAddIcon color="primary" fontSize="inherit" />
              </IconButton>
            </Box>
            {projects.length > 0 && (
              <List>
                {projects.map((project) => (
                  <ListItem
                    key={project.id}
                    disablePadding
                    onClick={() => handleProjectClicked(project.id)}
                  >
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "30px" }}>
                        <ListIcon color="action" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={project.name} />
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}

            {requireNewProject && (
              <Box sx={{ padding: "1rem" }}>
                <>
                  <TextField
                    label="Project name"
                    id="fullWidth"
                    value={input}
                    onChange={handleInput}
                    size="small"
                    required
                  />
                </>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    sx={{ textTransform: "none" }}
                    size="small"
                    variant="contained"
                    onClick={handleCreateNewProject}
                  >
                    <AddIcon fontSize="small" />
                    Add
                  </Button>
                  <Button
                    sx={{ textTransform: "none" }}
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={handleCreatNewProjectCancell}
                  >
                    <CloseIcon fontSize="small" />
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <>
            <Toolbar />
            {selectedProject && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">{selectedProject.name}</Typography>
                  <Box sx={{ display: "flex", gap: "6px" }}>
                    <TextField
                      sx={{
                        width: "25ch",
                      }}
                      label="Adicionar nova task"
                      id="fullWidth"
                      value={taskInput}
                      onChange={handleInputTask}
                      size="small"
                    />
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleCreateNewTask(selectedProject.id)}
                    >
                      <CheckBoxOutlinedIcon fontSize="small" />
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ margin: "1rem", display: "grid" }}>
                  {selectedProject.tasks.map((task) => {
                    return <Task title={task.title} />;
                  })}
                </Box>
              </>
            )}
          </>
        </Box>
      </Box>
    </>
  );
}

export default App;
*/
