import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import type { Server } from "http";
import logger from "@/utils/logger";
import logServer from "@/utils/logServer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require("morgan");

const app = express();
const port = process.env.PORT ?? 8080;

const stream = {
    write: (message: string) => logger.http(message),
};

app.use(morgan("tiny", { stream })); // Logging HTTP requests

app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
});

app.use("/", (req: Request, res: Response) =>
    res.status(404).json({ error: "not found" })
);

const host: Server = app.listen(port, () => {
    logServer(host);
});
