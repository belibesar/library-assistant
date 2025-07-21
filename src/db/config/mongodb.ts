const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
let dbName = "library-usd";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect() {
  try {
    if (!uri) {
      console.log("Database URI is needed!");
      throw new Error("MongoDB URI is empty!");
    }
    console.log("connecting to database...");
    await client.connect();
    console.log("connected to database! ");
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function allCollections() {
  try {
    await connect();
    const database = await client.db(dbName);
    return database.listCollections().toArray();
  } catch (error) {
    console.log(error);
  }
}

export async function db(name: string) {
  try {
    await connect();
    return await client.db(dbName).collection(name);
  } catch (error) {
    console.log(error);
  }
}
