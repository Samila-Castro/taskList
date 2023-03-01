import styles from "./Header.module.css";
import Logo from "../../assets/Logo.svg";
import { IconButton } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";

export function Header() {
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
        <IconButton size="medium">
          <MenuIcon color="primary" fontSize="inherit" />
        </IconButton>
      </div>
    </header>
  );
}
