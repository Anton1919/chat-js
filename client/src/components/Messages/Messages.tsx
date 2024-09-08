import styles from './Messages.module.css';
import { observer } from 'mobx-react-lite';
import { IMessages } from '@/shared/types/types.ts';

export const Messages = observer(({ messages, name }: IMessages) => {
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
});
