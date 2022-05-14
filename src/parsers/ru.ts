import { WhoisResult } from "../interfaces";

export function ruParser(data: string): WhoisResult {
    const nameServers = [];
    const whoisResult: WhoisResult = {
        domain: {},
        registrant: {},
        registrar: {},
        registry: {},
    };
    const dataPerLine = data.split("\n");
    dataPerLine.forEach((dataLine: string) => {
        const dataArray = dataLine.trim().split(": ");
        if (dataArray[1])
            dataArray[1] = dataArray[1].trim();

        switch (dataArray[0].toLowerCase()) {
            case "domain":
                whoisResult.domain.name = dataArray[1];
                break;
            case "state":
                whoisResult.domain.state = dataArray[1];
                break;
            case "org":
                whoisResult.registrant.organisation = dataArray[1];
                break;
            case "registrar":
                whoisResult.registrar.name = dataArray[1];
                break;
            case "created":
                whoisResult.domain.creationDate = new Date(dataArray[1]);
                break;
            case "paid-till":
                whoisResult.domain.expirationDate = new Date(dataArray[1]);
                break;
            case "nserver":
                nameServers.push(dataArray[1]);
                break;
        }
    });
    whoisResult.domain.nameServers = nameServers;

    return whoisResult;
}
