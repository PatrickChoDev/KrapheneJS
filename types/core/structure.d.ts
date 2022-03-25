export declare class Identity {
    readonly id: string;
    private readonly pubkey;
    private readonly name;
    private readonly email;
    constructor(pubkey: string, name?: string, email?: string);
    whois(): {
        id: string;
        name: string;
        email: string;
        pubkey: string;
    };
}
export declare class Transaction {
    readonly from: Address;
    readonly to: Address;
    readonly type: 'PING' | 'CHECK' | 'TRANSFER' | 'NETWORK';
    private readonly data;
    constructor(from: Address, to: Address, type: 'PING' | 'CHECK' | 'TRANSFER' | 'NETWORK', data: any);
}
export declare class Ledger {
    readonly id: string;
    readonly owner: Identity;
    private readonly data;
    readonly hash: string;
    verified: boolean;
    readonly receipt: Identity;
    constructor(signer: Identity, hash: string, data: Transaction, receipt: Identity);
    sign(key: string): boolean;
    broadcast(access: Identity): Transaction;
}
export declare class Address {
    private readonly address_id;
    private readonly owner;
    private chain;
    constructor(owner: Identity);
    whoisOwner(): string;
    balance(): Transaction[];
    append(value: Ledger): void;
}
