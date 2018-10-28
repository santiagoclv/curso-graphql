import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const client = new ApolloClient();

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <div className="container">
          <Route exact path="/" component={SongList} />
          <Route exact path="/song/new" component={SongCreate} />
          <Route exact path="/songs/:id" component={SongDetail} />
        </div>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
