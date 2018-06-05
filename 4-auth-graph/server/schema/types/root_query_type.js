const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: { 
      type: UserType,
      resolve(parentValue, args, request) {
        let { user } = request;
        return !!user ? user : null;
      } 
    }
  })
});

module.exports = RootQueryType;
