import styles from './Chat.module.css';
import { Messages } from '@/components/Messages/Messages.tsx';

export const Chat = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{'Hey'}</div>
        <div className={styles.users}>{'users'} users in this room</div>
        <button className={styles.left} onClick={() => {}}>
          Left the room
        </button>
      </div>

      <div className={styles.messages}>{<Messages />}</div>

      <form className={styles.form} onSubmit={() => {}}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="What do you want to say?"
            value={''}
            onChange={() => {}}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={''} alt="icon" onClick={() => {}} />

          {/*{isOpen && (*/}
          {/*  <div className={styles.emojies}>*/}
          {/*    <EmojiPicker onEmojiClick={onEmojiClick} />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={() => {}} value="Send a message" />
        </div>
      </form>
    </div>
  );
};
