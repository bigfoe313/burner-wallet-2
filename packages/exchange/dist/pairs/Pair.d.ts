import Exchange from '../Exchange';
export interface ValueTypes {
    value?: string;
    ether?: string;
}
export interface ExchangeParams extends ValueTypes {
    account: string;
}
export interface EstimateReturn {
    estimate: string;
    estimateInfo?: null | string;
}
interface PairConstructor {
    assetA: string;
    assetB: string;
}
export default abstract class Pair {
    assetA: string;
    assetB: string;
    private _exchange;
    constructor({ assetA, assetB }: PairConstructor);
    abstract exchangeAtoB({ account, value, ether }: ExchangeParams): Promise<void>;
    abstract exchangeBtoA({ account, value, ether }: ExchangeParams): Promise<void>;
    abstract estimateAtoB(value: ValueTypes): Promise<EstimateReturn>;
    abstract estimateBtoA(value: ValueTypes): Promise<EstimateReturn>;
    setExchange(newExchange: Exchange): void;
    getExchange(): Exchange;
    _getValue({ value, ether }: ValueTypes): string;
    getLoadingMessage(): string;
}
export {};
