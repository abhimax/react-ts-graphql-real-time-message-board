import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  GET_MESSAGES,
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  MESSAGE_ADDED,
  MESSAGE_UPDATED,
  MESSAGE_DELETED,
} from '../graphql/operations';

export const useMessages = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    fetchPolicy: 'cache-and-network',
  });

  const [addMessage] = useMutation(ADD_MESSAGE, {
    onCompleted: () => {
      toast.success('Message added successfully!');
    },
  });

  const [updateMessage] = useMutation(UPDATE_MESSAGE, {
    onCompleted: () => {
      toast.success('Message updated successfully!');
    },
  });

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onCompleted: () => {
      toast.success('Message deleted successfully!');
    },
  });


  useSubscription(MESSAGE_ADDED, {
    onData: ({ client, data: subscriptionData }) => {
      console.log('MESSAGE_ADDED:', subscriptionData.data);
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
    onData: ({ client, data: subscriptionData }) => {
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
    onData: ({ client, data: subscriptionData }) => {
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

  const handleAddMessage = (content) => {
    console.log('content', content);
    if (!content.trim()) {
      setErrorMessage('Message cannot be empty. Please enter your message.');
      return;
    }
    addMessage({ variables: { content } });
    setErrorMessage('');
  };

  const handleUpdateMessage = (id, newContent) => {
    updateMessage({ variables: { id, content: newContent } });
  };

  const handleDeleteMessage = (id) => {
    deleteMessage({ variables: { id } });
  };

  return {
    data,
    loading,
    error,
    errorMessage,
    handleAddMessage,
    handleUpdateMessage,
    handleDeleteMessage,
    setErrorMessage,
  };
};
