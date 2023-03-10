import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreVert";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";

import { useDispatch } from "react-redux";
import { blue, deepPurple } from "@mui/material/colors";
import { pink } from "@mui/material/colors";

import {
  Box,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  startDate: string;
  dueDate: string;
  priority?: "Baixa" | "Normal" | "Alta";
  state?: "Novo" | "Em Andamento" | "Pronto";
  tags?: string[];
  taskEdit: () => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  startDate,
  taskEdit,
  dueDate,
}) => {
  const dispatch = useDispatch();
  const [dialogOpen, setdialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
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
            paddingBottom: "4px",
            gap: "10px",
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
            <MenuItem onClick={() => taskEdit()}>Editar</MenuItem>
            <MenuItem onClick={handleDeleteTask}>Deletar</MenuItem>
          </Menu>
        </Box>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <ScheduleOutlinedIcon fontSize="small" color="primary" />
            <Typography
              sx={{
                color: "#8d8d99",
                fontSize: "12px",
              }}
            >
              {startDate}
            </Typography>
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <AlarmOnIcon fontSize="small" color="error" />
            <Typography sx={{ color: "#8d8d99", fontSize: "12px" }}>
              {dueDate}
            </Typography>
          </Typography>
        </CardContent>
        <Divider light />
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
            <DialogTitle> ???? Detalhes da tarefa</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ marginBottom: "0.5rem" }}
              >
                T??tulo: {title}
              </DialogContentText>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ marginBottom: "0.5rem" }}
              >
                Descri????o: {description}
              </DialogContentText>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ marginBottom: "0.5rem" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <ScheduleOutlinedIcon fontSize="small" color="primary" />
                    <span>{startDate}</span>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <AlarmOnIcon fontSize="small" color="error" />
                    <span>{dueDate}</span>
                  </Box>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </CardActions>
      </Card>
    </>
  );
};

export default Task;
