module.exports = cloudStore => {
  const graphql = require("graphql");
  const { GraphQLSchema } = graphql;

  const LyricType = require("./lyric_type")(cloudStore);
  const SongType = require("./song_type")(cloudStore, LyricType);

  const query = require("./root_query_type")(cloudStore, LyricType, SongType);
  const mutation = require("./mutations")(cloudStore, LyricType, SongType);

  return new GraphQLSchema({ query, mutation });
};
