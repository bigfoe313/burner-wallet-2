import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link) `
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;
const CloseButton = () => (React.createElement(StyledLink, { to: "/" },
    React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("rect", { width: "3.0866", height: "19.5407", transform: "matrix(0.707104 -0.70711 0.707104 0.70711 0 2.18262)", fill: "#000" }),
        React.createElement("rect", { width: "3.0866", height: "19.5407", transform: "matrix(-0.707104 -0.70711 -0.707104 0.70711 16 2.18262)", fill: "#000" }))));
export default CloseButton;
//# sourceMappingURL=CloseButton.js.map