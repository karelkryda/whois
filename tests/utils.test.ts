import { expect } from "chai";
import { getWhoisServerByTLD, isDomain, separateTLD } from "../src/Utils";

describe("check utils", () => {
    it("function to check if string is domain", () => {
        let domain = "google.com";
        expect(isDomain(domain)).to.be.true;

        domain = "seznam.cz";
        expect(isDomain(domain)).to.be.true;

        domain = "fastsales.co.uk";
        expect(isDomain(domain)).to.be.true;

        domain = "example1"
        expect(isDomain(domain)).to.be.false;
    }).timeout(1000);

    it("function to separate tld from domain", () => {
        const domainsAndTLDs = [
            [ "google.com", "com" ],
            [ "seznam.cz", "cz" ],
            [ "muserbot.tk", "tk" ],
            [ "fastsales.co.uk", "co.uk" ],
            [ "example.ru", "ru" ],
            [ "example.cf", "cf" ],
            [ "example.africa", "africa" ],
        ];

        domainsAndTLDs.forEach((domainTLD) => {
            const tld = separateTLD(domainTLD[0]);
            expect(tld).to.equal(domainTLD[1]);
        });
    }).timeout(1000);

    it("function to get whois server by tld", async () => {
        const domainsServers = [
            [ "google.com", "whois.verisign-grs.com" ],
            [ "google.cz", "whois.nic.cz" ],
            [ "example.africa", "whois.nic.africa" ],
        ];

        for (const domainServer of domainsServers) {
            const tld = separateTLD(domainServer[0]);
            const whoisServer = await getWhoisServerByTLD(tld);
            expect(whoisServer).to.equal(domainServer[1]);
        }
    }).timeout(10000);
});
