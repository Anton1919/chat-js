import styles from './Messages.module.css';

export const Messages = () => {
  return (
    <div className={styles.messages}>
      {[].map(({ user, message }, i) => {
        // const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        // const className = itsMe ? styles.me : styles.user;

        return (
          <div key={i} className={`${styles.message} ${''}`}>
            <span className={styles.user}>{'user.name'}</span>

            <div className={styles.text}>{message}</div>
          </div>
        );
      })}
    </div>
  );
};
