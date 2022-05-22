import Bridge from "./Bridge";
export default class XDaiBridge extends Bridge {
    constructor();
    detectExchangeBToAFinished(account: string, value: string, sendResult: any): Promise<void>;
    detectExchangeAToBFinished(account: string, value: string, sendResult: any): Promise<void>;
}
