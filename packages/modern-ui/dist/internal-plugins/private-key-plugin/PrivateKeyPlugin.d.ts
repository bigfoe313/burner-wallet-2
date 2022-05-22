import { Plugin, BurnerPluginContext } from '@burner-wallet/types';
export default class PrivateKeyPlugin implements Plugin {
    id: string;
    initializePlugin(context: BurnerPluginContext): void;
}
