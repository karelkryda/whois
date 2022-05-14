export interface WhoisOptions {
    /** WHOIS request completion timeout. */
    timeout?: number;
    /** Use builtin Redis cache for requests. */
    useCache?: boolean;
}

export interface WhoisResult {
    /** Domain information. */
    domain?: Domain;

    /** Domain owner information. */
    registrant?: Registrant;

    /** Domain registration provider information. */
    registrar?: Registrar;

    /** Information about the main registrar for the given TLD. */
    registry?: Registry;

    /** WHOIS server from which the information was obtained. */
    usedWhoisServer?: string;

    /** If request was returned from cache. */
    cached?: boolean;
}

/** Domain information. */
interface Domain {
    /** The full domain name. */
    name?: string;

    /** Current state of the domain. */
    state?: string;

    /** Domain registration date. */
    creationDate?: Date;

    /** Date the domain was last updated. */
    updateDate?: Date;

    /** Domain expiration date. */
    expirationDate?: Date;

    /** NSSET (name server set identifier). */
    nsset?: string;

    /** A set of records (so-called keyset), which contains at least one DNS key and at least one technical contact. */
    keyset?: string;

    /** Information on the use of DNSSEC. */
    dnssec?: string;

    /** The DNSKEY record contains a public signing key. */
    dnsKey?: DNSKey;

    /** Array containing the set name servers. */
    nameServers?: string[];
}

/** Information about DNSKey. */
interface DNSKey {
    /** Indicates whether the DNSKEY record contains a ZSK or a KSK. */
    flags?: number;

    /** This always has a value of 3, for DNSSEC. */
    protocol?: number;

    /** Identifies the public key's cryptographic algorithm. */
    algorithm?: number;

    /** The public key encoded in Base64. */
    key?: string;
}

/** Domain owner information. */
interface Registrant {
    /** Domain owner type. */
    type?: string;

    /** Domain owner ID. */
    id?: number | string;

    /** Domain owner organisation name. */
    organisation?: string;

    /** Domain owner name. */
    name?: string;

    /** Domain owner street. */
    street?: string;

    /** Domain owner postal code. */
    postalCode?: string;

    /** Domain owner city. */
    city?: string;

    /** Domain owner country. */
    country?: string;

    /** Domain owner phone number. */
    phone?: string;

    /** Domain owner email address. */
    email?: string;
}

/** Domain registration provider information. */
interface Registrar {
    /** Domain registration provider ID. */
    id?: number | string;

    /** Domain registration provider IANA ID (IANA uses to identify the registrar). */
    ianaID?: number | string;

    /** Domain registration provider name. */
    name?: string;

    /** Domain registration provider web. */
    url?: URL;

    /** Domain registration provider street. */
    street?: string;

    /** Domain registration provider postal code. */
    postalCode?: string;

    /** Domain registration provider city. */
    city?: string;

    /** Domain registration provider country. */
    country?: string;

    /** Domain registration provider language. */
    language?: string;

    /** Domain registration provider phone number. */
    phone?: string;

    /** Domain registration provider email address. */
    email?: string;

    /** Domain registration provider phone number for reporting abuse. */
    abuseContactPhone?: string;

    /** Domain registration provider email address for reporting abuse. */
    abuseContactEmail?: string;

    /** Domain registration provider WHOIS server. */
    whoisServer?: string;
}

/** Information about the main registrar for the given TLD. */
interface Registry {
    /** Registry type. */
    type?: string;

    /** Registry ID. */
    id?: number | string;

    /** Registry organisation name. */
    organisation?: string;

    /** Registry name. */
    name?: string;

    /** Registry street. */
    street?: string;

    /** Registry postal code. */
    postalCode?: string;

    /** Registry city. */
    city?: string;

    /** Registry country. */
    country?: string;

    /** Registry phone number. */
    phone?: string;

    /** Registry email address. */
    email?: string;
}
