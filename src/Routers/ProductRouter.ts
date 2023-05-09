import { Router, json } from "express";
import {ProductsController} from "../Controllers/ProductsController"

export const ProductRouter: Router = Router();

ProductRouter.use(json()) // Allow to look into the body of request

ProductRouter.get("/",  ProductsController.list);

ProductRouter.post("/insert",  ProductsController.insert);

ProductRouter.get("/:_id",  ProductsController.findById);