import React from 'react';
interface InputBoxProps {
    value: string;
    unit: string;
    input?: boolean;
    onChange?: (val: string) => void;
}
declare const InputBox: React.FC<InputBoxProps>;
export default InputBox;
