import * as core from "@actions/core";
import * as fs from "fs";
import { exec } from "child_process";
import simpleGit from "simple-git";

const baseDir = ".";
const git = simpleGit(baseDir);

export async function run() {
    const regex = core.getInput("regex", { required: true });
    const path = core.getInput("path", { required: true });
    const message = core.getInput("message", { required: true });
    const email = core.getInput("email", { required: true });
    const username = core.getInput("username", { required: true });

    exec("tree -a", (error, stdout, stderr) => {
        if (error) {
            core.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            core.error(`stderr: ${stderr}`);
            return;
        }

        fs.readFile(path, "utf-8", (err, contents) => {
            if (err) {
                core.error(`error: ${err}`);
                return;
            }

            const replaced = contents.replace(RegExp(regex), stdout);

            fs.writeFile(path, replaced, "utf-8", (err) =>
                core.error(`error: ${err}`)
            );
        });

        git.addConfig("user.email", email).addConfig("user.name", username);

        git.add(path);
        git.commit(message);
        git.push();
    });
}

run();