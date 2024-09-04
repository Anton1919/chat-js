import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Messages } from '@/components/Messages/Messages.tsx';
import { webSocketStore } from '@/app/store/websoket.store.ts';
import styles from './Chat.module.css';
import { observer } from 'mobx-react-lite';

export const Chat = observer(() => {
  const [text, setText] = useState('');

  useEffect(() => {
    webSocketStore.connect();

    return () => {
      webSocketStore.disconnect();
    };
  }, []);

  const onChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setText(value);
  };

  const handleClick = () => {
    webSocketStore.disconnect();
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      webSocketStore.sendMessage(text);
      setText('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.title}>{'Hey'}</div>
          <div className={styles.users}>{'users'} users in this room</div>
          <button className={styles.left} onClick={handleClick}>
            Left the room
          </button>
        </div>

        <div className={styles.messages}>{<Messages />}</div>

        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.input}>
            <input
              type="text"
              name="message"
              placeholder="What do you want to say?"
              value={text}
              onChange={onChangeHandler}
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
            <input type="submit" value="Send a message" />
          </div>
        </form>
      </div>
    </div>
  );
});
