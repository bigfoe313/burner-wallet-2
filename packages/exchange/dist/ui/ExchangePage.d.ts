import { Component } from 'react';
import { Asset, PluginPageContext } from '@burner-wallet/types';
import Exchange from '../Exchange';
interface ExchangePageState {
    assetA: Asset;
    assetB: Asset;
    amount: string;
    estimate: null | string;
    estimateInfo: null | string;
    isExchanging: boolean;
    error: string | null;
}
export default class ExchangePage extends Component<PluginPageContext<{}, Exchange>, ExchangePageState> {
    private poll;
    constructor(props: PluginPageContext<{}, Exchange>);
    getPair(assetA: Asset, assetB: Asset): import("..").Pair;
    runExchange(): Promise<void>;
    getEstimate(assetA: Asset, assetB: Asset, amount: string): Promise<import("..").EstimateReturn | {
        estimate: null;
        estimateInfo: null;
    }>;
    getPairOptions(asset: Asset): Asset[];
    update({ assetA, assetB, amount }: {
        assetA?: Asset;
        assetB?: Asset;
        amount?: string;
    }): Promise<void>;
    render(): JSX.Element;
}
export {};
