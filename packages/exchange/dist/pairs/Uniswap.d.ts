import Pair, { ExchangeParams, ValueTypes } from './Pair';
export default class Uniswap extends Pair {
    private exchangeAddress;
    constructor(asset: string);
    getContract(): Promise<import("web3-eth-contract").Contract>;
    getExchangeAddress(): Promise<string | null>;
    exchangeAtoB({ account, value, ether }: ExchangeParams): Promise<any>;
    exchangeBtoA({ account, value, ether }: ExchangeParams): Promise<any>;
    estimateAtoB(value: ValueTypes): Promise<{
        estimate: any;
        estimateInfo: null;
    }>;
    estimateBtoA(value: ValueTypes): Promise<{
        estimate: any;
        estimateInfo: null;
    }>;
}
