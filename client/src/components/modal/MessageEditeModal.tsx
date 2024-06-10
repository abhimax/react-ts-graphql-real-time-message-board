import React, { useState, useEffect } from 'react';
import styles from './MessageEditeModal.module.scss';
import Button from '../Button/Button';

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  onSubmit: (newContent: string) => void;
}

const MessageEditeModal: React.FC<ModalProps> = ({ isOpen, content, onClose, onSubmit }) => {
  const [newContent, setNewContent] = useState(content);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    setNewContent(content);
  }, [content]);

  const handleSubmit = () => {
    if(newContent === ''){
        setModalError('Sorry, Message can not be empty!');
        return;
    }
    onSubmit(newContent);
    setModalError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        { modalError && <span>{modalError}</span>}
        <h2>Update Message</h2>
        <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        <div className={styles.actions}>
            <Button label='Cancel' skin="type2" onClick={onClose}/>
            <Button label='Update' skin="type1" onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default MessageEditeModal;
