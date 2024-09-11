import { screen, render, fireEvent } from '@testing-library/react';
import { Chat } from './Chat.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('Chat Component', () => {
  it('should render the title (room name)', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>,
    );

    const titleElement = screen.getByText(/users in this room/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the "Left the room" button', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>,
    );

    const buttonElement = screen.getByText(/Left the room/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should toggle emoji picker on icon click', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>,
    );

    const emojiIcon = screen.getByAltText(/icon/i);
    fireEvent.click(emojiIcon);

    const emojiPicker = screen.getByTestId('emoji-picker');
    expect(emojiPicker).toBeInTheDocument();
  });

  it('should allow user to type a message and submit', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>,
    );

    const inputElement = screen.getByPlaceholderText(/What do you want to say?/i);
    const submitButton = screen.getByTestId('send-message');

    fireEvent.change(inputElement, { target: { value: 'Hello!' } });
    fireEvent.click(submitButton);

    expect(inputElement).toHaveValue('');
  });
});
