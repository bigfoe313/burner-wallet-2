import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Popup from './Popup';
const DropdownContainer = styled.div `
  background: #e1deff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 8px;
  height: 40px;
  cursor: default;

  &:hover {
    background: #d1ccfc;
  }

  &:after {
    content: '\\25be';
    margin: 4px;
    color: #555;
    display: block;
  }

  ${props => props.open && `
    background: #d1ccfc;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;
const DropdownPopup = styled.div `
  background: #e1deff;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  overflow: hidden;
`;
const ItemContainer = styled.div `
  padding: 8px;
  cursor: default;
  &:hover {
    background: #d1ccfc;
  }
`;
const Dropdown = ({ options, selected, onChange, disabled, itemComponent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const anchor = useRef(null);
    const ItemComponent = itemComponent;
    useEffect(() => {
        if (isOpen) {
            const clickListener = () => setIsOpen(false);
            document.addEventListener('click', clickListener);
            return () => document.removeEventListener('click', clickListener);
        }
    }, [isOpen]);
    return (React.createElement(Fragment, null,
        React.createElement(DropdownContainer, { ref: anchor, onClick: (e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
            }, open: isOpen }, selected && (React.createElement(ItemComponent, { item: selected }))),
        isOpen && !disabled && (React.createElement(Popup, { anchor: anchor.current },
            React.createElement(DropdownPopup, null, options.map((option, i) => (React.createElement(ItemContainer, { key: i, onClick: () => onChange(option) },
                React.createElement(ItemComponent, { item: option })))))))));
};
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map