import React, { Component } from 'react';
import { Asset } from '@burner-wallet/types';
import BurnerCore from '@burner-wallet/core';
import './i18n';
import { BurnerPluginData } from './Plugins';
import { Plugin, BurnerUIComponents, Page } from '@burner-wallet/types';
declare type RouterType = 'browser' | 'hash' | 'memory';
interface BurnerUIProps {
    core: BurnerCore;
    plugins?: any[];
    title?: string;
    theme?: any;
    router?: RouterType;
}
interface BurnerUIState {
    pluginData: BurnerPluginData;
}
export default abstract class BurnerUICore extends Component<BurnerUIProps, BurnerUIState> {
    private plugins;
    private _burnerComponents;
    static defaultProps: {
        plugins: never[];
        router: string;
    };
    constructor(props: BurnerUIProps);
    abstract content(): React.ReactNode;
    abstract getPages(): Page[];
    abstract burnerComponents(): BurnerUIComponents;
    getInternalPlugins(): Plugin[];
    componentDidMount(): void;
    getCore(): BurnerCore;
    getAssets(): Asset[];
    router(): JSX.Element;
    render(): JSX.Element;
}
export {};
