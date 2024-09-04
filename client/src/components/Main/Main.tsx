import styles from './Main.module.css';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const FIELDS = {
  NAME: 'name',
  ROOM: 'room',
};

export const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValue] = useState({ [NAME]: '', [ROOM]: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValue({ ...values, [name]: value });
  };

  const handleClick = (e: MouseEvent) => {
    const data = Object.values(values);
    const isDisabled = data.some((v) => !v);

    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Join</h1>

          <form className={styles.form}>
            <div className={styles.group}>
              <input
                type="text"
                name="name"
                value={values[NAME]}
                placeholder="Username"
                className={styles.input}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
            <div className={styles.group}>
              <input
                type="text"
                name="room"
                placeholder="Room"
                value={values[ROOM]}
                className={styles.input}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <Link
              className={styles.group}
              onClick={handleClick}
              to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
            >
              <button type="submit" className={styles.button}>
                Sign In
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
