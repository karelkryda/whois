import { WhoisResult } from "../interfaces";
import { isDomain } from "../Utils";

export function plParser(data: string): WhoisResult {
    const nameServers = [];
    const whoisResult: WhoisResult = {
        domain: {},
        registrant: {},
        registrar: {},
        registry: {},
    };
    let category;
    let registrarIndex = 0;
    const dataPerLine = data.split("\n");
    dataPerLine.forEach((dataLine: string) => {
        const dataArray = dataLine.trim().split(": ");
        if (dataArray[1])
            dataArray[1] = dataArray[1].trim();

        switch (dataArray[0].toLowerCase().trim()) {
            case "domain name":
                whoisResult.domain.name = dataArray[1];
                break;
            case "registrant type":
                whoisResult.registrant.type = dataArray[1];
                break;
            case "nameservers":
                category = "nservers";
                nameServers.push(dataArray[1]);
                break;
            case "state":
                whoisResult.domain.state = dataArray[1];
                break;
            case "created":
                whoisResult.domain.creationDate = new Date(dataArray[1]);
                break;
            case "last modified":
                whoisResult.domain.updateDate = new Date(dataArray[1]);
                break;
            case "renewal date":
                whoisResult.domain.expirationDate = new Date(dataArray[1]);
                break;
            case "dnssec":
                whoisResult.domain.dnssec = dataArray[1];
                break;
            case "registrar:":
                category = "registrar";
                break;
            default:
                if (category === "nservers" && isDomain(dataArray[0].split(". ")[0]))
                    nameServers.push(dataArray[0]);
                else if (category === "registrar") {
                    if (registrarIndex === 0)
                        whoisResult.registrar.name = dataArray[0];
                    else if (registrarIndex === 1)
                        whoisResult.registrar.street = dataArray[0];
                    else if (registrarIndex === 2) {
                        const cityPostalCode = dataArray[0].split(" ")
                        whoisResult.registrar.postalCode = cityPostalCode[0];
                        whoisResult.registrar.city = cityPostalCode[1];
                    } else if (registrarIndex === 3)
                        whoisResult.registrar.country = dataArray[0];
                    else if (registrarIndex === 4)
                        whoisResult.registrar.phone = dataArray[0];
                    else if (registrarIndex === 5 && dataArray[0].includes("@"))
                        whoisResult.registrar.email = dataArray[0];

                    registrarIndex++;
                }
                break;
        }
    });
    whoisResult.domain.nameServers = nameServers;

    return whoisResult;
}
