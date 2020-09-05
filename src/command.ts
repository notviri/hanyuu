import * as Eris from "eris";

// TODO: Document what a "meta-argument" is!

/**
 * Wrapper for arguments passed to [[Command.execute]].
 */
export class Args {
    // @ts-ignore
    constructor(rawArgs: string, settings: ArgsFormat) {

    }
}

/**
 * Format for specifying the format of arguments passed to the command.
 *
 * Read the constructor for more information on its properties.
 */
export class ArgsFormat {
    min: number;
    max: number;
    meta: boolean;

    /**
     * 
     * @param min The minimum amount of input arguments.
     * @param max The maximum amount of input arguments.
     * @param parseMeta Whether to parse meta-arguments or not.
     * 
     * The minimum and maximum values should be handled as such:
     * - If the maximum is bigger than the minimum, the amount is variable in that range.
     * - If they're the same number, exactly that many arguments are wanted.
     * - If the maximum is `-1`, the upper bound is unknown.
     * - If both are `-1`, arguments should be passed unparsed.
     */
    constructor(min: number, max: number, parseMeta: boolean) {
        this.min = min;
        this.max = max;
        this.meta = parseMeta;
    }

    /**
     * Returns the bounds specified in the constructor.
     */
    bounds(): [number, number] {
        return [this.min, this.max];
    }

    /**
     * Returns whether meta-arguments should be parsed or not.
     */
    wantMeta(): boolean {
        return this.meta;
    }
}

export interface Command {
    /**
     * Returns the minimum and maximum amount of arguments wanted.
     * 
     * For more info, read [[ArgsWanted]].
     */
    argsFormat(): ArgsFormat;

    /**
     * Executes the command implementation.
     * @param name The command name as invoked. If a command alias was used, the alias is passed.
     * @param args The arguments passed to the command, if any.
     * @param client The bot instance that received this command.
     * @param message The command message handle.
     */
    execute(name: string, args: Args, client: Eris.Client, message: Eris.Message<Eris.TextableChannel>): void;
}
