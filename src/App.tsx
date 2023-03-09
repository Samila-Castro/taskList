import * as React from "react";
import {
  Button,
  IconButton,
  TextField,
  Box,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
  AlertTitle,
} from "@mui/material";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./stores";
import { Header } from "./components/Header/Header";

import styles from "./App.module.css";
import "./global.css";

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { Footer } from "./components/Footer/Footer";
import FormTeste from "./components/Dialog/Dialog";
import Task from "./components/Task/Task";

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
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const dispatch = useDispatch();
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
  const [requireNewProject, setRequireNewProject] = React.useState(false);
  const [form, setForm] = React.useState(false);
  const [taskInputEdit, setTaskInputEdit] = React.useState<TaskProps>();
  const [isEdit, setIsEdit] = React.useState(false);
  const [showError, setShowError] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ id: input.id, name: event.currentTarget.value });
  };

  React.useEffect(() => {
    const project = findProjectById(selectedProjectId);
    if (project)
      setContent({
        title: project.name,
        tasks: project.tasks,
        createIsAllowed: true,
      });
  }, [projects]);

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
    const startOfWeek = dayjs(dayjs().startOf("w")).format("YYYY-MM-DD");
    const endOfWeek = dayjs(dayjs().endOf("w")).format("YYYY-MM-DD");

    const allTaks = projects.flatMap((project) => project.tasks);
    const weekTaks = allTaks.filter(
      (task) =>
        dayjs(task.startDate).isSameOrAfter(startOfWeek) &&
        dayjs(task.startDate).isSameOrBefore(endOfWeek)
    );

    setContent({
      title: "This week",
      tasks: weekTaks,
      createIsAllowed: false,
    });
  };

  const findProjectById = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  const handleProjectClicked = (id: string) => {
    const project = findProjectById(id);
    if (project)
      setContent({
        title: project.name,
        tasks: project.tasks,
        createIsAllowed: true,
      });
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
      const alreadyExist = projects.some(
        (project) => project.name === input.name
      );
      if (alreadyExist) {
        setShowError("Já existe");
      } else if (input.name === "") {
        setShowError("Forneca um nome");
      } else {
        dispatch({
          type: "projects/createNewProject",
          payload: input.name,
        });
      }
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
            {showError && (
              <Alert
                severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowError("");
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                color="warning"
              >
                {showError}
              </Alert>
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
