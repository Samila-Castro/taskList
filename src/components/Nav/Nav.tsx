import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import styles from "./Nav.module.css";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import React from "react";

interface NavProps {
  project: PropsProject;
}
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

export function Nav() {
  const [requireNewProject, setRequireNewProject] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<PropsProject>();
  const [clickedProject, setClickedProject] = React.useState(false);
  const [input, setInput] = React.useState("");

  const projects = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const handleButtonClickCreateNewProject = () => {
    setRequireNewProject(true);
  };

  const handleProjectClicked = (id: string) => {
    const selected = projects.find((project) => project.id === id);
    setSelectedProject(selected);
    setClickedProject(true);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
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
  return (
    <Box component="nav" className={styles.nav}>
      <List disablePadding>
        <ListItem disablePadding>
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
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        {requireNewProject && (
          <Box>
            <TextField
              label="Project name"
              id="fullWidth"
              value={input}
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
  );
}
