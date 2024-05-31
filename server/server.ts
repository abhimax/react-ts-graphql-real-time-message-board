import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import express from 'express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
import cors from 'cors';

const typeDefs = `
  type Message {
    id: ID!
    content: String!
  }

  type Query {
    messages: [Message!]
    message(id: ID!): Message
  }

  type Mutation {
    addMessage(content: String!): Message
    updateMessage(id: ID!, content: String!): Message
    deleteMessage(id: ID!): Message
  }

  type Subscription {
    messageAdded: Message
    messageUpdated: Message
    messageDeleted: Message
  }
`;

const messages: Array<{ id: string, content: string }> = [];
const pubsub = new PubSub();

const resolvers = {
  Query: {
    messages: (parent: any, args: any, context: any, info: any) => messages,
    message: (parent: any, { id }: { id: string }, context: any, info: any) => messages.find(message => message.id === id),
  },
  Mutation: {
    addMessage: (parent: any, { content }: { content: string }, context: any, info: any) => {
      const message = { id: `${messages.length + 1}`, content };
      messages.push(message);
      pubsub.publish('MESSAGE_ADDED', { messageAdded: message });
      return message;
    },
    updateMessage: (parent: any, { id, content }: { id: string, content: string }, context: any, info: any) => {
      const message = messages.find(message => message.id === id);
      if (!message) throw new Error('Message not found');
      message.content = content;
      pubsub.publish('MESSAGE_UPDATED', { messageUpdated: message });
      return message;
    },
    deleteMessage: (parent: any, { id }: { id: string }, context: any, info: any) => {
      const index = messages.findIndex(message => message.id === id);
      if (index === -1) throw new Error('Message not found');
      const [message] = messages.splice(index, 1);
      pubsub.publish('MESSAGE_DELETED', { messageDeleted: message });
      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
    },
    messageUpdated: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_UPDATED']),
    },
    messageDeleted: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_DELETED']),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    onConnect: () => console.log('Connected to websocket'),
  },
  wsServer
);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

server.start().then(() => {
  app.use(cors()); // Add this line
  app.use(bodyParser.json());
  app.use('/graphql', expressMiddleware(server));
  httpServer.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
});
