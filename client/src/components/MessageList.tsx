import React from 'react';
import styles from './MessageList.module.scss';
import { Message } from './Message';
interface MessageListProps {
    data: { messages: Message[] };
    handleUpdate: (id: string) => void;
    handleDelete: (id: string) => void;
  }
const MessageList: React.FC<MessageListProps> = ({ handleUpdate, handleDelete, data }) => (
  <ul className={styles.messageList}>
    {data?.messages.map((message: any) => (
      <li key={message.id}>
        {message.content}
        <div className='button-wrapper'>
          <button onClick={() => handleUpdate(message.id)}>Update</button>
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

export default MessageList;
