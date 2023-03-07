import * as React from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import { Button, IconButton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./stores";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";

import "./global.css";
import Task from "./components/Task/Task";
import { Footer } from "./components/Footer/Footer";
import Dialog from "./components/Dialog/Dialog";
import Form from "./components/Dialog/Dialog";
import FormTeste from "./components/Dialog/Dialog";

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  //completed?: boolean;
  startDate?: Date;
  //dueDate?: Date;
  priority?: "Baixa" | "Normal" | "Alta";
  //state?: "Novo" | "Em Andamento" | "Pronto";
  //tags?: string[];
}
interface PropsProject {
  id: string;
  name: string;
  tasks: TaskProps[];
}

function App() {
  //const startDate = new Date("2023-03-01").toDateString();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );

  const projectInboxId = projects[0].id;
  const [selectedProject, setSelectedProject] = React.useState<PropsProject>();
  const [input, setInput] = React.useState({
    id: "",
    name: "",
  });
  const [taskInput, setTaskInput] = React.useState("");
  const [requireNewProject, setRequireNewProject] = React.useState(false);
  const [clickedProject, setClickedProject] = React.useState(false);
  const [form, setForm] = React.useState(false);
  const [editForm, setEditForm] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const project = projects.find(
      (project) => project.id === selectedProjectId
    );
    setSelectedProject(project);
  }, [selectedProjectId, projects]);

  const handleProjectClicked = (id: string) => {
    dispatch({
      type: "projects/setSelectedProjectId",
      payload: id,
    });
  };

  const handleButtonClickCreateNewProject = () => {
    setRequireNewProject(true);
  };

  const handleCreateNewProject = () => {
    if (input.id) {
      dispatch({
        type: "projects/editProject",
        payload: input,
      });
    } else {
      dispatch({
        type: "projects/createNewProject",
        payload: input.name,
      });
    }

    setInput({ id: "", name: "" });
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

  const handleEditProject = (projectId: string, projectName: string) => {
    setInput({ id: projectId, name: projectName });
    setRequireNewProject(true);
  };

  const handleInputTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.currentTarget.value);
  };
  const handleCreateNewTask = () => {
    console.log({ taskInput });
    dispatch({
      type: "projects/createNewTask",
      payload: {
        id: selectedProjectId,
        taskInput,
      },
    });
    setTaskInput("");
    ///handleProjectClicked(id);
    console.log({ selectedProject });
    //setSelectedProject(projects.find((project) => project.id === id));
  };

  const handleOpenPopUp = () => {
    setForm(true);
  };
  const handleOnClosePopUp = () => {
    setForm(false);
  };
  return (
    <>
      <Header />
      <Box sx={{ minHeight: "100vh" }} className={styles.wrapper}>
        <Box component="nav" className={styles.nav}>
          <List disablePadding>
            <ListItem
              disablePadding
              onClick={() => handleProjectClicked(projectInboxId)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
          </List>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText primary="Today" />
              </ListItemButton>
            </ListItem>
          </List>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
                <ListItemText primary="This week" />
              </ListItemButton>
            </ListItem>
          </List>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                {projects.map((project) => {
                  return (
                    project.id !== projectInboxId && (
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
                            size="small"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() =>
                              handleEditProject(project.id, project.name)
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </ListItemButton>
                      </ListItem>
                    )
                  );
                })}
              </List>
            )}
            {requireNewProject && (
              <Box>
                <TextField
                  label="Project name"
                  id="fullWidth"
                  value={input.name}
                  onChange={handleInput}
                  size="small"
                  required
                  fullWidth
                />
                <Box
                  sx={{
                    display: "flex",
                    margin: "5px",
                    justifyContent: "center",
                    gap: "10px",
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
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <>
            {selectedProject && (
              <>
                <Box className={styles.mainWrapper}>
                  <Typography variant="h4">{selectedProject.name}</Typography>
                  <Box sx={{ display: "flex", gap: "6px" }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleOpenPopUp}
                      sx={{ background: "#18a0fb", textTransform: "none" }}
                    >
                      New task
                    </Button>
                    <FormTeste
                      openPop={form}
                      handleOnClosePopUp={handleOnClosePopUp}
                    />
                  </Box>
                </Box>
                <Box className={styles.gridBox}>
                  {selectedProject.tasks.map((task) => {
                    return (
                      <Task
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        id={task.id}
                      />
                    );
                  })}
                </Box>
              </>
            )}
          </>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default App;
