module.exports = cloudStore => {
  return {
    getSongs() {
      return cloudStore
        .collection("Songs")
        .get()
        .then(snapshot => {
          let songs = [];
          snapshot.forEach(doc => {
            songs.push({ ...doc.data(), id: doc.id });
          });
          return songs;
        });
    },
    getSong(id) {
      return cloudStore
        .collection("Songs")
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
    add(song){
      return cloudStore.collection('Songs').add(song).then(ref => {
        return ref.get().then((doc) =>{
          return {...doc.data(), id: doc.id};
        })
      });
    },
    update(song){
      return cloudStore.collection('Songs').doc(song.id).update(song).then(ref => {
        return ref.get().then((doc) =>{
          return {...doc.data(), id: doc.id};
        })
      });
    },
    remove(id){
      return cloudStore.collection('Songs').doc(id).delete();
    }
  };
};
