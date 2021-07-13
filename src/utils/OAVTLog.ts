/**
 * Log levels.
 */
export enum LogLevel {
    /** Log level verbose. */
    Verbose = 0,
    /** Log level debug. */
    Debug = 1,
    /** Log level warning. */
    Warning = 2,
    /** Log level error. */
    Error = 3,
    /** Log level none. */
    None = 4
}

/**
 * OpenAVT logging.
 */
export class OAVTLog {
    private static logLevel = LogLevel.Warning

    private static log(msg: string, cutLevel: LogLevel) {
        if (this.logLevel <= cutLevel) {
            console.log(new Date() + " OAVTLog" + msg)
        }
    }

    /**
     * Print a verbose log.
     * 
     * @param msg Log message.
     */
    public static verbose(msg: string) {
        this.log("[VERBOSE] " + msg, LogLevel.Verbose)
    }

    /**
     * Print a debug log.
     * 
     * @param msg Log message.
     */
     public static debug(msg: string) {
        this.log("[DEBUG] " + msg, LogLevel.Debug)
    }

    /**
     * Print a warning log.
     * 
     * @param msg Log message.
     */
     public static warning(msg: string) {
        this.log("[WARNING] " + msg, LogLevel.Warning)
    }

    /**
     * Print a error log.
     * 
     * @param msg Log message.
     */
     public static error(msg: string) {
        this.log("[ERROR] " + msg, LogLevel.Error)
    }

    /**
     * Set log level.
     * 
     * @param logLevel Log level.
     */
    public static setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel
    }
}