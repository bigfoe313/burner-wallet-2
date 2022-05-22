import React from 'react';
const AmountInput = ({ onChange, disabled, value, max }) => (React.createElement("div", null,
    React.createElement("input", { type: "number", onChange: (e) => onChange(e.target.value, false), disabled: disabled, value: value }),
    max && (React.createElement("button", { onClick: () => onChange(value, true) }, "Max"))));
export default AmountInput;
//# sourceMappingURL=AmountInput.js.map