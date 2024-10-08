import styles from './Messages.module.css';
import { IMessages } from '@/shared/types/types.ts';

export const Messages = ({ messages, name }: IMessages) => {
  return (
    <div className={styles.messages}>
      {messages?.map(({ user, message }, i) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? styles.me : styles.user;

        return (
          <div key={i} className={`${styles.message} ${className}`}>
            <span className={styles.user}>{user.name}</span>

            <div className={styles.text}>{message}</div>
          </div>
        );
      })}
    </div>
  );
};
