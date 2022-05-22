export default class ENS {
    private web3;
    private network;
    constructor(web3: any, network?: string);
    getRegistry(): any;
    getResolver(address: string): any;
    getAddress(ensName: string): Promise<any>;
    reverseLookup(address: string): Promise<any>;
}
