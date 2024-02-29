import winston, { format } from "winston";

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`.replace(/\n/g, "");
});

const colors = {
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "green",
    debug: "magenta",
};

winston.addColors(colors);

const logger = winston.createLogger({
    level: "debug",
    defaultMeta: {},
    transports: [

        new winston.transports.Console({
            level: "debug",
            format: combine(colorize(), timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), myFormat),
        }),
        new winston.transports.File({
            filename: "./logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "./logs/combined.log" }),
    ],
});


export default logger;
