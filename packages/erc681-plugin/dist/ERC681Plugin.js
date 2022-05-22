import parser from './eth-parse-uri';
export default class ERC681Plugin {
    initializePlugin(pluginContext) {
        const getAsset = (network, address) => {
            const _network = network && network !== '' ? network : '1';
            const assets = pluginContext.getAssets();
            const [asset] = assets.filter(address && address !== ''
                ? asset => asset.network === _network && asset.address === address
                : asset => asset.type === 'native' && asset.network === _network);
            return asset || null;
        };
        pluginContext.onQRScanned((qr, ctx) => {
            if (qr.indexOf('ethereum:') === 0) {
                const parsed = parser(qr);
                if (parsed.targetAddress === '') {
                    return false;
                }
                const recipient = parsed.functionName !== '' ? parsed.address : parsed.targetAddress;
                const contract = parsed.functionName !== '' ? parsed.targetAddress : null;
                const asset = getAsset(parsed.chainId, contract);
                if (!asset) {
                    return false;
                }
                ctx.actions.send({
                    to: recipient,
                    value: parsed.value || parsed.uint256,
                    asset: asset.id,
                });
                return true;
            }
            return false;
        });
    }
}
//# sourceMappingURL=ERC681Plugin.js.map