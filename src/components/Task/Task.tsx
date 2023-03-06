import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { blue, deepPurple } from "@mui/material/colors";
import MoreHorizIcon from "@material-ui/icons/MoreVert";
import { pink } from "@mui/material/colors";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  startDate: string;
  dueDate?: Date;
  priority?: "Baixa" | "Normal" | "Alta";
  state?: "Novo" | "Em Andamento" | "Pronto";
  tags?: string[];
}

const Task: React.FC<TaskProps> = ({ id, title, description, startDate }) => {
  const [dialogOpen, setdialogOpen] = React.useState(false);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const [openOption, setOpenOption] = React.useState(false);

  const handleClickOpenOption = () => {
    setOpenOption(true);
  };

  const handleDeleteTask = () => {
    dispatch({
      type: "projects/deleteTask",
      payload: {
        id,
      },
    });
  };

  const handleCloseDialog = () => {
    setdialogOpen(false);
  };

  const handleClickOpenDialog = () => {
    setdialogOpen(true);
  };
  return (
    <>
      <Card sx={{ maxWidth: "15rem", borderRadius: "5%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <Typography
            sx={{
              background: "#e3caff",
              borderRadius: "25px",
              color: "#495ba4",
              padding: "0.2rem 1rem",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose2}>Editar</MenuItem>
            <MenuItem onClick={handleDeleteTask}>Deletar</MenuItem>
          </Menu>
        </Box>
        <CardContent>
          <Typography>{description}</Typography>
          <Divider light />
        </CardContent>
        <CardActions
          sx={{
            paddingRight: "16px",
            paddingLeft: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AvatarGroup max={4}>
            <Avatar sx={{ bgcolor: pink[500], width: 20, height: 20 }}>
              a
            </Avatar>
            <Avatar sx={{ bgcolor: blue[500], width: 20, height: 20 }}>
              p
            </Avatar>
            <Avatar sx={{ bgcolor: deepPurple[500], width: 20, height: 20 }}>
              o
            </Avatar>
          </AvatarGroup>
          <IconButton color="primary" onClick={handleClickOpenDialog}>
            <FullscreenIcon fontSize="small" />
          </IconButton>
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </CardActions>
      </Card>
    </>
  );
};

export default Task;
