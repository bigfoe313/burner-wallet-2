import { Component } from 'react';
import { PluginPageContext } from '@burner-wallet/types';
interface ClaimPageState {
    status: 'waiting' | 'claiming' | 'complete' | 'error' | 'claimed';
    amount: string;
}
export default class ClaimPage extends Component<PluginPageContext, ClaimPageState> {
    private plugin;
    private _isMounted;
    constructor(props: PluginPageContext);
    componentDidMount(): void;
    componentDidUpdate(oldProps: PluginPageContext): void;
    componentWillUnmount(): void;
    tryToClaim(): Promise<void>;
    getXDai(): import("@burner-wallet/types").Asset;
    render(): JSX.Element;
}
export {};
