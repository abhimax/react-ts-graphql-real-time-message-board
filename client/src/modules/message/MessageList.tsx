import React from 'react';
import styles from './MessageList.module.scss';
import { Message } from './Message';
import Button from '../../components/Button/Button';
import Alert from '../../components/Alert/Alert';
interface MessageListProps {
    data: { messages: Message[] };
    handleUpdate: (id: string) => void;
    handleDelete: (id: string) => void;
  }
const MessageList: React.FC<MessageListProps> = ({ handleUpdate, handleDelete, data }) => (
  <ul className={styles.messageList}>
    { data.messages.length > 0 ?  data?.messages.map((message: any) => (
      <li key={message.id}>
        {message.content}
        <div className='button-wrapper'>
            <Button label="Delete" onClick={() => handleDelete(message.id)} skin='type2'size='small' hasNextSpace/>
            <Button label="Update" onClick={() => handleUpdate(message.id)} skin='type1' size='small'/>
        </div>
      </li>
    )) : <Alert message='Your Message Board is empry!' skin="info"/>}
  </ul>
);

export default MessageList;
