import React from 'react';
import { ApolloProvider, client } from './apolloClient';
import Messages from './Messages';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className='app-wrapper'>
      <h1>Real-Time Message Board</h1>
      <h2>GraphQL Subscriptions with React</h2>
      <Messages />
    </div>
  </ApolloProvider>
);

export default App;
