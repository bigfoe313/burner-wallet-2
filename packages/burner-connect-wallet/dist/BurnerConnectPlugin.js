import HubBridge from './HubBridge';
export default class BurnerConnectPlugin {
    constructor(name, hubUrl = 'https://burnerconnect.xyz/') {
        this.hubUrl = hubUrl;
        this.name = name;
    }
    initializePlugin() {
        const hub = new HubBridge(this.hubUrl);
        hub.registerWallet(this.name);
    }
}
//# sourceMappingURL=BurnerConnectPlugin.js.map