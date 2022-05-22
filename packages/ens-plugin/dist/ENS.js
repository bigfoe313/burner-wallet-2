import namehash from 'eth-ens-namehash';
import { registryInterface, resolverInterface } from './abi';
const ZERO = '0x0000000000000000000000000000000000000000';
const registrarAddress = {
    '1': '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    '3': '0x112234455c3a32fd11230c42e7bccd4a84e02010',
    '4': '0xe7410170f87102df0055eb195163a03b7f2bff4a',
    '5': '0x112234455c3a32fd11230c42e7bccd4a84e02010',
};
export default class ENS {
    constructor(web3, network = '1') {
        this.web3 = web3;
        this.network = network;
    }
    getRegistry() {
        if (!registrarAddress[this.network]) {
            throw new Error(`ENS not supported on network ${this.network}`);
        }
        return new this.web3.eth.Contract(registryInterface, registrarAddress[this.network]);
    }
    getResolver(address) {
        return new this.web3.eth.Contract(resolverInterface, address);
    }
    async getAddress(ensName) {
        const hashed = namehash.hash(ensName);
        const resolverAddr = await this.getRegistry().methods.resolver(hashed).call();
        if (resolverAddr === ZERO) {
            return null;
        }
        const address = await this.getResolver(resolverAddr).methods.addr(hashed).call();
        return address === ZERO ? null : address;
    }
    async reverseLookup(address) {
        const _address = (address.indexOf('0x') === 0 ? address.substr(2) : address).toLowerCase();
        const hashed = namehash.hash(`${_address}.addr.reverse`);
        const resolverAddr = await this.getRegistry().methods.resolver(hashed).call();
        if (resolverAddr === ZERO) {
            return null;
        }
        const name = await this.getResolver(resolverAddr).methods.name(hashed).call();
        return name;
    }
}
//# sourceMappingURL=ENS.js.map