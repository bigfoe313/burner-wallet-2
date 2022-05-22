import { Component } from 'react';
import { Asset, PluginPageContext } from '@burner-wallet/types';
interface SendLinkPageState {
    value: string;
    asset: Asset | null;
    status: string;
    claimUrl: string;
}
export default class SendLinkPage extends Component<PluginPageContext, SendLinkPageState> {
    private plugin;
    constructor(props: PluginPageContext);
    send(): Promise<void>;
    form(): JSX.Element;
    success(): JSX.Element;
    render(): JSX.Element;
}
export {};
