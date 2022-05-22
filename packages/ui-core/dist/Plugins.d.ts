import { AccountSearchFn, BurnerPluginContext, BurnerPluginData, Plugin, PluginActionContext, PluginElement, PluginPage, SendData, PluginMessageListener, Translations } from '@burner-wallet/types';
export { BurnerPluginData } from '@burner-wallet/types';
import BurnerUICore from './BurnerUICore';
export declare const DEFAULT_PLUGIN_DATA: {
    pages: never[];
    buttons: {};
    elements: {};
    accountSearches: never[];
    tryHandleQR: () => boolean;
    sent: () => null;
    getAddressName: () => Promise<null>;
    startup: () => null;
};
export default class Plugins {
    private pluginData;
    private ui;
    private changeListeners;
    private qrHandlers;
    private startupListeners;
    private sentHandlers;
    private addressToNameResolvers;
    private messageListeners;
    constructor(plugins: Plugin[], ui: BurnerUICore);
    onDataChange(listener: (data: BurnerPluginData) => void): void;
    getData(): BurnerPluginData;
    getPluginContext(plugin: Plugin): BurnerPluginContext;
    setPluginData(newData: Partial<BurnerPluginData>): void;
    addPluginPage(plugin: Plugin, path: string, Component: PluginPage): void;
    addPluginButton(plugin: Plugin, position: string, title: string, path: string, options: any): {
        remove: () => void;
    };
    addPluginElement(plugin: Plugin, position: string, Component: PluginElement, options?: any): void;
    addTranslations(plugin: Plugin, translations: Translations): void;
    addAccountSearch(callback: AccountSearchFn): void;
    addMessageListener(topic: string, callback: PluginMessageListener): void;
    getAddressName(address: string): Promise<string | null>;
    tryHandleQR(qr: string, context: PluginActionContext): boolean;
    startup(context: PluginActionContext): void;
    sent(data: SendData): string | null;
}
