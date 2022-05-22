import ENS from './ENS';
export default class ENSPlugin {
    constructor(network = '1') {
        this.ensCache = {};
        this.reverseCache = {};
        this.ens = null;
        this.network = network;
    }
    initializePlugin(pluginContext) {
        this.ens = new ENS(pluginContext.getWeb3(this.network), this.network);
        pluginContext.addAddressToNameResolver((address) => this.lookupName(address));
        pluginContext.onAccountSearch((search) => search.length > 3 && search.indexOf('.') !== -1 ? this.ensSearch(search) : Promise.resolve([]));
    }
    async lookupName(address) {
        if (this.reverseCache[address] !== undefined) {
            return this.reverseCache[address];
        }
        try {
            const name = await this.ens.reverseLookup(address);
            this.reverseCache[address] = name;
            return name;
        }
        catch (e) {
            console.warn('Reverse ENS error', e);
            return null;
        }
    }
    async ensSearch(search) {
        const cached = this.ensCache[search];
        if (cached !== undefined) {
            return cached ? [{ name: search, address: cached }] : [];
        }
        const address = await this.ens.getAddress(search);
        this.ensCache[search] = address;
        return address ? [{ name: search, address }] : [];
    }
}
//# sourceMappingURL=ENSPlugin.js.map