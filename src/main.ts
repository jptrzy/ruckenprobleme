import express, { Express, Request, Response } from "express";
import * as fs from "fs";
import { productRouter } from "./Routers/ProductRouter";
import { Logger } from "tslog";
import * as ProductsController from "./Controllers/ProductsController";

const logger = new Logger();
export const app: Express = express();
// const port = process.env.PORT;
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  // TODO Automatically detect server ip
  const href = `http://localhost:${port}`;

  const html = fs
    .readFileSync("src/index.html")
    .toString()
    .split("${href}")
    .join(href);

  logger.info(`User asked for Docs`);

  res.set("Content-Type", "text/html");
  res.send(Buffer.from(html));
});

app.use("/products", productRouter);

var server = app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  logger.info(`Connecting to ${process.env.DB_CONN_STRING!}`);
});

// server.close((err) => {
//   ProductsController.client.close();

//   process.exit(err ? 1 : 0)
// })