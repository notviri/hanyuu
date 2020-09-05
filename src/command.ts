import * as Eris from "eris";

// TODO: Document what a "meta-argument" is!

/**
 * Wrapper for arguments passed to [[Command.execute]].
 */
export class Args {
    // @ts-ignore
    constructor(rawArgs: string, settings: ArgsFormat) {}
}

/**
 * Format for specifying the format of arguments passed to the command.
 *
 * Read the constructor for more information on its properties.
 */
export class ArgsFormat {
    private min: number;
    private max: number;
    private meta: boolean;

    /**
     *
     * @param min The minimum amount of input arguments.
     * @param max The maximum amount of input arguments.
     * @param parseMeta Whether to parse meta-arguments or not.
     *
     * The minimum and maximum values should be handled as such:
     * - If the max > min, the amount is variable in that range, obviously.
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
     * The bounds specified in the constructor.
     */
    get bounds(): [number, number] {
        return [this.min, this.max];
    }

    /**
     * Whether meta-arguments should be parsed or not.
     */
    get wantMeta(): boolean {
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
     * @param name The command name as invoked.
     *  This means that if a command alias was used, the alias is passed instead.
     * @param args The arguments passed to the command, if any.
     * @param client The bot instance that received this command.
     * @param message The command message handle.
     */
    execute(
        name: string,
        args: Args,
        client: Eris.Client,
        message: Eris.Message<Eris.TextableChannel>,
    ): void;

    /**
     * Returns usage examples with pairs of command to explanation,
     * or an empty array (obviously) if there's nothing to be explained.
     *
     * In the example commands (first tuple member), the command
     * should be substituted with `%command%`.
     */
    examples(): [[string, string]];

    /**
     * Returns a help message string.
     */
    help(): string;

    /**
     * Returns a full usage string, without the command prefix and with arguments.
     * The command name itself will be substituted with `%command%`.
     *
     * Example: `%command% <member> [hasThing]`
     */
    usage(): string;
}
