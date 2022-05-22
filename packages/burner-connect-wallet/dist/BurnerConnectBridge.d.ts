import BurnerCore from '@burner-wallet/core';
import './loaderDefs';
import 'file-loader?name=burnerconnect-bridge.html!./burnerconnect-bridge.html';
import 'file-loader?name=burnerconnect-login.html!./burnerconnect-login.html';
interface BurnerConnectMessage {
    id: number;
    command: string;
    params: any;
}
interface SendMessage {
    jsonrpc: string;
    network: string;
    method: string;
    params: any[];
}
export default class BunerConnectBridge {
    private core;
    constructor(core: BurnerCore);
    handleMessage({ command, params, id }: BurnerConnectMessage): boolean | Promise<unknown> | {
        id: string;
        name: string;
        network: string;
        type: string | null;
        icon: string | null;
        address: any;
    }[] | undefined;
    send(id: number, { jsonrpc, network, method, params }: SendMessage): Promise<unknown>;
    awaitPopup(): Promise<unknown>;
    batchSetLocalstorage(storage: any): void;
}
export {};
