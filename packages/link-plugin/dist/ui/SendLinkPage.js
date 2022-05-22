import React, { Component, Fragment } from 'react';
export default class SendLinkPage extends Component {
    constructor(props) {
        super(props);
        this.plugin = props.plugin;
        this.state = {
            value: '0',
            asset: null,
            status: 'waiting',
            claimUrl: '',
        };
    }
    async send() {
        const { asset, value } = this.state;
        if (!asset) {
            throw new Error('No Asset selected');
        }
        if (asset.network !== '100') {
            throw new Error(`Can not send link on network ${asset.network}`);
        }
        this.setState({ status: 'sending' });
        const { claimUrl, receipt } = await this.plugin.send(this.props.accounts[0], asset, value);
        console.log(receipt);
        this.setState({ status: 'sent', claimUrl });
    }
    form() {
        const { AssetSelector } = this.props.burnerComponents;
        const { value, asset, status } = this.state;
        const canSend = asset && asset.network === '100' && +value > 0;
        return (React.createElement(Fragment, null,
            React.createElement(AssetSelector, { selected: asset, onChange: (newAsset) => this.setState({ asset: newAsset }), network: "100" }),
            React.createElement("div", null,
                React.createElement("input", { value: value, type: "num", disabled: status === 'sending', onChange: e => this.setState({ value: e.target.value }) })),
            React.createElement("button", { disabled: !canSend || status === 'sending', onClick: () => this.send() }, "Send")));
    }
    success() {
        return (React.createElement(Fragment, null,
            React.createElement("div", null, "Sent successfully!"),
            React.createElement("div", null,
                React.createElement("input", { value: this.state.claimUrl })),
            React.createElement("button", { onClick: () => this.setState({ value: '0', status: 'waiting' }) }, "Send More")));
    }
    render() {
        const { Page } = this.props.burnerComponents;
        return (React.createElement(Page, { title: "Send with Link" }, this.state.status === 'sent' ? this.success() : this.form()));
    }
}
//# sourceMappingURL=SendLinkPage.js.map