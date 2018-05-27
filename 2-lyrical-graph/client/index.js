import "./style/style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from '../client/App';
import SongList from '../client/components/SongList';
import SongCreate from '../client/components/SongCreate';

const clientStore = new ApolloClient({});

const Root = () => {
  return (<ApolloProvider client={clientStore}>
            <Router history={hashHistory} >
              <Route path="/" component={App} >
                <IndexRoute component={SongList} />
                <Route path="songs/new" component={SongCreate}  />
              </Route>
            </Router>
          </ApolloProvider>)
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
