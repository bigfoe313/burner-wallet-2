import React from 'react';
import styled from 'styled-components';
const Line = styled.div `
  margin: 8px 0;
`;
const TextLineName = styled.div `
  font-size: 18;
  font-weight: bold;
`;
const TextLineValue = styled.div `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
`;
const LineItem = ({ name, value, children }) => (React.createElement(Line, null,
    React.createElement(TextLineName, null, name),
    React.createElement(TextLineValue, null, value || children)));
export default LineItem;
//# sourceMappingURL=LineItem.js.map