import Pair from './Pair';
export default class Bridge extends Pair {
    constructor({ assetA, assetABridge, assetB, assetBBridge }) {
        super({ assetA, assetB });
        this.assetABridge = assetABridge;
        this.assetBBridge = assetBBridge;
    }
    async exchangeAtoB({ account, value, ether }) {
        const _value = this._getValue({ value, ether });
        const asset = this.getExchange().getAsset(this.assetA);
        const result = await asset.send({ from: account, value: _value, to: this.assetABridge });
        await this.detectExchangeAToBFinished(account, _value, result);
        return result;
    }
    async exchangeBtoA({ account, value, ether }) {
        const _value = this._getValue({ value, ether });
        const asset = this.getExchange().getAsset(this.assetB);
        const result = await asset.send({ from: account, value: _value, to: this.assetBBridge });
        await this.detectExchangeBToAFinished(account, _value, result);
        return result;
    }
    async estimateAtoB(value) {
        return {
            estimate: this._getValue(value),
            estimateInfo: null
        };
    }
    async estimateBtoA(value) {
        return {
            estimate: this._getValue(value),
            estimateInfo: null
        };
    }
    getLoadingMessage() {
        return 'Exchanging assets.. please wait until the bridge relays the transaction';
    }
    async detectExchangeBToAFinished(account, value, sendResult) {
        throw new Error('detect exchange B to A finished not implemented');
    }
    async detectExchangeAToBFinished(account, value, sendResult) {
        throw new Error('detect exchange A to B finished not implemented');
    }
}
//# sourceMappingURL=Bridge.js.map