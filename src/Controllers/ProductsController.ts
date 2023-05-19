import {
  MongoClient,
  Db,
  ObjectId,
  Filter,
  Document,
  DeleteResult,
} from "mongodb";
import { Product, IProduct } from "../Data/Product";
import {
  withHandleError,
  Controller,
} from "../Controllers/ControllerErrorHandler";
import { NextFunction, Request, Response } from "express";
import { isOfClass, isPartiallyOfClass } from "../Utils/ObjectParser";

export let client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);
let db: Db;

async function getDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db("shop");
  }

  return db;
}

export let ProductsController: Controller = withHandleError({
  list: async (req: Request, res: Response, next: NextFunction) => {
    const query: Filter<Document> = {
      name: { $regex: req.query.q || "", $options: "i" },
    };

    const products: Product[] = await (await getDB())
      .collection<Product>("products")
      .find(query)
      .toArray();

    res.status(200).send({ products: products });
  },

  findById: async (req: Request, res: Response, next: NextFunction) => {
    const product: Product | null = await (await getDB())
      .collection<Product>("products")
      .findOne({ _id: new ObjectId(req.params._id) });

    if (!product)
      throw new Error(`Product by Id(req.params._id) was not found`);

    res.status(200).send(product);
  },

  insert: async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;
    product._id = undefined;

    if (!isOfClass(Product, product))
      throw new Error(`User send incorrect data for product creation`);

    const result = await (await getDB()).collection<Product>("products").insertOne(product);

    res.status(201).send({ message: `Product successfully inserted with id ${result.insertedId}` });
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;

    if (!isPartiallyOfClass(Product, product))
      throw new Error(`User send incorrect data for product update`);

    product._id = new ObjectId(req.params._id);

    (await getDB())
      .collection<Product>("products")
      .updateOne({ _id: new ObjectId(req.params._id) }, { $set: product });

    res.status(201).send({ message: "Product successfully updated" });
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const result: DeleteResult = await (await getDB())
      .collection<Product>("products")
      .deleteOne({ _id: new ObjectId(req.params._id) });

    if (result.deletedCount == 0)
      throw new Error(`Product by Id(req.params._id) was not found`);

    res.status(200).send({ message: "Product successfully deleted" });
  },
});
