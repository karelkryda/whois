export interface WhoisOptions {
    /** WHOIS request completion timeout. */
    timeout?: number;
    /** Use builtin Redis cache for requests. */
    useCache?: boolean;
}

export interface WhoisResult {
    /** Domain name. */
    domainName?: string;
    /** Registry Domain ID. */
    registryDomainID?: string;
    /** Registrar WHOIS Server. */
    registrarWhoisServer?: string;
    /** Registrar URL. */
    registrarURL?: URL;
    /** Updated Date. */
    updatedDate?: Date;
    /** Creation Date. */
    creationDate?: Date;
    /** Registry Expiry Date. */
    registryExpiryDate?: Date;
    /** Registrar. */
    registrar?: string;
    /** Registrar IANA ID. */
    registrarIanaID?: number | string;
    /** Registry Registrant ID. */
    registryRegistrantID?: number | string;
    /** Registrant Name. */
    registrantName?: string;
    /** Registrant Organization. */
    registrantOrganization?: string;
    /** Registrant Street. */
    registrantStreet?: string;
    /** Registrant City. */
    registrantCity?: string;
    /** Registrant State/Province. */
    registrantStateProvince?: string;
    /** Registrant Postal Code. */
    registrantPostalCode?: string;
    /** Registrant Country. */
    registrantCountry?: string;
    /** Registrant Phone. */
    registrantPhone?: string;
    /** Registrant Phone Ext. */
    registrantPhoneExt?: string;
    /** Registrant Fax. */
    registrantFax?: string;
    /** Registrant Fax Ext. */
    registrantFaxExt?: string;
    /** Registrant Email. */
    registrantEmail?: string;
    /** Registry Admin ID. */
    registryAdminID?: number | string;
    /** Admin Name. */
    adminName?: string;
    /** Admin Organization. */
    adminOrganization?: string;
    /** Admin Street. */
    adminStreet?: string;
    /** Admin City. */
    adminCity?: string;
    /** Admin State/Province. */
    adminStateProvince?: string;
    /** Admin Postal Code. */
    adminPostalCode?: string;
    /** Admin Country. */
    adminCountry?: string;
    /** Admin Phone. */
    adminPhone?: string;
    /** Admin Phone Ext. */
    adminPhoneExt?: string;
    /** Admin Fax. */
    adminFax?: string;
    /** Admin Fax Ext. */
    adminFaxExt?: string;
    /** Admin Email. */
    adminEmail?: string;
    /** Registry Tech ID. */
    registryTechID?: number | string;
    /** Tech Name. */
    techName?: string;
    /** Tech Organization. */
    techOrganization?: string;
    /** Tech Street. */
    techStreet?: string;
    /** Tech City. */
    techCity?: string;
    /** Tech State/Province. */
    techStateProvince?: string;
    /** Tech Postal Code. */
    techPostalCode?: string;
    /** Tech Country. */
    techCountry?: string
    /** Tech Phone. */
    techPhone?: string;
    /** Tech Phone Ext. */
    techPhoneExt?: string;
    /** Tech Fax. */
    techFax?: string;
    /** Tech Fax Ext. */
    techFaxExt?: string;
    /** Tech Email. */
    techEmail?: string;
    /** Registrar Abuse Contact Email. */
    registrarAbuseContactEmail?: string;
    /** Registrar Abuse Contact Phone. */
    registrarAbuseContactPhone?: string;
    /** DNSSEC. */
    dnssec?: string;
    /** Name Servers. */
    nameServers?: string[];
    /** If request was returned from cache. */
    cached?: boolean;
}
