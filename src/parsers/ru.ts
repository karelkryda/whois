import { WhoisResult } from "../interfaces";

export function ruParser(data: string): WhoisResult {
    const nameServers = [];
    const whoisResult: WhoisResult = {};
    const dataPerLine = data.split("\n");
    dataPerLine.forEach((dataLine: string) => {
        const dataArray = dataLine.trim().split(": ");
        if (dataArray[1])
            dataArray[1] = dataArray[1].trim();

        switch (dataArray[0].toLowerCase()) {
            case "domain":
                whoisResult.domainName = dataArray[1];
                break;
            case "org":
                whoisResult.registrantOrganization = dataArray[1];
                break;
            case "registrar":
                whoisResult.registrar = dataArray[1];
                break;
            case "created":
                whoisResult.creationDate = new Date(dataArray[1]);
                break;
            case "paid-till":
                whoisResult.registryExpiryDate = new Date(dataArray[1]);
                break;
            case "nserver":
                nameServers.push(dataArray[1]);
                break;
        }
    });
    whoisResult.nameServers = nameServers;

    return whoisResult;
}
