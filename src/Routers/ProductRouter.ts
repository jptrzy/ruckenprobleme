import { Router, json } from "express";
import { ProductsController } from "../Controllers/ProductsController";

export const productRouter: Router = Router();

productRouter.use(json()); // Allow to look into the body of request

productRouter.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    
    next()
})

productRouter.get("/", ProductsController.list);

productRouter.post("/add", ProductsController.insert);

productRouter.delete("/:_id", ProductsController.delete);

productRouter.put("/:_id", ProductsController.update);
productRouter.patch("/:_id", ProductsController.update);

productRouter.get("/:_id", ProductsController.findById);
