import { useState } from "react";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Couponus</h1>
      </header>
      <form>
        <div className={styles.username}>
          <label htmlFor="username">username</label>
          <input type="text" value={username} onChange={handleUserNameChange} />
        </div>
        <div className={styles.password}>
          <label htmlFor="password">password</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
