import * as Eris from "eris";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

import { hanyuu as packageInfo } from "../package.json";

const config = (() => {
    let configPath = path.resolve(__dirname, "../", packageInfo.config);
    try {
        let config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        // maybe verify properties here
        return config;
    } catch (ex) {
        // JSON.parse only throws SyntaxError
        if (ex.name === "SyntaxError") {
            console.error(`Failed to parse config at ${configPath} (${ex})`);
            process.exit(1);
        } else {
            // No entry (file not found)
            if (ex.code === "ENOENT") {
                console.log("Config file doesn't exist! Creating one...");
                let data = { token: "put token here" };
                let blank = JSON.stringify(data, null, 4);
                fs.writeFileSync(configPath, blank, "utf8");
                console.log(`Created ${packageInfo.config}, go fill it in!`);
                process.exit(0);
            } else {
                console.error(`Failed to load config file:\n${ex}`);
                process.exit(1);
            }
        }
    }
})();

// ----------------------------------------------------------------------------

const Hanyuu = new Eris.Client(config.token);

Hanyuu.on("messageCreate", (message) => {
    // Ignore messages from bots + self.
    if (message.author.bot || message.author.id === Hanyuu.user.id) return;

    try {
        if (message.content.startsWith(".")) {
            let args_start = message.content.indexOf(" ");
            let command = message.content.substring(
                1,
                args_start !== -1 ? args_start : undefined,
            );

            switch (command) {
                case "ping":
                    message.channel
                        .createMessage("Timing...")
                        .then((ping) =>
                            ping.edit(
                                `⏱️ Latency: \`${
                                    ping.timestamp - message.timestamp
                                }ms\``,
                            ),
                        );
                    break;
                default:
                    break;
            }
        }
    } catch (error) {
        console.error(error);
    }
});

Hanyuu.connect()
    .then(() => console.log("Connected!"))
    .catch((err) => console.error(`Failed to connect: ${err}`));
