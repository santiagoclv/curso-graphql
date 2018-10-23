module.exports = conf => {
  const admin = require("firebase-admin");

  admin.initializeApp(conf);
  const cloudStore = admin.firestore();
  const settings = { timestampsInSnapshots: true };
  cloudStore.settings(settings);
  return cloudStore;
};
