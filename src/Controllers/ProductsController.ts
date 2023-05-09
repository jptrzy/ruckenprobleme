import { MongoClient, Db, ObjectId, Filter, Document } from "mongodb";
import { Product } from "../Data/Product";
import { PreProcessedFileInfo } from "typescript";

let client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);
let db: Db;

async function getDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db("Shop");
  }

  return db;
}

// TODO Find simpler way to export multiple functions
export async function find(filter: Filter<Document> = {}): Promise<Product[]> {
  return (await (await getDB()).collection("products").find(filter).toArray()) as unknown as Product[];
}
