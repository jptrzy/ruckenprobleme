import { ObjectId } from "mongodb";
import * as t from "io-ts";

export const TProduct = t.type({
    name: t.string,
    description: t.string,
    price: t.number,
    rating: t.number,
    stock: t.number,
})

export class Product {
    _id?: ObjectId;
    name: string = "";
    description: string = "";
    price: number = 0;
    rating: number = 0;
    stock: number = 0;
}

export interface IProduct extends Product { };
