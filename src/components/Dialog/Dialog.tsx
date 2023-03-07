import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { IconButton } from "@mui/material";

interface FormProps {
  openPop: boolean;
  handleOnClosePopUp: () => void;
}

const FormTeste: React.FC<FormProps> = ({ openPop, handleOnClosePopUp }) => {
  const [taskInput, setTaskInput] = React.useState({
    title: "",
    description: "",
    startDate: "",
  });
  const dispatch = useDispatch();
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );

  const handleInputTask = (value: string, key: string) => {
    setTaskInput({
      ...taskInput,
      [key]: value,
    });
    console.log(taskInput);
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
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) =>
              handleInputTask(event.currentTarget.value, "title")
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descrição da task"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) =>
              handleInputTask(event.currentTarget.value, "description")
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateNewTask}>Criar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormTeste;
