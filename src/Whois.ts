import { connectToDatabase, endOfWhoisReport, ENTER, getWhoisServerByTLD, isDomain, separateTLD } from "./Utils";
import { WhoisOptions, WhoisResult } from "./interfaces";
import { createConnection } from "net";
import { parseOutputToObject } from "./parsers";

/**
 * Check if parameters are valid
 * @param options
 */
function check(options: WhoisOptions) {
    if (!options) return;

    /** Check debug option. */
    if (
        typeof options.timeout !== "undefined" &&
        (typeof options.timeout !== "number" ||
            options.timeout <= 0)
    )
        throw new TypeError("Option \"timeout\" must be a positive number.");

    /** Check useCache option. */
    if (
        typeof options.useCache !== "undefined" &&
        typeof options.useCache !== "boolean"
    )
        throw new TypeError("Option \"useCache\" must be a type of boolean.");
}

export class Whois {
    /**
     * Optional parameters
     * @type WhoisOptions
     */
    private readonly options: WhoisOptions;

    /**
     * Constructor for Whois class
     * @param options - Optional parameters
     */
    constructor(options?: WhoisOptions) {
        check(options);

        this.options = {
            timeout: 10000,
            useCache: true,
            ...options,
        };
    }

    /**
     * Function that obtains information about the entered domain.
     * @returns {{Promise<WhoisResult>>}}
     */
    public async fetchDomain(domain: string): Promise<WhoisResult> {
        if (!isDomain(domain))
            throw new Error("entered domain is not real domain");

        const tld = separateTLD(domain);
        let databaseConnection;
        if (this.options.useCache) {
            databaseConnection = await connectToDatabase();
            const cachedQuery = await databaseConnection.get("SELECT server, query FROM cached_queries WHERE domain = ? AND datetime(timestamp) >= datetime('now', '-1 Hour')", domain);
            if (cachedQuery)
                return parseOutputToObject(tld, cachedQuery.query, cachedQuery.server, true);
        }

        const whoisServer = await getWhoisServerByTLD(tld);
        let whoisResult = "";

        return new Promise((resolve, reject) => {
            const socketConnection = createConnection(
                43,
                whoisServer,
                () => {
                    socketConnection.write(domain + ENTER);
                },
            );
            socketConnection.setEncoding("utf8");
            socketConnection.setTimeout(this.options.timeout);

            socketConnection.on("data", (data) => {
                whoisResult += data;
            });

            socketConnection.on("end", async () => {
                socketConnection.destroy();

                whoisResult = whoisResult.slice(0, whoisResult.toLowerCase().indexOf(endOfWhoisReport.toLowerCase()));
                if (this.options.useCache)
                    await databaseConnection.run("INSERT INTO cached_queries (server, domain, query) VALUES (?, ?, ?)", whoisServer, domain, whoisResult);

                resolve(parseOutputToObject(tld, whoisResult, whoisServer));
            });
            socketConnection.on("timeout", () => {
                reject(new Error("The server did not return data at the requested time"));
            });
            socketConnection.on("error", (error) => {
                reject(new Error(error.message));
            });
        });
    }
}
