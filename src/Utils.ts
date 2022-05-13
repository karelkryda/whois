import axios, { AxiosInstance } from "axios";
import { setupCache } from "axios-cache-adapter"
import { parse_host } from "tld-extract";
import { Database, open } from "sqlite";
import * as sqlite3 from "sqlite3";

/* eslint-disable no-useless-escape */

/**
 * Regex to get a whois server from iana.org.
 */
export const whoisServerRegex = new RegExp("<b>WHOIS Server:<\/b> (http(s)?:\/\/)?(www.)?([a-zA-Z\\d])+([\-\.][a-zA-Z\\d]+)*\.[a-zA-Z]{2,5}(:\\d{1,5})?(\/[^\s]*)?");
/**
 * Regex to verify that the specified domain is valid.
 */
export const domainRegex = new RegExp("^(http(s)?:\/\/)?(www.)?([a-zA-Z\\d])+([\-\.][a-zA-Z\\d]+)*\.[a-zA-Z]{2,5}(:\\d{1,5})?(\/[^\s]*)?$");

/* eslint-enable no-useless-escape */

export const ENTER = "\r\n";
export const endOfWhoisReport = ">>> Last update of WHOIS database: ";

/**
 * Function to set up Axios cache (default 24 hours)
 * @returns AxiosInstance
 */
export function getAxiosWithCache(): AxiosInstance {
    const cache = setupCache({
        maxAge: 24 * 60 * 60 * 1000,
    });

    return axios.create({
        adapter: cache.adapter,
    });
}

/**
 * Function to connect to SQLite database.
 *@returns{{Promise<Database>>}}
 */
export async function connectToDatabase(): Promise<Database> {
    return await open({
        filename: "./tmp/database.db",
        driver: sqlite3.cached.Database,
    });
}

/**
 * Function to check if entered string is real domain.
 * @param domain - domain to check
 * @returns boolean
 */
export function isDomain(domain: string): boolean {
    return domainRegex.test(domain);
}

/**
 * Function to separate TLD form entered domain.
 * @param domain - domain to check
 * @returns string
 */
export function separateTLD(domain: string): string {
    return parse_host(domain).tld;
}

/**
 * Function to get whois server for specific tld.
 * @param tld - domain tld
 * @returns {{Promise<String>>}}
 */
export async function getWhoisServerByTLD(tld: string): Promise<string> {
    try {
        const response = await getAxiosWithCache()({
            url: `https://www.iana.org/domains/root/db/${tld}.html`,
            method: "GET",
        });

        if (response.data) {
            const server = response.data.match(whoisServerRegex)[0].replace("<b>WHOIS Server:</b>", "").trim();
            if (server.length)
                return server;
            else
                throw new Error("no registrar found for this TLD");
        }
    } catch (e) {
        throw new Error(e.message);
    }
}
