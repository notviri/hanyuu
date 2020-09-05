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
