import React from 'react';
import { ApolloProvider, client } from './apolloClient';
import Messages from './Messages';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>GraphQL Subscriptions with React</h1>
      <Messages />
    </div>
  </ApolloProvider>
);

export default App;
