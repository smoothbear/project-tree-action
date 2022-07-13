import * as core from "@actions/core";
import * as fs from "fs";
import * as github from "@actions/github";
import { exec } from "child_process";
import simpleGit from "simple-git";

const baseDir = ".";
const git = simpleGit(baseDir);

export async function run() {
    const title = core.getInput("title", { required: true });
    const path = `${process.env.GITHUB_WORKSPACE ? process.env.GITHUB_WORKSPACE : "."}/${core.getInput("path", { required: true })}`;
    const message = core.getInput("message", { required: true });
    const email = core.getInput("email", { required: true });
    const username = core.getInput("username", { required: true });
    const token = core.getInput("token", { required: true });
    const repo = github.context.repo;
    const repoUrl = `github.com/${repo.owner}/${repo.repo}`;

    const remote = `https://${username}:${token}@${repoUrl}`;

    core.info(path);

    exec("tree -I .git", async (error, stdout, stderr) => {
        if (error) {
            core.error(`error: exec ${error.message}`);
            return;
        }
        if (stderr) {
            core.error(`stderr: stderr ${stderr}`);
            return;
        }

        core.info(stdout);

        fs.readFile(path, "utf-8", (err, contents) => {
            if (err) {
                core.error(`error: readfile ${err}`);
                return;
            }

            stdout = title + "\n" + "```" + stdout + "```";
            const replacedRegex = "(\n```((.|\n)*)```)?"
            const replaced = contents.replace(
                RegExp(title + replacedRegex),
                stdout
            );
            core.info(`replaced content: ${replaced}`);

            fs.writeFile(path, replaced, "utf-8", err => {
                if (err != null) {
                    core.error(`error: writefile ${err}`);
                }
            });
        });

        await git
            .addConfig("user.email", email)
            .addConfig("user.name", username);

        await git.add(path);
        await git.commit(message);
        await git.push(remote);
    });
}

run();
