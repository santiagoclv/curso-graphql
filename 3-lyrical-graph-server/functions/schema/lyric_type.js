module.exports = () => {
  const graphql = require("graphql");
  const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;

  return new GraphQLObjectType({
    name: "LyricType",
    fields: () => ({
      id: { type: GraphQLID },
      likes: { type: GraphQLInt },
      content: { type: GraphQLString }
    })
  });
};
