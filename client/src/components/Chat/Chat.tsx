import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Messages } from '@/components/Messages/Messages.tsx';
import iconSvg from '../../shared/emoji.svg';
import styles from './Chat.module.css';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { IChat, IParams } from '@/shared/types/types.ts';
import { socket } from '@/app/api/api.ts';
import EmojiPicker from 'emoji-picker-react';

export const Chat = observer(() => {
  const { search } = useLocation();
  const [message, setMessage] = useState('');
  const [state, setState] = useState<IChat[]>([]);
  const [params, setParams] = useState<IParams>({ name: '', room: '' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((prevState) => [...prevState, data]);
    });
  }, []);

  const onChangeHandler = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setMessage(value);
  };

  const handleClick = () => {
    // webSocketStore.disconnect();
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', { message, params });
      setMessage('');
      setIsOpen(false);
    }
  };

  const onEmojiClick = ({ emoji }: any) => setMessage(`${message} ${emoji}`);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.title}>{params?.room}</div>
          <div className={styles.users}>0 users in this room</div>
          <button className={styles.left} onClick={handleClick}>
            Left the room
          </button>
        </div>

        <div className={styles.messages}>
          <Messages messages={state} name={params.name} />
        </div>

        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.input}>
            <input
              type="text"
              name="message"
              placeholder="What do you want to say?"
              value={message}
              onChange={onChangeHandler}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.emoji}>
            <img src={iconSvg} alt="icon" onClick={() => setIsOpen(!isOpen)} />

            {isOpen && (
              <div className={styles.emojies}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          <div className={styles.button}>
            <input type="submit" value="Send a message" />
          </div>
        </form>
      </div>
    </div>
  );
});
