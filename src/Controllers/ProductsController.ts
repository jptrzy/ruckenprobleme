import { MongoClient, Db, ObjectId, Filter, Document, DeleteResult } from "mongodb";
import { Product, IProduct } from "../Data/Product";
import { withHandleError, Controller } from "../Controllers/ControllerErrorHandler";
import { NextFunction, Request, Response} from "express";
import {isOfClass} from "../Utils/ObjectParser";


let client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);
let db: Db;

async function getDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db("Shop");
  }

  return db;
}

export let ProductsController: Controller = withHandleError({
  list: async (req: Request, res: Response, next: NextFunction) => {
    const query: Filter<Document> = {name: {'$regex': req.query.q || "", $options:'i'}};
    
    const products: Product[] = await (await getDB()).collection<Product>("products").find(query).toArray();

    res.send({ products: products });
  },

  findById: async (req: Request, res: Response, next: NextFunction) => {
    const product: Product | null = await (await getDB()).collection<Product>("products").findOne({ _id: new ObjectId(req.params._id) });

    if (!product) throw new Error(`Product by Id(req.params._id) was not found`);
    
    res.send(product);
  },

  insert: async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;
    product._id = undefined;

    console.log (`Body: ${JSON.stringify(product)}`)

    if (!isOfClass(Product, product)) throw new Error(`User send incorrect data for product creation`);

    (await getDB()).collection<Product>("products").insertOne(product)

    res.status(201).send({ message: "Product successfully inserted" });
  },
  
  update: async (req: Request, res: Response, next: NextFunction) => {

  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const result: DeleteResult = await (await getDB()).collection<Product>("products").deleteOne({ _id: new ObjectId(req.params._id) });

    if (result.deletedCount == 0) throw new Error(`Product by Id(req.params._id) was not found`);

    res.status(200).send({ message: "Product successfully deleted" });
  },
});