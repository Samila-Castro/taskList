import * as React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";

interface TaskProps {
  id?: string;
  title: string;
  description?: string;
  startDate: string;
  dueDate: string;
  priority?: "Baixa" | "Normal" | "Alta";
}
interface FormProps {
  openPop: boolean;
  handleOnClosePopUp: () => void;
  task?: TaskProps;
}

const FormTeste: React.FC<FormProps> = ({
  openPop,
  handleOnClosePopUp,
  task,
}) => {
  const dispatch = useDispatch();
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );

  const [taskInput, setTaskInput] = React.useState<TaskProps>({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
  });

  React.useEffect(() => {
    if (task) setTaskInput(task);
    else {
      setTaskInput({
        title: "",
        description: "",
        startDate: "",
        dueDate: "",
      });
    }
  }, [task]);

  const handleInputTask = (value: string, key: string) => {
    setTaskInput({
      ...taskInput,
      [key]: value,
    });
  };
  const handleCreateNewTask = () => {
    if (taskInput.id) {
      dispatch({
        type: "projects/editTask",
        payload: taskInput,
      });
    } else
      dispatch({
        type: "projects/createNewTask",
        payload: {
          id: selectedProjectId,
          taskInput,
        },
      });
    handleOnClosePopUp();
  };

  return (
    <div>
      <Dialog open={openPop} onClose={handleOnClosePopUp}>
        <DialogTitle>❤️‍🔥 🚧 </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a task, please enter fill in all the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Título da task"
            type="text"
            value={taskInput.title}
            fullWidth
            variant="standard"
            onChange={(event) =>
              handleInputTask(event.currentTarget.value, "title")
            }
          />
          <TextField
            value={taskInput.description}
            autoFocus
            margin="dense"
            id="name"
            label="Descrição da task"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) =>
              handleInputTask(event.currentTarget.value, "description")
            }
          />
          {taskInput.id && (
            <Box sx={{ marginTop: "1rem" }}>
              <Typography>Data</Typography>
              <TextField
                value={taskInput.startDate}
                autoFocus
                margin="dense"
                id="name"
                type="date"
                fullWidth
                variant="standard"
                onChange={(event) =>
                  handleInputTask(event.currentTarget.value, "startDate")
                }
              />
              <Typography>Data de término</Typography>
              <TextField
                value={taskInput.dueDate}
                autoFocus
                margin="dense"
                id="name"
                type="date"
                fullWidth
                variant="standard"
                onChange={(event) =>
                  handleInputTask(event.currentTarget.value, "dueDate")
                }
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateNewTask}>Criar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormTeste;
