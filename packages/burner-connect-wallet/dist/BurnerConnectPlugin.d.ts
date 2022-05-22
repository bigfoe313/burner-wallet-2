import { Plugin } from '@burner-wallet/types';
export default class BurnerConnectPlugin implements Plugin {
    private hubUrl;
    private name;
    constructor(name: string, hubUrl?: string);
    initializePlugin(): void;
}
