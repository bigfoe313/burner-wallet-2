const RedirectToSend = ({ match, actions, assets }) => {
    actions.send({
        to: match.params.address,
        ether: match.params.amount,
        message: match.params.message,
        asset: assets[0].id,
    });
    return null;
};
export default RedirectToSend;
//# sourceMappingURL=RedirectToSend.js.map