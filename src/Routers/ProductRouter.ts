import { Router } from "express";
import * as ProductsController from "../Controllers/ProductsController"
import { ObjectId } from "mongodb";
import { Logger } from "tslog";

const logger = new Logger();

export const ProductRouter: Router = Router();

ProductRouter.get("/", async (req, res) => {
    const products = await ProductsController.find();

    // TODO Simplify loggers
    logger.info(`User asked for products`);
    
    res.set("Content-Type", "application/json");
    res.send(products ? { products: products } : { error: "Not found" });
});
  
ProductRouter.get("/:_id", async (req, res) => {
    let product;
  
    logger.info(`User asked for product with _ObjectId(${req.params._id})`);

    try {
        product = await ProductsController.find({ _id: new ObjectId(req.params._id) });
        product = product[0];

        res.send(product);
    } catch {
        res.json({ error: "Not found" });
    }  
});