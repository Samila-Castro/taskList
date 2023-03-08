import * as React from "react";
import Box from "@mui/material/Box";
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
import dayjs from "dayjs";

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  //completed?: boolean;
  startDate: string;
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

interface Content {
  title: string;
  tasks: TaskProps[];
  createIsAllowed?: boolean;
}

function App() {
  //const startDate = new Date("2023-03-01").toDateString();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );

  const projectInboxId = projects[0].id;
  const [content, setContent] = React.useState<Content | null>(null);
  const [input, setInput] = React.useState({
    id: "",
    name: "",
  });
  const [taskInput, setTaskInput] = React.useState("");
  const [requireNewProject, setRequireNewProject] = React.useState(false);
  const [form, setForm] = React.useState(false);
  const [taskInputEdit, setTaskInputEdit] = React.useState<TaskProps>();
  const [isEdit, setIsEdit] = React.useState(false);
  const dispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ id: input.id, name: event.currentTarget.value });
  };

  React.useEffect(() => {
    const project = projects.find(
      (project) => project.id === selectedProjectId
    );
    if (project)
      setContent({
        title: project.name,
        tasks: project.tasks,
        createIsAllowed: true,
      });
    else setContent(null);
  }, [selectedProjectId, projects]);

  const handleTodayClicked = () => {
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    const allTaks = projects.flatMap((project) => project.tasks);
    const toDayTaks = allTaks.filter((task) => task.startDate === today);

    setContent({
      title: "Today",
      tasks: toDayTaks,
      createIsAllowed: false,
    });
  };

  const handleWeekClicked = () => {
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    const allTaks = projects.flatMap((project) => project.tasks);
    const weekTaks = allTaks.filter((task) => task.startDate !== today);

    setContent({
      title: "This week",
      tasks: weekTaks,
      createIsAllowed: false,
    });
  };

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

  const handleDeleteTask = (id: string) => {
    dispatch({
      type: "projects/deleteTask",
      payload: {
        id,
      },
    });
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
  const handleCreateNewTask = () => {
    dispatch({
      type: "projects/createNewTask",
      payload: {
        id: selectedProjectId,
        taskInput,
      },
    });
    setTaskInput("");
    ///handleProjectClicked(id);
    //setContent(projects.find((project) => project.id === id));
  };

  const handleEditTask = (task: TaskProps) => {
    setIsEdit(true);
    setTaskInputEdit(task);
    setForm(true);
  };

  const handleIniteCreateTask = () => {
    setTaskInputEdit({
      id: "",
      title: "",
      description: "",
      startDate: "",
    });
    setForm(true);
  };

  const handleEditProject = (projectId: string, projectName: string) => {
    setInput({ id: projectId, name: projectName });
    setRequireNewProject(true);
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
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleProjectClicked(projectInboxId)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleTodayClicked()}>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText primary="Today" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleWeekClicked()}>
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
            {content && (
              <>
                <Box className={styles.mainWrapper}>
                  <Typography variant="h4" sx={{ fontFamily: "inherit" }}>
                    {content.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "6px" }}>
                    {content.createIsAllowed && (
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleIniteCreateTask}
                        sx={{ background: "#18a0fb", textTransform: "none" }}
                      >
                        New task
                      </Button>
                    )}
                    <FormTeste
                      openPop={form}
                      handleOnClosePopUp={handleOnClosePopUp}
                      task={taskInputEdit}
                    />
                  </Box>
                </Box>
                <Box className={styles.gridBox}>
                  {content.tasks.map((task) => {
                    return (
                      <Task
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        id={task.id}
                        taskEdit={() => handleEditTask(task)}
                        startDate={task.startDate}
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
