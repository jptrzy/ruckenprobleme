import express, { Express, Request, Response } from "express";
import * as fs from "fs";
import { ProductRouter } from "./Routers/ProductRouter";
import { Logger } from "tslog";

const logger = new Logger();
const app: Express = express();
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

app.use("/products", ProductRouter);

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  logger.info(`Connecting to ${process.env.DB_CONN_STRING!}`);
});
