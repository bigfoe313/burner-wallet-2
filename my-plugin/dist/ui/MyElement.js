import React, { useEffect, useState } from 'react';
const MyElement = ({ plugin }) => {
    const [block, setBlock] = useState(null);
    const _plugin = plugin;
    useEffect(() => {
        _plugin.getBlockNum().then((num) => setBlock(num));
    }, []);
    return (React.createElement("div", null,
        React.createElement("div", null, "Injected plugin element"),
        block && (React.createElement("div", null,
            "Current block number: ",
            block))));
};
export default MyElement;
//# sourceMappingURL=MyElement.js.map