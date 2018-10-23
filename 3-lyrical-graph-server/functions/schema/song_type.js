module.exports = (cloudStore, LyricType) => {
  const graphql = require("graphql");
  const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
  const LyricResolver = require("./resolver/lyric-resolver")(cloudStore);

  return new GraphQLObjectType({
    name: "SongType",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      lyrics: {
        type: new GraphQLList(LyricType),
        resolve(parentValue) {
          return LyricResolver.getLyrics(parentValue.id);
        }
      }
    })
  });
};
