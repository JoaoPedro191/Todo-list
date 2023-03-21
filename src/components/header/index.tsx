import styles from "../header/header.module.css";
import logoTodo from "../../assets/Logo.svg";
console.log(styles);

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logoTodo} alt="" />
    </header>
  );
};

export { Header };
