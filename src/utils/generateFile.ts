import { rm, unlink } from "fs";
import { copySync } from "fs-extra";
import AdmZip from "adm-zip";
import path from "path";

/**
 * Generates a file by extracting and copying files from a zip template.
 * @param name - The name of the file to be generated.
 */
function generateFile(name: string): void {
    const zip = new AdmZip(`${path.resolve(process.cwd())}/repoTemplate.zip`);

    const targetFolder =
        "create-express-app-templates-main/create-express-app-template-ts/";

    zip.getEntries().forEach((entry) => {
        if (entry.entryName.startsWith(targetFolder)) {
            const segments = entry.entryName.split("/");
            const newEntryName = segments.slice(2).join("/"); // Adjust the number based on your needs
            zip.extractEntryTo(
                entry.entryName,
                `./temp`, // specify the destination directory here
                false, // maintain the folder structure
                true, // overwrite files if they already exist
                false, // The file will be set as the permission from the entry if this is true
                `./${name}/${newEntryName}`
            );
        }
    });

    unlink(`${path.resolve(process.cwd())}/repoTemplate.zip`, (err) => {
        if (err != null) {
            console.error(err);
        }
    });

    try {
        copySync(
            `${path.resolve(process.cwd())}/temp/${name}`,
            `${path.resolve(process.cwd())}/${name}`
        );
    } catch (error) {
        console.error(error);
    }

    rm(`${path.resolve(process.cwd())}/temp`, { recursive: true }, (err) => {
        if (err != null) {
            console.error(err);
        }
    });
}

export default generateFile;
