import axios from "axios";
import { createWriteStream } from "fs";

/**
 * Downloads the repository from the specified URL and saves it as "repoTemplate.zip".
 * @returns {Promise<void>} A promise that resolves when the download is complete.
 */
async function downloadRepo(): Promise<void> {
    const repoUrl =
        "https://github.com/kriptonian1/create-express-app-templates/archive/refs/heads/main.zip";
    await axios
        .get(repoUrl, { responseType: "stream" })
        .then(async (res: any) => {
            // res.data.pipe(createWriteStream("repoTemplate.zip"));
            return await new Promise((resolve, reject) => {
                const stream = createWriteStream("repoTemplate.zip");
                res.data.pipe(stream);
                stream.on("finish", resolve);
                stream.on("error", reject);
            });
        })
        .catch((err: any) => {
            console.error(err);
        });
}

export default downloadRepo;
