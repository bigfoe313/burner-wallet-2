import React, { ReactNode } from 'react';
interface ClipboardProps {
    text: string;
    children: (isCopied: boolean) => ReactNode;
}
declare const Clipboard: React.FC<ClipboardProps>;
export default Clipboard;
