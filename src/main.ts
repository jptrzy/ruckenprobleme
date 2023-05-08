import express, { Express, Request, Response } from 'express';
import * as mongoDB from "mongodb";

const app: Express = express();
const port = process.env.PORT;

const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
let db: mongoDB.Db;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server + Docker');
});

app.get('/products', async (req: Request, res: Response) => {
    let products = await db.collection("products").find({}).toArray();

    console.log("test");

    res.send({products: products});
});

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    console.log(`⚡️[server]: Connecting to ${process.env.DB_CONN_STRING!}`)

    await client.connect();

    db = client.db("Shop")

    if (await db.collection("products").countDocuments({}) == 0) {
        console.log(`⚡️[server]: No items were found in products collection`)
        console.log(`⚡️[server]: Adding default items to products collection`)

        await db.collection("products").insertMany([
            {"name":"Necronomicon","description":"Big amount of unwonted content for anyone saine in the smallest possible package.","price":99.99,"rating":4.55,"stock":0},
            {"name":"Bible","description":"God's Stories...","price":23.42,"rating":5,"stock":777},
            {"name":"Samuel's tears","description":"This small jar of tears is a perfect gift for anyone who is a fan of the original Bible Stories.","price":233.22,"rating":2.33,"stock":3}
        ]);
    }
});