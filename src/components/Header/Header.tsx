import styles from "./Header.module.css";
import Logo from "../../assets/Logo.svg";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

export function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className={styles.header}>
      <img src={Logo} alt="" />
      <ul>
        <li>
          <a href="#">Features</a>
        </li>
        <li>
          <a href="#">Pricing</a>
        </li>
        <li>
          <a href="#">Community</a>
        </li>
        <li>
          <a href="#">Support</a>
        </li>
      </ul>
      <div className={styles.buttons}>
        <button className={styles.outline}>Log in</button>
        <button className={styles.primary}>Register</button>
      </div>
      <div className={styles.mobileMenu}>
        <IconButton
          size="medium"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon color="primary" fontSize="inherit" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Features</MenuItem>
          <MenuItem onClick={handleClose}>Pricing</MenuItem>
          <MenuItem onClick={handleClose}>Community</MenuItem>
          <MenuItem onClick={handleClose}>Support</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
