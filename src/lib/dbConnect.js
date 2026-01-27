// src/lib/dbConnect.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.NEXT_MONGO_URI;
const dbName = process.env.NEXT_MONGO_NAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = async (collectionName) => {
  try {
    await client.connect(); // কানেকশন নিশ্চিত করা
    const db = client.db(dbName);
    return db.collection(collectionName);
  } catch (e) {
    console.log("DB Connection Error:", e);
  }
};
