import { Asset } from '@burner-wallet/assets';
import { BurnerPluginContext, Plugin } from '@burner-wallet/types';
export default class LinksPlugin implements Plugin {
    private _pluginContext;
    constructor();
    initializePlugin(pluginContext: BurnerPluginContext): void;
    readonly pluginContext: BurnerPluginContext;
    getContract({ gasless }?: {
        gasless?: boolean | undefined;
    }): import("web3-eth-contract").Contract;
    send(fromAddress: string, asset: Asset, ether: string): Promise<{
        claimUrl: string;
        receipt: any;
    }>;
    getFund(claimId: string): Promise<any>;
    canClaim(claimId: string): Promise<boolean>;
    isClaimed(claimId: string): Promise<boolean>;
    signClaim(claimId: string, nonce: number, account: string, claimKey: string): {
        claimHash: string | null;
        claimSig: any;
    };
    chainClaim(claimId: string, claimKey: string, account: string): Promise<{
        receipt: any;
        amount: any;
    }>;
    relayClaim(claimId: string, claimKey: string, account: string): Promise<{
        receipt: any;
        amount: any;
    }>;
}
