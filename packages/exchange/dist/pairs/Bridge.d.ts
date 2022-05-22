import Pair, { EstimateReturn, ExchangeParams, ValueTypes } from './Pair';
interface BridgePairConstructor {
    assetA: string;
    assetABridge: string;
    assetB: string;
    assetBBridge: string;
}
export default class Bridge extends Pair {
    protected readonly assetABridge: string;
    protected readonly assetBBridge: string;
    constructor({ assetA, assetABridge, assetB, assetBBridge }: BridgePairConstructor);
    exchangeAtoB({ account, value, ether }: ExchangeParams): Promise<any>;
    exchangeBtoA({ account, value, ether }: ExchangeParams): Promise<any>;
    estimateAtoB(value: ValueTypes): Promise<EstimateReturn>;
    estimateBtoA(value: ValueTypes): Promise<EstimateReturn>;
    getLoadingMessage(): string;
    detectExchangeBToAFinished(account: string, value: string, sendResult: any): Promise<any>;
    detectExchangeAToBFinished(account: string, value: string, sendResult: any): Promise<any>;
}
export {};
