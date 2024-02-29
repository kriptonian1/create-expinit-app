#!/usr/bin/env node

import AdmZip from "adm-zip";
import path from "path";
import downloadRepo from "@/utils/downloadRepo";

(async () => {
    console.log("hello");

    await downloadRepo();

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
                `./destination/${newEntryName}`
            );
        }
    });

    // zip.extractEntryTo(
    //     "create-express-app-templates-main/create-express-app-template-ts/",
    //     "./destination", // specify the destination directory here
    //     true, // maintain the folder structure
    //     true // overwrite files if they already exist
    // );
    // renameSync(
    //     `${path.resolve(process.cwd())}/create-express-app-template-ts`, // old path
    //     "myNewApp" // new path
    // );
})();
