import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import MessageEditeModal from '../../components/modal/MessageEditeModal';
import { useMessages } from '../../hooks/useMessages';
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

  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState('');

  

  const handleUpdate = (id: string) => {
    const messageObj = data?.messages.find((msg: any) => msg.id === id);
    if (messageObj) {
      setCurrentMessageId(id);
      setModalContent(messageObj.content);
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = (newContent: string) => {
    if (currentMessageId) {
      handleUpdateMessage(currentMessageId, newContent);
      setIsModalOpen(false); // Close the modal after submission
      setErrorMessage(''); // Clear the error message
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className={styles.container}>
      <MessageList handleUpdate={handleUpdate} handleDelete={handleDeleteMessage} data={data} />
      <MessageInput
        content={content}
        setContent={setContent}
        handleAddMessage={() => handleAddMessage(content)}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <MessageEditeModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Messages;
