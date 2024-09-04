import styles from './Messages.module.css';
import { observer } from 'mobx-react-lite';
import { webSocketStore } from '@/app/store/websoket.store.ts';
import { toJS } from 'mobx';

export const Messages = observer(() => {
  const message = webSocketStore.messages;

  console.log(toJS(message));

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
});
