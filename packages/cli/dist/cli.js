#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const local_burner_1 = __importDefault(require("./local-burner"));
yargs_1.default
    .command({
    command: 'start',
    aliases: ['*', 'local-wallet'],
    describe: 'Run a Burner Wallet connected to local node',
    builder: {
        command: {
            alias: 'c',
            default: 'yarn start-wallet',
            describe: 'command to execute to start the wallet server',
        },
        rpc: {
            alias: 'r',
            default: 'http://localhost:8545',
            describe: 'RPC URL for Ganache or other node',
        },
    },
    handler: (argv) => {
        local_burner_1.default({
            command: argv.command,
            rpc: argv.rpc,
        });
    }
})
    .help()
    .argv;
process.on('unhandledRejection', e => console.error(e));
