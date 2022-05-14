import { WhoisResult } from "../interfaces";
import { isDomain } from "../Utils";

export function euParser(data: string): WhoisResult {
    data = data.slice(data.toLowerCase().indexOf("Domain:".toLowerCase()));

    const nameServers = [];
    const whoisResult: WhoisResult = {
        domain: {
            dnsKey: {},
        },
        registrant: {},
        registrar: {},
        registry: {},
    };
    let category;
    const dataPerLine = data.split("\n");
    dataPerLine.forEach((dataLine: string) => {
        const dataArray = dataLine.trim().split(": ");
        if (dataArray[1])
            dataArray[1] = dataArray[1].trim();

        switch (dataArray[0].toLowerCase().trim()) {
            case "domain":
                whoisResult.domain.name = dataArray[1];
                break;

            case "technical:":
                category = "technical";
                break;
            case "organisation":
                if (category === "technical")
                    whoisResult.registrar.name = dataArray[1];
                break;
            case "language":
                if (category === "technical")
                    whoisResult.registrar.language = dataArray[1];
                break;
            case "email":
                if (category === "technical")
                    whoisResult.registrar.email = dataArray[1];
                break;

            case "registrar:":
                category = "registrar";
                break;
            case "name":
                if (category === "registrar")
                    whoisResult.registrar.name = dataArray[1];
                break;
            case "website":
                if (category === "registrar")
                    whoisResult.registrar.url = (!dataArray[1].match(/^(http|https)/i)) ? new URL("https://" + dataArray[1]) : new URL(dataArray[1]);
                break;

            case "name servers:":
                category = "nservers";
                break;

            case "keys:":
                category = "dnskey";
                break;

            default:
                if (category === "nservers" && isDomain(dataArray[0]))
                    nameServers.push(dataArray[0]);
                else if (category === "dnskey") {
                    const dnsKey = dataArray[0].replace("flags:", "").replace("protocol:", "").replace("algorithm:", "").replace("pubKey:", "").split(" ");

                    whoisResult.domain.dnsKey.flags = getFlagNumber(dnsKey[0]);
                    whoisResult.domain.dnsKey.protocol = Number(dnsKey[1]);
                    whoisResult.domain.dnsKey.algorithm = getAlgorithmNumber(dnsKey[2]);
                    whoisResult.domain.dnsKey.key = dnsKey[3];

                    category = "";
                }
                break;
        }
    });
    whoisResult.domain.nameServers = nameServers;

    return whoisResult;
}

/**
 * Function to convert the text expression of the flag to the corresponding flag number.
 * @param data - text expression of the flag
 * @returns number
 */
function getFlagNumber(data: string): number {
    switch (data) {
        case "ZSK":
            return 256;
        case "KSK":
            return 257;
        default:
            return 0;
    }
}

/**
 * Function to convert the text expression of the algorithm to the corresponding algorithm number.
 * @param data - text expression of the algorithm
 * @returns number
 */
function getAlgorithmNumber(data: string): number {
    switch (data) {
        case "RSA_MD5":
            return 1;
        case "Diffie-Hellman":
            return 2;
        case "DSA":
            return 3;
        case "Reserved":
            return 4;
        case "RSA_SHA1":
            return 5
        case "DSA_SHA1_NSEC3":
            return 6;
        case "RSA_SHA1_NSEC3":
            return 7;
        case "RSA_SHA256":
            return 8;
        case "RSA_SHA512":
            return 10;
        default:
            return 0;
    }
}
