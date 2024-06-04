// src/Messages.tsx
import React, { useState } from 'react';
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import styles from './Messages.module.scss';

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation AddMessage($content: String!) {
    addMessage(content: $content) {
      id
      content
    }
  }
`;

const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($id: ID!, $content: String!) {
    updateMessage(id: $id, content: $content) {
      id
      content
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      id
    }
  }
`;

const MESSAGE_ADDED = gql`
  subscription OnMessageAdded {
    messageAdded {
      id
      content
    }
  }
`;

const MESSAGE_UPDATED = gql`
  subscription OnMessageUpdated {
    messageUpdated {
      id
      content
    }
  }
`;

const MESSAGE_DELETED = gql`
  subscription OnMessageDeleted {
    messageDeleted {
      id
    }
  }
`;

const Messages: React.FC = () => {
  const [content, setContent] = useState('');
  const { data, loading, error } = useQuery(GET_MESSAGES);

  const [addMessage] = useMutation(ADD_MESSAGE);
  const [updateMessage] = useMutation(UPDATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  useSubscription(MESSAGE_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.cache.modify({
        fields: {
          messages(existingMessages = []) {
            const newMessageRef = client.cache.writeFragment({
              data: subscriptionData.data.messageAdded,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  content
                }
              `,
            });
            return [...existingMessages, newMessageRef];
          },
        },
      });
    },
  });

  useSubscription(MESSAGE_UPDATED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.cache.modify({
        fields: {
          messages(existingMessages = []) {
            return existingMessages.map(message =>
              message.__ref === `Message:${subscriptionData.data.messageUpdated.id}`
                ? client.cache.writeFragment({
                    data: subscriptionData.data.messageUpdated,
                    fragment: gql`
                      fragment UpdatedMessage on Message {
                        id
                        content
                      }
                    `,
                  })
                : message
            );
          },
        },
      });
    },
  });

  useSubscription(MESSAGE_DELETED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.cache.modify({
        fields: {
          messages(existingMessages = []) {
            return existingMessages.filter(
              message => message.__ref !== `Message:${subscriptionData.data.messageDeleted.id}`
            );
          },
        },
      });
    },
  });

  const handleAddMessage = () => {
    addMessage({ variables: { content } });
    setContent('');
  };

  const handleUpdateMessage = (id: string) => {
    const newContent = prompt('Enter new content:', '');
    if (newContent) {
      updateMessage({ variables: { id, content: newContent } });
    }
  };

  const handleDeleteMessage = (id: string) => {
    deleteMessage({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
    <ul className={styles.messageList}>
      {data.messages.map((message: any) => (
        <li key={message.id}>
          {message.content}
          <div className='button-wrapper'>
            <button onClick={() => handleUpdateMessage(message.id)}>Update</button>
            <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
    <div className={styles.inputGroup}>
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleAddMessage}>Add Message</button>
    </div>
  </div>
  );
};

export default Messages;
