import { expect } from "chai";
import { Whois } from "../src";

describe("domain fetch test", () => {
    it("Run fetchDomain for google.com", async () => {
        const whois = new Whois();
        const result = await whois.fetchDomain("google.com");

        expect(result.domainName).to.equal("google.com");
        expect(result.registrarWhoisServer).to.equal("whois.markmonitor.com");
        expect(result.registryExpiryDate).to.be.greaterThan(new Date());
    }).timeout(120000);
});
