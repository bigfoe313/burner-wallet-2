import MyPage from './ui/MyPage';
import MyElement from './ui/MyElement';
export default class MyPlugin {
    initializePlugin(pluginContext) {
        this.pluginContext = pluginContext;
        pluginContext.addPage('/my-page', MyPage);
        pluginContext.addButton('apps', 'A-Cash Exchange', '/my-page', {
            description: 'Convert between Ethereum and A-Cash | Put A-Cash on Debit Card',
        });
        pluginContext.addElement('home-middle', MyElement);
        pluginContext.onQRScanned((scannedQR, ctx) => {
            if (scannedQR === 'A-Cash Exchange') {
                ctx.actions.navigateTo('/my-page');
                return true;
            }
        });
    }
    async getBlockNum() {
        const assets = this.pluginContext.getAssets();
        const web3 = this.pluginContext.getWeb3(assets[0].network);
        const blockNum = web3.eth.getBlockNumber();
        return blockNum;
    }
}
//# sourceMappingURL=MyPlugin.js.map