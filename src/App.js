import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { StoreContext, DispatchContext } from './contexts';
import Home from './containers/Home';
import reducer, {initialState} from './contexts/reducer';




export const GRAPHQL_ENDPOINT = `https://stepx-purchase-order.herokuapp.com/v1/graphql`;
export const WEBSOCKET_ENDPOINT = `ws://stepx-purchase-order.herokuapp.com/v1/graphql`;

// Create an http link:
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri:  WEBSOCKET_ENDPOINT,
  options: {
    reconnect: true,
    // connectionParams: {
    //   origin: '*'
    // }
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const cache = new InMemoryCache();
// Instantiate client
const client = new ApolloClient({
  cache: cache,
  link: link,
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})


function App() {


const [state, dispatch] = React.useReducer(
  reducer,
  initialState
);

  return (
    <ApolloProvider client={client}>
      <DispatchContext.Provider value={dispatch}>
        <StoreContext.Provider  value={state}>
          <Home />
        </StoreContext.Provider>
      </DispatchContext.Provider>
    </ApolloProvider>
  );
}

export default App;
