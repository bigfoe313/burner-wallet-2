import { Component } from 'react';
import { withBurner } from '../BurnerProvider';
class AccountKeys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: null,
        };
    }
    componentDidMount() {
        this.updateKeys();
    }
    componentDidUpdate(oldProps) {
        if (this.props !== oldProps) {
            this.updateKeys();
        }
    }
    updateKeys() {
        const { account, accounts, actions } = this.props;
        if (accounts.indexOf(account) === -1 || !actions.canCallSigner('readKey', account)) {
            this.setState({ keys: null });
            return;
        }
        const keys = {
            privateKey: actions.callSigner('readKey', account),
            burnAccount: () => actions.callSigner('burn', account),
        };
        this.setState({ keys });
    }
    render() {
        return this.props.render(this.state.keys);
    }
}
export default withBurner(AccountKeys);
//# sourceMappingURL=AccountKeys.js.map