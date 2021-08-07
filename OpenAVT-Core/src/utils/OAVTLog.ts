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

    private static log(cutLevel: LogLevel, logfoo: any, ...msg: any) {
        if (this.logLevel <= cutLevel) {
            logfoo(new Date() + " OAVTLog", ...msg)
        }
    }

    /**
     * Print a verbose log.
     * 
     * @param msg Log message.
     */
    public static verbose(...msg: any) {
        this.log(LogLevel.Verbose, console.log, "[VERBOSE]", ...msg)
    }

    /**
     * Print a debug log.
     * 
     * @param msg Log message.
     */
     public static debug(...msg: any) {
        this.log(LogLevel.Debug, console.debug, "[DEBUG]", ...msg)
    }

    /**
     * Print a warning log.
     * 
     * @param msg Log message.
     */
     public static warning(...msg: any) {
        this.log(LogLevel.Warning, console.warn, "[WARNING]", ...msg)
    }

    /**
     * Print a error log.
     * 
     * @param msg Log message.
     */
     public static error(...msg: any) {
        this.log(LogLevel.Error, console.error, "[ERROR]", ...msg)
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