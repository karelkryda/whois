import { WhoisResult } from "../interfaces";
import { defaultParser } from "./default";
import { czParser } from "./cz";
import { ruParser } from "./ru";

export function parseOutputToObject(tld: string, data: string, cache = false): WhoisResult {
    let whoisResult: WhoisResult;
    switch (tld) {
        case "cz":
            whoisResult = czParser(data);
            break;
        case "ru":
            whoisResult = ruParser(data);
            break;
        default:
            console.info("Using default parser...")
            console.debug("Data: \n" + data);
            whoisResult = defaultParser(data);
            break;
    }
    whoisResult.cached = cache;

    return whoisResult;
}
