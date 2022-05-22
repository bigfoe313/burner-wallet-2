import React from 'react';
interface ExchangeInputProps {
    input: string;
    output: string;
    inputUnit: string;
    outputUnit: string;
    onChange: (val: string) => void;
    disabled?: boolean;
}
declare const ExchangeInput: React.FC<ExchangeInputProps>;
export default ExchangeInput;
