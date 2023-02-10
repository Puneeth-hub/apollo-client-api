import React from 'react';
import ReactDOM from 'react-dom/client';
import { split } from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import './index.css';
import App from './App';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

import { BrowserRouter } from 'react-router-dom';

const wsLink = new WebSocketLink({
  uri:`ws://localhost:4000/graphql`,
  options:{
    reconnect: true,
    connectionParams:{
      authToken:localStorage.getItem(AUTH_TOKEN)
    }
  }
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const link = split(
  ({query})=> {
    const {kind, operation} = getMainDefinition(query);
    return(
      kind === 'OperationDefination' && 
      operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
);





const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);



