import { Asset, BurnerPluginContext, Plugin } from '@burner-wallet/types';
import Pair from './pairs/Pair';
interface ExchangeConstructor {
    pairs: Pair[];
}
export default class Exchange implements Plugin {
    private _pluginContext;
    private pairs;
    constructor(props: ExchangeConstructor | Pair[]);
    initializePlugin(pluginContext: BurnerPluginContext): void;
    getPairs(): Pair[];
    getAsset(id: string): Asset;
    getWeb3(network: string): import("web3").default;
    readonly pluginContext: BurnerPluginContext;
}
export {};
