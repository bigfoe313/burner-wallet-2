import Bridge from "./Bridge";
const bridgeAAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "transactionHash",
                "type": "bytes32"
            }
        ],
        "name": "AffirmationCompleted",
        "type": "event"
    }
];
const bridgeBAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "transactionHash",
                "type": "bytes32"
            }
        ],
        "name": "RelayedMessage",
        "type": "event"
    }
];
const wait = (time) => new Promise(resolve => setTimeout(resolve, time));
const TIMEOUT = 180000;
export default class XDaiBridge extends Bridge {
    constructor() {
        super({
            assetA: 'xdai',
            assetABridge: '0x7301cfa0e1756b71869e93d4e4dca5c7d0eb0aa6',
            assetB: 'dai',
            assetBBridge: '0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016'
        });
    }
    async detectExchangeBToAFinished(account, value, sendResult) {
        const asset = this.getExchange().getAsset(this.assetA);
        const web3 = asset.getWeb3();
        const contract = new web3.eth.Contract(bridgeAAbi, this.assetABridge);
        let fromBlock = await web3.eth.getBlockNumber();
        const stopTime = Date.now() + TIMEOUT;
        while (Date.now() <= stopTime) {
            const currentBlock = await web3.eth.getBlockNumber();
            const events = await contract.getPastEvents('AffirmationCompleted', {
                fromBlock,
                toBlock: currentBlock
            });
            const confirmationEvent = events.filter(event => event.returnValues.transactionHash === sendResult.txHash);
            if (confirmationEvent.length > 0) {
                return;
            }
            fromBlock = currentBlock;
            await wait(5000);
        }
    }
    async detectExchangeAToBFinished(account, value, sendResult) {
        const web3 = this.getExchange().getAsset(this.assetB).getWeb3();
        const contract = new web3.eth.Contract(bridgeBAbi, this.assetBBridge);
        let fromBlock = await web3.eth.getBlockNumber();
        const stopTime = Date.now() + TIMEOUT;
        while (Date.now() <= stopTime) {
            const currentBlock = await web3.eth.getBlockNumber();
            const events = await contract.getPastEvents('RelayedMessage', {
                fromBlock,
                toBlock: currentBlock
            });
            const confirmationEvent = events.filter(event => event.returnValues.transactionHash === sendResult.txHash);
            if (confirmationEvent.length > 0) {
                return;
            }
            fromBlock = currentBlock;
            await wait(10000);
        }
    }
}
//# sourceMappingURL=XDaiBridge.js.map