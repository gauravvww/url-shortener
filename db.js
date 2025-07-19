const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
if(!uri){
  console.error("MONGODB_URI environment variable is not set.");
  process.exit(1);
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