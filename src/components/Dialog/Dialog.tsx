import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";

interface FormProps {
  openPop: boolean;
  handleOnClosePopUp: () => void;
}

const FormTeste: React.FC<FormProps> = ({ openPop, handleOnClosePopUp }) => {
  const [taskInput, setTaskInput] = React.useState("");
  const dispatch = useDispatch();

  const handleInputTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.currentTarget.value);
  };
  const handleCreateNewTask = (id: string) => {
    console.log({ taskInput });
    dispatch({
      type: "projects/createNewTask",
      payload: {
        id,
        taskInput,
      },
    });
    setTaskInput("");
    ///handleProjectClicked(id);
    //console.log({ selectedProject });
    //setSelectedProject(projects.find((project) => project.id === id));
  };
  return (
    <div>
      <Dialog open={openPop} onClose={handleOnClosePopUp}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
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
