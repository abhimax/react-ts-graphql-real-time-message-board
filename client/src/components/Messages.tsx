import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessages';
import styles from './Messages.module.scss';

const Messages: React.FC = () => {
  const {
    data,
    loading,
    error,
    errorMessage,
    handleAddMessage,
    handleUpdateMessage,
    handleDeleteMessage,
    setErrorMessage,
  } = useMessages();
  console.log('Messages component data:', data);

  const [content, setContent] = useState('');

  const handleUpdate = (id: string) => {
    const messageObj = data?.messages.find((msg: any) => msg.id === id);
    if (messageObj) {
      const newContent = prompt('Enter new content:', `${messageObj.content}`);
      if (newContent) {
        handleUpdateMessage(id, newContent);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className={styles.container}>
      <MessageList handleUpdate={handleUpdate} handleDelete={handleDeleteMessage} data={data}/>
      <MessageInput
        content={content}
        setContent={setContent}
        handleAddMessage={handleAddMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default Messages;
