import { Router, json } from "express";
import {ProductsController} from "../Controllers/ProductsController"

export const ProductRouter: Router = Router();

ProductRouter.use(json()) // Allow to look into the body of request

ProductRouter.get("/",  ProductsController.list);

ProductRouter.post("/add",  ProductsController.insert);

ProductRouter.delete("/:_id",  ProductsController.delete);

ProductRouter.put("/:_id",  ProductsController.update);
ProductRouter.patch("/:_id",  ProductsController.update);

ProductRouter.get("/:_id",  ProductsController.findById);
