import React, { Fragment, useEffect, useState } from 'react';
import { withBurner } from '../BurnerProvider';
const AddressName = ({ address, render, pluginData }) => {
    const [name, setName] = useState(null);
    useEffect(() => {
        pluginData.getAddressName(address).then((name) => setName(name));
    }, [address]);
    return (React.createElement(Fragment, null, render(name, address)));
};
export default withBurner(AddressName);
//# sourceMappingURL=AddressName.js.map