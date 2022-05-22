import React, { Component } from 'react';
export default class ClaimPage extends Component {
    constructor(props) {
        super(props);
        this.plugin = props.plugin;
        this._isMounted = true;
        this.state = {
            status: 'waiting',
            amount: '',
        };
    }
    componentDidMount() {
        this.tryToClaim();
    }
    componentDidUpdate(oldProps) {
        if (oldProps !== this.props && this.state.status === 'waiting') {
            this.tryToClaim();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    async tryToClaim() {
        const { match, accounts } = this.props;
        const { claimId, claimKey } = match.params;
        if (accounts.length === 0) {
            return;
        }
        const account = accounts[0];
        this.setState({ status: 'claiming' });
        if (await this.plugin.canClaim(claimId)) {
            const balance = await this.getXDai().getDisplayBalance(account);
            if (+balance < 0.005) {
                console.log('Insuficent funds, claiming using relay');
                const { receipt, amount } = await this.plugin.relayClaim(claimId, claimKey, account);
                this.setState({ status: 'complete', amount });
            }
            else {
                console.log('Sufficent funds, claiming with normal transaction');
                const { receipt, amount } = await this.plugin.chainClaim(claimId, claimKey, account);
                this.setState({ status: 'complete', amount });
            }
        }
        else {
            if (await this.plugin.isClaimed(claimId)) {
                this.setState({ status: 'claimed' });
            }
            if (this._isMounted && this.state.status === 'claiming') {
                console.log('Can\'t claim, waiting');
                setTimeout(() => this.tryToClaim(), 1500);
            }
        }
    }
    getXDai() {
        for (const asset of this.props.assets) {
            if (asset.id === 'xdai') {
                return asset;
            }
        }
        throw new Error('Could not find xDai asset');
    }
    render() {
        const { status, amount } = this.state;
        const { burnerComponents, history } = this.props;
        const { Page } = burnerComponents;
        return (React.createElement(Page, { title: "Claim Link" },
            status === 'claiming' && 'Claiming...',
            status === 'claimed' && (React.createElement("div", null,
                React.createElement("div", null, "This link has already been claimed"),
                React.createElement("div", null,
                    React.createElement("button", { onClick: () => history.push('/') }, "Home")))),
            status === 'complete' && (React.createElement("div", null,
                React.createElement("div", null, "Success!"),
                React.createElement("div", null,
                    "You have redeemed ",
                    this.getXDai().getUSDValue(amount),
                    " from this link"),
                React.createElement("button", { onClick: () => history.push('/') }, "Home")))));
    }
}
//# sourceMappingURL=ClaimPage.js.map