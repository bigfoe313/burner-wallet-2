export default class HubBridge {
    constructor(url) {
        this.iframe = null;
        this.msgId = 0;
        this.url = url;
    }
    async registerWallet(name) {
        await this.ensureIFrame();
        await this.send('registerWallet', { name });
    }
    ensureIFrame() {
        if (this.iframe) {
            return Promise.resolve(this.iframe);
        }
        return new Promise((resolve) => {
            this.iframe = document.createElement('iframe');
            this.iframe.src = this.url;
            this.iframe.style.cssText = 'height:0; width:0; border:none; position: absolute';
            this.iframe.addEventListener('load', () => resolve());
            document.body.appendChild(this.iframe);
        });
    }
    send(command, props) {
        return new Promise((resolve) => {
            const id = this.msgId++;
            const listener = (e) => {
                if (e.data.id === id) {
                    window.removeEventListener('message', listener);
                    resolve(e.data.response);
                }
            };
            window.addEventListener('message', listener);
            this.iframe.contentWindow.postMessage({ command, id, ...props }, this.url);
        });
    }
}
//# sourceMappingURL=HubBridge.js.map