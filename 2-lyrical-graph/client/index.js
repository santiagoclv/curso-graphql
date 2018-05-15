import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const clientStore = new ApolloClient({});

const Root = () => {
  return (<ApolloProvider client={clientStore}>
            <div>Lyrical</div>
          </ApolloProvider>)
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
