import { WhoisResult } from "../interfaces";

export function czParser(data: string): WhoisResult {
    const nameServers = [];
    const whoisResult: WhoisResult = {};
    const dataPerLine = data.split("\n");
    dataPerLine.forEach((dataLine: string) => {
        const dataArray = dataLine.trim().split(": ");
        if (dataArray[1])
            dataArray[1] = dataArray[1].trim();

        //TODO: CZ
        switch (dataArray[0].toLowerCase()) {
            case "domain":
                whoisResult.domainName = dataArray[1];
                break;
            case "registry domain id":
                whoisResult.registryDomainID = dataArray[1];
                break;
            case "registrar whois server":
                whoisResult.registrarWhoisServer = dataArray[1];
                break;
            case "registrar url":
                whoisResult.registrarURL = new URL(dataArray[1]);
                break;
            case "changed":
                whoisResult.updatedDate = new Date(dataArray[1]);
                break;
            case "registered":
                whoisResult.creationDate = new Date(dataArray[1]);
                break;
            case "expire":
                whoisResult.registryExpiryDate = new Date(dataArray[1]);
                break;
            case "registrar":
                whoisResult.registrar = dataArray[1];
                break;
            case "registrar iana id":
                whoisResult.registrarIanaID = Number(dataArray[1]);
                break;
            case "registrar abuse contact email":
                whoisResult.registrarAbuseContactEmail = dataArray[1];
                break;
            case "registrar abuse contact phone":
                whoisResult.registrarAbuseContactPhone = dataArray[1];
                break;
            case "name server":
                nameServers.push(dataArray[1]);
                break;
            case "dnssec":
                whoisResult.dnssec = dataArray[1];
                break
        }
    });
    whoisResult.nameServers = nameServers;

    return whoisResult;
}
