import { WhoisResult } from "../interfaces";

export function defaultParser(data: string): WhoisResult {
    const nameServers = [];
    const whoisResult: WhoisResult = {};
    const dataPerLine = data.split("\n");
    dataPerLine.forEach((dataLine: string) => {
        const dataArray = dataLine.trim().split(": ");
        if (dataArray[1])
            dataArray[1] = dataArray[1].trim();

        switch (dataArray[0].toLowerCase()) {
            case "domain name":
                whoisResult.domainName = dataArray[1].toLowerCase();
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
            case "updated date":
                whoisResult.updatedDate = new Date(dataArray[1]);
                break;
            case "creation date":
                whoisResult.creationDate = new Date(dataArray[1]);
                break;
            case "registry expiry date":
                whoisResult.registryExpiryDate = new Date(dataArray[1]);
                break;
            case "registrar":
                whoisResult.registrar = dataArray[1];
                break;
            case "registrar iana id":
                whoisResult.registrarIanaID = Number(dataArray[1]) || dataArray[1];
                break;
            case "registry registrant id":
                whoisResult.registryRegistrantID = Number(dataArray[1]) || dataArray[1];
                break;
            case "registrant name":
                whoisResult.registrantName = dataArray[1];
                break;
            case "registrant organization":
                whoisResult.registrantOrganization = dataArray[1];
                break;
            case "registrant street":
                whoisResult.registrantStreet = dataArray[1];
                break;
            case "registrant city":
                whoisResult.registrantCity = dataArray[1];
                break;
            case "registrant state/province":
                whoisResult.registrantStateProvince = dataArray[1];
                break;
            case "registrant postal code":
                whoisResult.registrantPostalCode = dataArray[1];
                break;
            case "registrant country":
                whoisResult.registrantCountry = dataArray[1];
                break;
            case "registrant phone":
                whoisResult.registrantPhone = dataArray[1];
                break;
            case "registrant phone ext":
                whoisResult.registrantPhoneExt = dataArray[1];
                break;
            case "registrant fax":
                whoisResult.registrantFax = dataArray[1];
                break;
            case "registrant fax ext":
                whoisResult.registrantFaxExt = dataArray[1];
                break;
            case "registrant email":
                whoisResult.registrantEmail = dataArray[1];
                break;
            case "registry admin id":
                whoisResult.registryAdminID = Number(dataArray[1]) || dataArray[1];
                break;
            case "admin name":
                whoisResult.adminName = dataArray[1];
                break;
            case "admin organization":
                whoisResult.adminOrganization = dataArray[1];
                break;
            case "admin street":
                whoisResult.adminStreet = dataArray[1];
                break;
            case "admin city":
                whoisResult.adminCity = dataArray[1];
                break;
            case "admin state/province":
                whoisResult.adminStateProvince = dataArray[1];
                break;
            case "admin postal code":
                whoisResult.adminPostalCode = dataArray[1];
                break;
            case "admin country":
                whoisResult.adminCountry = dataArray[1];
                break;
            case "admin phone":
                whoisResult.adminPhone = dataArray[1];
                break;
            case "admin phone ext":
                whoisResult.adminPhoneExt = dataArray[1];
                break;
            case "admin fax":
                whoisResult.adminFax = dataArray[1];
                break;
            case "admin fax ext":
                whoisResult.adminFaxExt = dataArray[1];
                break;
            case "admin email":
                whoisResult.adminEmail = dataArray[1];
                break;
            case "registry tech id":
                whoisResult.registryTechID = Number(dataArray[1]) || dataArray[1];
                break;
            case "tech name":
                whoisResult.techName = dataArray[1];
                break;
            case "tech organization":
                whoisResult.techOrganization = dataArray[1];
                break;
            case "tech street":
                whoisResult.techStreet = dataArray[1];
                break;
            case "tech city":
                whoisResult.techCity = dataArray[1];
                break;
            case "tech state/province":
                whoisResult.techStateProvince = dataArray[1];
                break;
            case "tech postal code":
                whoisResult.techPostalCode = dataArray[1];
                break;
            case "tech country":
                whoisResult.techCountry = dataArray[1];
                break;
            case "tech phone":
                whoisResult.techPhone = dataArray[1];
                break;
            case "tech phone ext":
                whoisResult.techPhoneExt = dataArray[1];
                break;
            case "tech fax":
                whoisResult.techFax = dataArray[1];
                break;
            case "tech fax ext":
                whoisResult.techFaxExt = dataArray[1];
                break;
            case "tech email":
                whoisResult.techEmail = dataArray[1];
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
