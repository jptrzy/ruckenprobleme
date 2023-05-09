import { MongoClient, Db, ObjectId, Filter, Document } from "mongodb";
import { Product, TProduct } from "../Data/Product";
import { withHandleError, Controller } from "../Controllers/ControllerErrorHandler";
import { PreProcessedFileInfo } from "typescript";
import { NextFunction, Request, Response} from "express";
import { isLeft } from "fp-ts/lib/Either";

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
    let product: any;

    const decode = TProduct.decode(req.body);
    
    if (isLeft(decode)) throw new Error(`Creation of new product was stopped - incorrect data`);

    let _product: Product = decode.right

    // Remove unused variables
    product = new Product();
    Object.keys(product).forEach((key: string, value: any) => {
        product[key as keyof Product] = _product[key as keyof Product];
    });;

    (await getDB()).collection<Product>("products").insertOne(product)

    res.status(201).send({ message: "Product successfully inserted" });
  }
});