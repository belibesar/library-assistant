import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env");
}

// Konfigurasi untuk MongoDB Cloud dengan timeout
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxIdleTimeMS: 30000,
  family: 4,
  hints: 0,
  directConnection: false,
  ssl: true,
  tlsInsecure: false,
});

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      console.log("Attempting to connect to MongoDB Cloud...");
      await client.connect();
      isConnected = true;
      console.log("Connected to MongoDB Cloud successfully");

      // Test the connection
      await client.db("admin").command({ ping: 1 });
      console.log("MongoDB Cloud connection verified");
    } catch (error) {
      console.error("MongoDB Cloud connection error:", error);
      isConnected = false;

      if (error instanceof Error) {
        if (
          error.message.includes("ENOTFOUND") ||
          error.message.includes("ETIMEOUT")
        ) {
          throw new Error(
            "Cannot connect to MongoDB Atlas. Please check your internet connection and MongoDB URI. Try using a VPN or different network.",
          );
        }
        if (error.message.includes("authentication failed")) {
          throw new Error(
            "MongoDB authentication failed. Please check your username and password.",
          );
        }
        if (error.message.includes("queryTxt")) {
          throw new Error(
            "DNS resolution failed for MongoDB Atlas. Please try again or check your network connection.",
          );
        }
      }

      throw error;
    }
  }

  // Extract database name from URI or use default
  let dbName = "librarydb";
  try {
    const url = new URL(uri.replace("mongodb+srv://", "https://"));
    const pathSegments = url.pathname.split("/");
    if (pathSegments.length > 1 && pathSegments[1]) {
      dbName = pathSegments[1];
    }
  } catch (error) {
    console.log("Using default database name:", dbName);
  }

  return client.db(dbName);
};

export default connectToDatabase;
