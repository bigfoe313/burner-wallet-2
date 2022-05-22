import React, { useState, useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';
const Clipboard = ({ text, children }) => {
    const [isCopied, setIsCopied] = useState(false);
    const targetEl = useRef(null);
    const timer = useRef(0);
    useEffect(() => {
        if (targetEl.current) {
            const afterCopy = () => {
                setIsCopied(true);
                clearTimeout(timer.current);
                timer.current = window.setTimeout(() => setIsCopied(false), 1500);
            };
            const clipboard = new ClipboardJS(targetEl.current, { text: () => text });
            clipboard.on('success', () => afterCopy());
            clipboard.on('error', (e) => console.error('error: failed to copy text', e));
            return () => {
                clipboard.destroy();
                clearTimeout(timer.current);
            };
        }
    }, [targetEl.current]);
    return React.createElement("div", { ref: targetEl }, children(isCopied));
};
export default Clipboard;
//# sourceMappingURL=Clipboard.js.map