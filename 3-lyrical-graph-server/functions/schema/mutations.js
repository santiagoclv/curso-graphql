module.exports = (cloudStore, LyricType, SongType) => {
  const graphql = require("graphql");
  const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
  const LyricResolver = require("./resolver/lyric-resolver")(cloudStore);
  const SongResolver = require("./resolver/song-resolver")(cloudStore);

  return new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addSong: {
        type: SongType,
        args: {
          title: { type: GraphQLString }
        },
        resolve(parentValue, song) {
          return SongResolver.add(song);
        }
      },
      addLyricToSong: {
        type: SongType,
        args: {
          content: { type: GraphQLString },
          songId: { type: GraphQLID }
        },
        resolve(parentValue, { content, songId }) {
          return LyricResolver.add(songId, {content});
        }
      },
      likeLyric: {
        type: LyricType,
        args: { 
            id: { type: GraphQLID },
            songId: { type: GraphQLID },
            likes: { type: GraphQLInt }
        },
        resolve(parentValue, { songId, id, likes }) {
            // TODO: better like system
          return LyricResolver.update(songId, {id, likes});
        }
      },
      deleteSong: {
        type: SongType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }) {
          return SongResolver.remove(id);
        }
      }
    }
  });
};
