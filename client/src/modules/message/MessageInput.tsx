import React from 'react';
import styles from './MessageInput.module.scss';
import Button from '../../components/Button/Button';
import Alert from '../../components/Alert/Alert';

const MessageInput: React.FC<{
  content: string,
  setContent: (content: string) => void,
  handleAddMessage: (content: string) => void,
  errorMessage: string,
  setErrorMessage: (message: string) => void
}> = ({ content, setContent, handleAddMessage, errorMessage, setErrorMessage }) => {
  const handleSubmit = () => {
    console.log(content)
    handleAddMessage(content);
    setContent('');
  };

  return (<>
    <div className={styles.inputGroup}>
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Button label='Add Message' onClick={handleSubmit} />
    </div>
    <div className={styles.inputGroup}>
      {errorMessage && (
        <Alert message={errorMessage} onClose={() => setErrorMessage('')} />
      )}
    </div>
  </>
  );
};

export default MessageInput;
