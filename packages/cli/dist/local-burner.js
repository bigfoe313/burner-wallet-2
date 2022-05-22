"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const web3_1 = __importDefault(require("web3"));
const lib_1 = require("./lib");
const ethereumjs_util_1 = require("ethereumjs-util");
const string_argv_1 = require("string-argv");
const PK_USER = '0xecb2222da7cbca080201acf6a7bbda53a3b2bcb22e3004b83ab8c69a884becb9';
const DEPLOYER_PK = '0x13179885a8731284475aa2317a35a292131772bb5aa33734a1290b8b13944409';
const DEPLOYER_ADDRESS = ethereumjs_util_1.bufferToHex(ethereumjs_util_1.privateToAddress(ethereumjs_util_1.toBuffer(DEPLOYER_PK)));
const ERC20_ADDRESS = ethereumjs_util_1.bufferToHex(ethereumjs_util_1.generateAddress(ethereumjs_util_1.toBuffer(DEPLOYER_ADDRESS), ethereumjs_util_1.toBuffer('0x0')));
const getAccount = (web3) => __awaiter(this, void 0, void 0, function* () {
    const [defaultAccount] = yield web3.eth.getAccounts();
    if (!defaultAccount) {
        throw new Error('Can not find an unlocked account');
    }
    return defaultAccount;
});
function startLocalWallet(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield lib_1.testRPC(options.rpc))) {
            throw new Error('Ganache not found on port 8545');
        }
        const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(options.rpc));
        const user = web3.eth.accounts.privateKeyToAccount(PK_USER);
        const deployer = web3.eth.accounts.privateKeyToAccount(DEPLOYER_PK);
        const balance = yield web3.eth.getBalance(user.address);
        console.log(`Test ETH Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        if (balance === '0') {
            const defaultAccount = yield getAccount(web3);
            console.log(`Sending 1 ETH from ${defaultAccount} to ${user.address}`);
            yield web3.eth.sendTransaction({
                from: defaultAccount,
                to: user.address,
                value: web3.utils.toWei('1', 'ether'),
            });
        }
        const collectableCode = yield web3.eth.getCode(ERC20_ADDRESS);
        if (collectableCode === '0x') {
            console.log('ERC20 contract not found, deploying');
            const defaultAccount = yield getAccount(web3);
            yield web3.eth.sendTransaction({
                from: defaultAccount,
                to: deployer.address,
                value: web3.utils.toWei('.2', 'ether'),
            });
            // Deploy ERC20
            const erc20Bytecode = fs_1.default.readFileSync(`${__dirname}/../bytecode/ERC20.txt`, 'utf8');
            const { rawTransaction: deployTx } = yield deployer.signTransaction({
                gas: '5000000',
                data: erc20Bytecode,
            });
            yield web3.eth.sendSignedTransaction(deployTx);
            // Transfer tokens to user
            console.log('Transfering test tokens');
            const { rawTransaction: transferTx } = yield deployer.signTransaction({
                to: ERC20_ADDRESS,
                gas: '5000000',
                data: `0xa9059cbb000000000000000000000000${user.address.substr(2)}0000000000000000000000000000000000000000000000056bc75e2d63100000`,
            });
            yield web3.eth.sendSignedTransaction(transferTx);
        }
        const [cmd, ...args] = string_argv_1.parseArgsStringToArgv(options.command);
        child_process_1.spawn(cmd, args, {
            env: Object.assign({}, process.env, { REACT_APP_PK: PK_USER, REACT_APP_ERC20_ADDRESS: ERC20_ADDRESS }),
            stdio: 'inherit',
        });
    });
}
exports.default = startLocalWallet;
