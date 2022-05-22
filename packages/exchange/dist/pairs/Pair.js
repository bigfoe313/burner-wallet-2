import { toWei } from 'web3-utils';
export default class Pair {
    constructor({ assetA, assetB }) {
        this.assetA = assetA;
        this.assetB = assetB;
        this._exchange = null;
    }
    setExchange(newExchange) {
        this._exchange = newExchange;
    }
    getExchange() {
        if (!this._exchange) {
            throw new Error('Exchange not set');
        }
        return this._exchange;
    }
    _getValue({ value, ether }) {
        if (!value && !ether) {
            throw new Error('Must provide value for transfer');
        }
        if (value) {
            return value;
        }
        return toWei(ether, 'ether');
    }
    getLoadingMessage() {
        return 'Exchanging assets...';
    }
}
//# sourceMappingURL=Pair.js.map