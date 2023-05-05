import express, { Express, Request, Response } from 'express';
import DatabaseConstructor, { Database } from 'better-sqlite3';

const app: Express = express();
const port = 80;

const db: Database = new DatabaseConstructor('db.sqlite');

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/products', (req: Request, res: Response) => {
    let products = db.prepare('SELECT * FROM products').all();

    console.log (`Products: ${products}`);
    console.log (products);

    res.send({products: products});
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});