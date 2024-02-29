#!/usr/bin/env node

import { intro, note, outro, spinner, text } from "@clack/prompts";
import color from "picocolors";

import downloadRepo from "@/utils/downloadRepo";
import generateFile from "@/utils/generateFile";

void (async () => {
    console.log();
    const s = spinner();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    intro(color.inverse(" create-express-app "));

    let name: string | symbol = "myExpressApp";

    name = await text({
        message: "What would you like to you project ?",
        placeholder: "myExpressApp",
    }) as string;

    s.start("Downloading the template...");
    await downloadRepo();
    generateFile(name.toString());
    s.stop();

    const nextSteps = `cd ${name}        \nnpm install\nnpm dev`;

	note(nextSteps, 'Next steps.');

    outro(`Problems? ${color.underline(color.cyan('https://github.com/kriptonian1/create-express-app/issues'))}`);
})();
