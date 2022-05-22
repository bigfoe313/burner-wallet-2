import { BurnerPluginContext, Plugin } from '@burner-wallet/types';
export default class MyPlugin implements Plugin {
    private pluginContext?;
    initializePlugin(pluginContext: BurnerPluginContext): void;
    getBlockNum(): Promise<number>;
}
