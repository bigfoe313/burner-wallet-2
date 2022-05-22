import { BurnerPluginContext, Plugin } from '@burner-wallet/types';
export default class ENSPlugin implements Plugin {
    private ensCache;
    private reverseCache;
    private ens;
    private network;
    constructor(network?: string);
    initializePlugin(pluginContext: BurnerPluginContext): void;
    lookupName(address: string): Promise<any>;
    ensSearch(search: string): Promise<{
        name: string;
        address: any;
    }[]>;
}
