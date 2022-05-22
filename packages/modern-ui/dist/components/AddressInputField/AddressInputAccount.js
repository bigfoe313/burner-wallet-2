import React from 'react';
import styled from 'styled-components';
const StyledAccount = styled.div `
  display: flex;
  flex: 1 0;
  padding: 8px;
  cursor: default;
  overflow: hidden;
  background: hsla(0, 0%, 100%, 0.25);
  border-radius: 8px;
  align-items: center;
`;
const StyledAvatar = styled.div `
  height: 30px;
  width: 30px;
  background-size: cover;
`;
const StyledNames = styled.div `
  flex: 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;
const StyledTitle = styled.div `
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const StyledSubtitle = styled.div `
  color: #555555;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const AddressInputAccount = ({ account }) => (React.createElement(StyledAccount, null,
    account.picture && React.createElement(StyledAvatar, { style: { backgroundImage: `url("${account.picture}")` } }),
    React.createElement(StyledNames, null,
        React.createElement(StyledTitle, null, account.name || account.address),
        account.name && React.createElement(StyledSubtitle, null, account.address))));
export default AddressInputAccount;
//# sourceMappingURL=AddressInputAccount.js.map