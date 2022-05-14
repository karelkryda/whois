import moment = require("moment");
import { WhoisResult } from "../interfaces";

//TODO: try to solve incompatibility due to stupid implementation of blocks (we can see 1 - x blocks of owners -> it breaks logic from registrant to the end)
// the general functions are OK (domain, expiration, ....)
export function czParser(data: string): WhoisResult {
    data = data.slice(data.toLowerCase().indexOf("domain:".toLowerCase()));
    //console.log(data);

    const nameServers = [];
    const whoisResult: WhoisResult = {
        domain: {
            dnsKey: {},
        },
        registrant: {},
        registrar: {},
        registry: {},
    };
    let minusIndex = 0;
    let registrantAddressIndex = 0;
    let registryAddressIndex = 0;
    const dataPerBlock = data.split(/\n\s*\n/);
    dataPerBlock.forEach((dataBlock: string, index: number) => {
        if (index === 2 && !dataBlock.includes("nserver"))
            minusIndex++;

        console.log("\n\nstarting block with index " + index + ", minusIndex " + minusIndex + " > " + (index - minusIndex));
        console.log("\ndata in this block: " + dataBlock);
        index -= minusIndex;

        if (index === 3 && !dataBlock.includes("dnskey")) {
            //minusIndex--;
            //index -= minusIndex;
        }

        const dataPerLine = dataBlock.split("\n");
        dataPerLine.forEach((dataLine: string) => {
            const dataArray = dataLine.trim().split(": ");
            if (dataArray[1])
                dataArray[1] = dataArray[1].trim();

            if (index === 0)
                switch (dataArray[0].toLowerCase()) {
                    case "domain":
                        whoisResult.domain.name = dataArray[1];
                        break;
                    case "registrant":
                        whoisResult.registrant.id = dataArray[1];
                        break;
                    case "nsset":
                        whoisResult.domain.nsset = dataArray[1];
                        break;
                    case "keyset":
                        whoisResult.domain.keyset = dataArray[1];
                        break;
                    case "registered":
                        whoisResult.domain.creationDate = moment(dataArray[1], "DD.MM.YYYY HH:mm:ss").toDate(); //20.09.2016 09:13:11
                        break;
                    case "changed":
                        whoisResult.domain.updateDate = moment(dataArray[1], "DD.MM.YYYY HH:mm:ss").toDate(); //16.04.2021 14:25:17
                        break;
                    case "expire":
                        whoisResult.domain.expirationDate = moment(dataArray[1], "DD.MM.YYYY").toDate(); //20.09.2022
                        break;
                }
            else if (index === 1)
                switch (dataArray[0].toLowerCase()) {
                    case "contact":
                        whoisResult.registrant.id = dataArray[1];
                        break;
                    case "org":
                        whoisResult.registrant.organisation = dataArray[1];
                        break;
                    case "name":
                        whoisResult.registrant.name = dataArray[1];
                        break;
                    case "address":
                        if (registrantAddressIndex === 0)
                            whoisResult.registrant.street = dataArray[1];
                        else if (registrantAddressIndex === 1)
                            whoisResult.registrant.city = dataArray[1];
                        else if (registrantAddressIndex === 2)
                            whoisResult.registrant.postalCode = dataArray[1];
                        else if (registrantAddressIndex === 3)
                            whoisResult.registrant.country = dataArray[1];

                        registrantAddressIndex++;
                        break;
                }

            else if (index === 2)
                switch (dataArray[0].toLowerCase()) {
                    case "nserver":
                        nameServers.push(dataArray[1]);
                        break;
                }

            else if (index === 3)
                switch (dataArray[0].toLowerCase()) {
                    case "dnskey": {
                        const dnsKey = dataArray[1].split(" ");

                        whoisResult.domain.dnsKey.flags = Number(dnsKey[0]);
                        whoisResult.domain.dnsKey.protocol = Number(dnsKey[1]);
                        whoisResult.domain.dnsKey.algorithm = Number(dnsKey[2]);
                        whoisResult.domain.dnsKey.key = dnsKey[3];
                        break;
                    }
                }

            else if (index === 4)
                switch (dataArray[0].toLowerCase()) {
                    case "contact":
                        whoisResult.registry.id = dataArray[1];
                        break;
                    case "org":
                        whoisResult.registry.organisation = dataArray[1];
                        break;
                    case "name":
                        whoisResult.registry.name = dataArray[1];
                        break;
                    case "address":
                        if (registryAddressIndex === 0)
                            whoisResult.registry.street = dataArray[1];
                        else if (registryAddressIndex === 1)
                            whoisResult.registry.city = dataArray[1];
                        else if (registryAddressIndex === 2)
                            whoisResult.registry.postalCode = dataArray[1];
                        else if (registryAddressIndex === 3)
                            whoisResult.registry.country = dataArray[1];

                        registryAddressIndex++;
                        break;
                }
        });
    });
    whoisResult.domain.nameServers = nameServers;

    return whoisResult;
}
