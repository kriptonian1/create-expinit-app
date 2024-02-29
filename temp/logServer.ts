import chalk from "chalk";
import type { Server } from "http";
import type { AddressInfo } from "net";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(path.resolve(process.cwd(), './package.json'));

/**
 * @description Logs the server information 
 * @param {Server} host - The server instance
 */
const logServer = (host: Server): void => {
    const serverAddress: AddressInfo = host.address() as AddressInfo;
    const hPort: number = serverAddress.port;
    const hAddress: string =
        serverAddress.address === "::" ? "localhost" : serverAddress.address;

    console.log(
        chalk.bgBlue.bold(
            ` Express.js v${packageJson.dependencies.express.replace("^", "")} `
        )
    );

    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()} ${String(
        date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
        date.getSeconds()
    ).padStart(2, "0")}`;

    console.log(
        `${formattedDate} [🚀]:`,
        chalk.green(`Server is running on http://${hAddress}:${hPort} \n`)
    );
};

export default logServer;
