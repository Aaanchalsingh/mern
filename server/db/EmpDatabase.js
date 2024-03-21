import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
const uri="mongodb+srv://Aanchal:Aanchal123@bunch.js15mci.mongodb.net/employees?retryWrites=true&w=majority";
const client=new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to Employee Database");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

connectToMongoDB();

let db=client.db("employees");

export default db;
