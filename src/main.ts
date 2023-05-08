import express, { Express, Request, Response } from "express";
import * as mongoDB from "mongodb";
import * as fs from "fs";

const app: Express = express();
const port = process.env.PORT;

const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  process.env.DB_CONN_STRING!
);
let db: mongoDB.Db;

app.get("/", (req: Request, res: Response) => {
  // TODO Automatically detect server ip
  const href = `http://localhost:${port}`;

  const html = fs
    .readFileSync("src/index.html")
    .toString()
    .split("${href}")
    .join(href);

  console.log(`🔎 [server]: User asked for Docs`);

  res.set("Content-Type", "text/html");
  res.send(Buffer.from(html));
});

app.get("/products", async (req: Request, res: Response) => {
  const products = await db.collection("products").find({}).toArray();

  console.log(`🔎 [server]: User asked for products`);

  res.set("Content-Type", "application/json");
  res.send(products ? { products: products } : { error: "Not found" });
});

app.get("/products/:_id", async (req: Request, res: Response) => {
  let product;

  try {
    product = await db
      .collection("products")
      .find({ _id: new mongoDB.ObjectId(req.params._id) })
      .toArray();
    product = product[0];
  } catch {
    res.json({ error: "Not found" });
  }

  console.log(
    `🔎 [server]: User asked for product with _ObjectId(${req.params._id})`
  );

  res.send(product);
});

app.listen(port, async () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
  console.log(`⚡️ [server]: Connecting to ${process.env.DB_CONN_STRING!}`);

  await client.connect();

  db = client.db("Shop");

  if ((await db.collection("products").countDocuments({})) == 0) {
    console.log(`🪙 [server]: No items were found in products collection`);
    console.log(`🪙 [server]: Adding default items to products collection`);

    await db.collection("products").insertMany([
      {
        name: "Necronomicon",
        description:
          "Big amount of unwonted content for anyone sane in the smallest possible package.",
        price: 99.99,
        rating: 4.55,
        stock: 0,
      },
      {
        name: "Bible",
        description: "God's Stories...",
        price: 23.42,
        rating: 5,
        stock: 777,
      },
      {
        name: "Samuel's tears",
        description:
          "This small jar of tears is a perfect gift for anyone who is a fan of the original Bible Stories.",
        price: 233.22,
        rating: 2.33,
        stock: 3,
      },
    ]);
  }
});
