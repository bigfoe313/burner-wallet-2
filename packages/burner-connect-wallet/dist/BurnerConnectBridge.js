import './loaderDefs';
import 'file-loader?name=burnerconnect-bridge.html!./burnerconnect-bridge.html';
import 'file-loader?name=burnerconnect-login.html!./burnerconnect-login.html';
const serializeAsset = (asset) => ({
    id: asset.id,
    name: asset.name,
    network: asset.network,
    type: asset.type,
    icon: asset.icon,
    address: asset.address || null,
});
if (window.opener && window.opener.origin === window.origin) {
    window.opener.postMessage({ localStorage: { ...localStorage } }, window.origin);
}
const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
export default class BunerConnectBridge {
    constructor(core) {
        this.core = core;
        window.addEventListener('message', async (event) => {
            const response = await this.handleMessage(event.data);
            console.log('got', event.data, 'responding', response);
            if (response) {
                event.source.postMessage({ response, id: event.data.id }, event.origin);
            }
        });
        core.onAccountChange((accounts) => {
            window.parent.postMessage({ message: 'accountsChanged', accounts }, '*');
        });
        if (window.parent) {
            window.parent.postMessage({ message: 'frameLoaded' }, '*');
        }
    }
    handleMessage({ command, params, id }) {
        switch (command) {
            case 'send':
                return this.send(id, params);
            case 'getAssets':
                return this.core.getAssets().map(serializeAsset);
            case 'requiresPopup':
                return isSafari;
            case 'popup':
                return this.awaitPopup();
            default:
                if (command) {
                    console.error(`Unknown command ${command}`);
                }
        }
    }
    send(id, { jsonrpc, network, method, params }) {
        return new Promise((resolve, reject) => {
            const provider = this.core.getProvider(network);
            provider.sendAsync({ jsonrpc, id, method, params }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    awaitPopup() {
        return new Promise((resolve) => {
            const content = document.querySelector('#content');
            content.innerHTML = '';
            const button = document.createElement('button');
            button.innerText = 'Connect';
            content.appendChild(button);
            button.addEventListener('click', () => {
                let popup = null;
                const listener = (e) => {
                    if (e.data.localStorage) {
                        console.log('Got localstorage', e.data.localStorage);
                        this.batchSetLocalstorage(e.data.localStorage);
                        popup.close();
                        resolve({ success: true });
                        window.removeEventListener('message', listener);
                    }
                };
                window.addEventListener('message', listener);
                popup = window.open(window.location.href, '_blank');
            });
            window.parent.postMessage({
                message: 'setSize',
                height: document.body.clientHeight,
            }, '*');
        });
    }
    batchSetLocalstorage(storage) {
        for (const key in storage) {
            window.localStorage.setItem(key, storage[key]);
        }
    }
}
//# sourceMappingURL=BurnerConnectBridge.js.map