import { WhoisResult } from "../interfaces";
import { defaultParser } from "./default";
import { czParser } from "./cz";
import { ruParser } from "./ru";
import { euParser } from "./eu";
import { plParser } from "./pl";

export function parseOutputToObject(tld: string, data: string, whoisServer: string, cache = false): WhoisResult {
    //console.debug("Data: \n" + data);

    let whoisResult: WhoisResult;
    switch (tld) {
        case "cz":
            whoisResult = czParser(data);
            break;
        case "eu":
            whoisResult = euParser(data);
            break;
        case "pl":
            whoisResult = plParser(data);
            break;
        case "ru":
            whoisResult = ruParser(data);
            break;
        default:
            console.info("Using default parser...")
            whoisResult = defaultParser(data);
            break;
    }
    whoisResult.usedWhoisServer = whoisServer;
    whoisResult.cached = cache;

    return whoisResult;
}
