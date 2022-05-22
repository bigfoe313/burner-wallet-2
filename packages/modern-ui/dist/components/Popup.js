import React, { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
const Popup = ({ anchor, children }) => {
    const [container, setContainer] = useState(null);
    useEffect(() => {
        const _container = document.createElement('div');
        document.body.appendChild(_container);
        setContainer(_container);
        return () => { document.body.removeChild(_container); };
    }, []);
    if (!anchor) {
        return null;
    }
    const { top, left, width, height } = anchor.getBoundingClientRect();
    const popup = (React.createElement("div", { style: {
            position: 'absolute',
            top: `${top + height}px`,
            left: `${left}px`,
            width: `${width}px`,
        } }, children));
    return (React.createElement(Fragment, null, container && createPortal(popup, container)));
};
export default Popup;
//# sourceMappingURL=Popup.js.map