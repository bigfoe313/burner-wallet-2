import ClaimPage from './ui/ClaimPage';
import SendLinkPage from './ui/SendLinkPage';
import linkAbi from './abis/Links.json';
const LINK_XDAI_CONTRACT_ADDRESS = '0x9971B0E163795c49cAF5DefF06C271fCd8f3Ebe9';
const LINK_XDAI_CONTRACT_CREATION_BLOCK = 2425065;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const RELAY_GAS_PRICE = 1100000000;
const getClaimUrl = (claimId, claimKey) => `${window.location.origin}/claim/${claimId}/${claimKey}`;
export default class LinksPlugin {
    constructor() {
        this._pluginContext = null;
    }
    initializePlugin(pluginContext) {
        this._pluginContext = pluginContext;
        pluginContext.addPage('/link', SendLinkPage);
        pluginContext.addPage('/claim/:claimId(0x[a-fA-F0-9]{64})/:claimKey(0x[a-fA-F0-9]{64})', ClaimPage);
        pluginContext.addButton('apps', 'Link', '/link');
    }
    get pluginContext() {
        if (!this._pluginContext) {
            throw new Error('Exchange not initialized');
        }
        return this._pluginContext;
    }
    getContract({ gasless = false } = {}) {
        const web3 = this.pluginContext.getWeb3('100', { gasless });
        const contract = new web3.eth.Contract(linkAbi, LINK_XDAI_CONTRACT_ADDRESS);
        return contract;
    }
    async send(fromAddress, asset, ether) {
        const web3 = this.pluginContext.getWeb3('100');
        const linkContract = this.getContract();
        const randomHash = web3.utils.sha3(Math.random().toString());
        const randomWallet = web3.eth.accounts.create();
        console.log(randomHash, randomWallet);
        const sig = web3.eth.accounts.sign(randomHash, randomWallet.privateKey);
        const expirationTime = 365;
        const wei = web3.utils.toWei(ether, 'ether');
        let tokenAddress = ZERO_ADDRESS;
        let value = wei;
        if (asset.address) {
            tokenAddress = asset.address;
            value = '0';
            const approvalReceipt = await asset.approve(fromAddress, LINK_XDAI_CONTRACT_ADDRESS, wei);
        }
        const receipt = await linkContract.methods
            .send(randomHash, sig.signature, tokenAddress, wei, expirationTime)
            .send({ value: wei, from: fromAddress });
        const claimUrl = getClaimUrl(randomHash, randomWallet.privateKey);
        return { claimUrl, receipt };
    }
    async getFund(claimId) {
        const linkContract = this.getContract();
        const fund = await linkContract.methods.funds(claimId).call();
        fund.nonce = fund.nonce.toNumber();
        fund.amount = fund.amount.toString();
        return fund;
    }
    async canClaim(claimId) {
        const fund = await this.getFund(claimId);
        return fund.nonce > 0 && !fund.claimed;
    }
    async isClaimed(claimId) {
        const events = await this.getContract().getPastEvents('Claimed', {
            filter: { id: claimId },
            fromBlock: LINK_XDAI_CONTRACT_CREATION_BLOCK,
        });
        return events.length >= 0;
    }
    signClaim(claimId, nonce, account, claimKey) {
        const web3 = this.pluginContext.getWeb3('100');
        const claimHash = web3.utils.soliditySha3({ type: 'bytes32', value: claimId }, { type: 'address', value: account }, { type: 'uint256', value: nonce.toString() }, { type: 'address', value: LINK_XDAI_CONTRACT_ADDRESS });
        const claimSig = web3.eth.accounts.sign(claimHash, claimKey).signature;
        return { claimHash, claimSig };
    }
    async chainClaim(claimId, claimKey, account) {
        const linkContract = this.getContract();
        const fund = await this.getFund(claimId);
        const { claimHash, claimSig } = this.signClaim(claimId, fund.nonce, account, claimKey);
        const receipt = await linkContract.methods.claim(claimId, claimSig, claimHash, account).send({ from: account });
        return { receipt, amount: fund.amount };
    }
    async relayClaim(claimId, claimKey, account) {
        const linkContract = this.getContract({ gasless: true });
        const fund = await this.getFund(claimId);
        const { claimHash, claimSig } = this.signClaim(claimId, fund.nonce, account, claimKey);
        const receipt = await linkContract.methods.claim(claimId, claimSig, claimHash, account).send({
            from: account,
            gasPrice: RELAY_GAS_PRICE,
            txfee: 12,
        });
        return { receipt, amount: fund.amount };
    }
}
//# sourceMappingURL=LinkPlugin.js.map