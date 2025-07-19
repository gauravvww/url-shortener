const { MongoClient, ServerApiVersion } = require('mongodb');



const uri = 'mongodb+srv://myUser:fibonacci8532@cluster0.or5vlat.mongodb.net/urlshortener?retryWrites=true&w=majority&appName=Cluster0'

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