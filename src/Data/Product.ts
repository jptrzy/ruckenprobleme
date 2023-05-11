import { ObjectId } from "mongodb";

export class Product {
  _id?: ObjectId;
  name: string = "";
  description: string = "";
  price: number = 0;
  rating: number = 0;
  stock: number = 0;
}

export interface IProduct extends Product {}
