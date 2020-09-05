import * as Eris from "eris";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

const CONFIG_FILE = "config.json";

const config = (() => {
    let configPath = path.resolve(__dirname, "../", CONFIG_FILE);
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
                let blank = JSON.stringify({ token: "put token here" }, null, 4);
                fs.writeFileSync(configPath, blank, "utf8");
                console.log(`Config file doesn't exist, created at ${CONFIG_FILE}! Fill it in!`);
                process.exit(0);
            } else {
                console.error(`Failed to load config file:\n${ex}`);
                process.exit(1);
            }
        }
    }
})();

const hanyuu = new Eris.Client(config.token);

hanyuu.on("messageCreate", (message) => {
    // Ignore messages from bots + self.
    if (message.author.bot || message.author.id === hanyuu.user.id) return;

    try {
        if (message.content.startsWith(".")) {
            let args_start = message.content.indexOf(" ");
            let command = message.content.substring(1, args_start !== -1 ? args_start : undefined);

            switch (command) {
                case "ping":
                    message.channel
                        .createMessage("Timing...")
                        .then((ping) =>
                            ping.edit(`⏱️ Latency: \`${ping.timestamp - message.timestamp}ms\``),
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

hanyuu
    .connect()
    .then(() => console.log("Connected!"))
    .catch((err) => console.error(`Failed to connect: ${err}`));
