module.exports = (cloudStore, LyricType, SongType) => {
  const graphql = require("graphql");
  const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
  const LyricResolver = require("./resolver/lyric-resolver")(cloudStore);
  const SongResolver = require("./resolver/song-resolver")(cloudStore);

  return new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
      songs: {
        type: new GraphQLList(SongType),
        resolve() {
          return SongResolver.getSongs();
        }
      },
      song: {
        type: SongType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
          return SongResolver.getSong(id);
        }
      },
      lyric: {
        type: LyricType,
        args: { songId: { type: new GraphQLNonNull(GraphQLID) }, id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parnetValue, { songId, id }) {
          return LyricResolver.getLyric(songId, id);
        }
      },
      lyrics: {
        type: new GraphQLList(LyricType),
        args: { songId: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parnetValue, { songId }) {
          return LyricResolver.getLyrics(songId);
        }
      }
    })
  });
};
