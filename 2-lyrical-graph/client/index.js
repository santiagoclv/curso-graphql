import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import SongList from '../client/components/SongList';

const clientStore = new ApolloClient({});

const Root = () => {
  return (<ApolloProvider client={clientStore}>
            <SongList />
          </ApolloProvider>)
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
