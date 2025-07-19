const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
if(!uri){
  throw new Error("Critical Initialization Error: MONGODB_URI environment variable is not set. Cannot connect to database.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function connectDB(){

  try{
    await client.connect();
    console.log(" Successfully Connected to MongoDB");
    return client.db('urlshortener');

  }
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
module.exports = connectDB;