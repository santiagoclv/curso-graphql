module.exports = cloudStore => {
  return {
    getLyrics(songId) {
      return cloudStore
        .collection("Songs")
        .doc(songId)
        .collection("Lyrics")
        .get()
        .then(snapshot => {
          let lyrics = [];
          snapshot.forEach(doc => {
            lyrics.push({ ...doc.data(), id: doc.id });
          });
          return lyrics;
        });
    },
    getLyric(songId, id) {
      return cloudStore
        .collection("Songs")
        .doc(songId)
        .collection("Lyrics")
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) {
            return { ...doc.data(), id: doc.id };
          } else {
            return null;
          }
        });
    },
    add(songId, lyric){
      return cloudStore.collection('Songs').doc(songId).collection('Lyrics').add(lyric).then(ref => {
        return ref.get().then((doc) =>{
          return {...doc.data(), id: doc.id};
        })
      });
    },
    update(songId, lyric){
      return cloudStore.collection('Songs').doc(songId).collection('Lyrics').doc(lyric.id).update(lyric).then(ref => {
        return ref.get().then((doc) =>{
          return {...doc.data(), id: doc.id};
        })
      });
    }
  };
};
