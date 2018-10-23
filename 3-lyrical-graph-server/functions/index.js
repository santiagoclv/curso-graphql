const functions = require("firebase-functions");
const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");

const Schema = require("./schema/schema");
const Firestore = require("./firestore");

const confFirebase = functions.config().firebase;

const cloudStore = Firestore(confFirebase);
const schema = Schema(cloudStore);

const server = express();

server.use((req, res, next) => {
  res.set('Cache-control','public, max-age=300, s-maxage=600');
  next();
});

server.use(bodyParser.json());
server.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

exports.server = functions.https.onRequest(server);
