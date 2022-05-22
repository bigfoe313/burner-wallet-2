import ExchangePage from './ui/ExchangePage';
;
export default class Exchange {
    constructor(props) {
        this.pairs = Array.isArray(props) ? props : props.pairs;
        this._pluginContext = null;
    }
    initializePlugin(pluginContext) {
        this._pluginContext = pluginContext;
        this.pairs.forEach(pair => pair.setExchange(this));
        pluginContext.addPage('/exchange', ExchangePage);
        pluginContext.addButton('apps', 'Exchange', '/exchange', { description: 'Convert between different currencies' });
    }
    getPairs() {
        return this.pairs;
    }
    getAsset(id) {
        for (const asset of this.pluginContext.getAssets()) {
            if (asset.id === id) {
                return asset;
            }
        }
        throw new Error(`Can not find asset ${id}`);
    }
    getWeb3(network) {
        return this.pluginContext.getWeb3(network);
    }
    get pluginContext() {
        if (!this._pluginContext) {
            throw new Error('Exchange not initialized');
        }
        return this._pluginContext;
    }
}
//# sourceMappingURL=Exchange.js.map