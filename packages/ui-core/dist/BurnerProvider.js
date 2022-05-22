import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { DEFAULT_PLUGIN_DATA } from './Plugins';
const ZERO_ADDR = '0x0000000000000000000000000000000000000000';
const unavailable = () => { throw new Error('Unavailable'); };
export const context = React.createContext({
    actions: {
        callSigner: unavailable,
        canCallSigner: unavailable,
        navigateTo: unavailable,
        openDefaultQRScanner: unavailable,
        scanQRCode: unavailable,
        safeSetPK: unavailable,
        send: unavailable,
        setLoading: unavailable,
        getHistoryEvents: unavailable,
        onHistoryEvent: unavailable,
        removeHistoryEventListener: unavailable,
    },
    assets: [],
    accounts: [],
    defaultAccount: ZERO_ADDR,
    pluginData: DEFAULT_PLUGIN_DATA,
    burnerComponents: {},
    BurnerComponents: {},
    completeScan: null,
    loading: null,
    t: (key) => key,
});
const { Provider, Consumer } = context;
const ADDRESS_REGEX = /^(?:0x)?[0-9a-f]{40}$/i;
const PK_REGEX = /^(?:https?:\/\/[-a-z.]+\/pk#)?((?:0x)?[0-9a-f]{64})$/i;
class BurnerProvider extends Component {
    constructor(props) {
        super(props);
        this.actions = {
            canCallSigner: props.core.canCallSigner.bind(props.core),
            callSigner: props.core.callSigner.bind(props.core),
            openDefaultQRScanner: this.openDefaultQRScanner.bind(this),
            safeSetPK: (newPK) => props.history.push('/pk', { newPK }),
            scanQRCode: this.scanQRCode.bind(this),
            send: this.send.bind(this),
            navigateTo: (location, state) => Number.isInteger(location)
                ? props.history.go(location)
                : props.history.push(location, state),
            setLoading: (status) => this.setState({ loading: status }),
            getHistoryEvents: (options) => props.core.getHistoryEvents(options),
            onHistoryEvent: (cb) => props.core.onHistoryEvent(cb),
            removeHistoryEventListener: (cb) => props.core.removeHistoryEventListener(cb),
        };
        this.state = {
            accounts: [],
            completeScan: null,
            loading: null,
        };
    }
    componentDidMount() {
        this.setState({ accounts: this.props.core.getAccounts() });
        this.props.core.onAccountChange((accounts) => this.setState({ accounts }));
        this.props.pluginData.startup(this.getPluginActionContext());
    }
    getPluginActionContext() {
        return {
            actions: this.actions,
            location: this.props.location,
        };
    }
    scanQRCode() {
        return new Promise((resolve, reject) => {
            const completeScan = (result) => {
                this.setState({ completeScan: null });
                if (result) {
                    resolve(result);
                }
                else {
                    reject(new Error('User canceled'));
                }
            };
            this.setState({ completeScan });
        });
    }
    async openDefaultQRScanner() {
        const { actions } = this;
        try {
            const result = await this.scanQRCode();
            if (this.props.pluginData.tryHandleQR(result, this.getPluginActionContext())) {
                return;
            }
            else if (ADDRESS_REGEX.test(result)) {
                actions.navigateTo('/send', { to: result });
            }
            else if (PK_REGEX.test(result)) {
                const pk = PK_REGEX.exec(result)[1];
                actions.safeSetPK(pk);
            }
            else if (result.indexOf(location.origin) === 0) {
                actions.navigateTo(result.substr(location.origin.length));
            }
            else {
                console.log(`Unhandled QR code "${result}"`);
            }
        }
        catch (e) {
            if (e.message !== 'User canceled') {
                console.error(e);
            }
        }
    }
    send({ asset, ether, value, to, from, message, id }) {
        const _from = from || this.state.accounts[0];
        const _ether = (ether && ether.length > 0) || value ? ether : '0';
        this.props.history.push('/confirm', { asset, ether: _ether, value, to, from: _from, message, id });
    }
    render() {
        const { core, pluginData, children, burnerComponents, t } = this.props;
        const { accounts, completeScan, loading } = this.state;
        return (React.createElement(Provider, { value: {
                actions: this.actions,
                accounts,
                assets: core.getAssets(),
                burnerComponents,
                BurnerComponents: burnerComponents,
                completeScan,
                defaultAccount: accounts.length > 0 ? accounts[0] : ZERO_ADDR,
                pluginData,
                loading,
                t,
            } }, accounts.length > 0 && children));
    }
}
export default withTranslation()(withRouter(BurnerProvider));
export function withBurner(WrappedComponent) {
    return function BurnerHLC(props) {
        return (React.createElement(Consumer, null, (burnerContext) => React.createElement(WrappedComponent, Object.assign({}, burnerContext, props))));
    };
}
export function useBurner() {
    return useContext(context);
}
export const SubProvider = ({ children, ...props }) => {
    const value = {
        ...useBurner(),
        ...props,
    };
    return (React.createElement(Provider, { value: value }, children));
};
//# sourceMappingURL=BurnerProvider.js.map