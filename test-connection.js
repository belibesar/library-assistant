// Test MongoDB connection
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://asaefuddin:mongodb@cluster0.bn9vaja.mongodb.net/library-usd?retryWrites=true&w=majority&appName=Cluster0&ssl=true";

async function testConnection() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas");
        
        const db = client.db("library-usd");
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections);
        
        await client.close();
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

testConnection();
