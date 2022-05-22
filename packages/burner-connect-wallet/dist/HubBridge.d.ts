export default class HubBridge {
    private iframe;
    private url;
    private msgId;
    constructor(url: string);
    registerWallet(name: string): Promise<void>;
    ensureIFrame(): Promise<any>;
    send(command: string, props: any): Promise<unknown>;
}
