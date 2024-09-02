import styles from './Main.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Main = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>

        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              value={value}
              placeholder="Username"
              className={styles.input}
              onChange={() => {}}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              placeholder="Room"
              value={value}
              className={styles.input}
              onChange={() => {}}
              autoComplete="off"
              required
            />
          </div>

          <Link className={styles.group} onClick={() => {}} to={'#'}>
            <button type="submit" className={styles.button}>
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
