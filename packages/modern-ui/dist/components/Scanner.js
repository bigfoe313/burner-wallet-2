import React, { useRef, useState, useEffect } from 'react';
import { useBurner } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import Button from './Button';
const Overlay = styled.div `
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(139, 139, 144, 0.7);
  z-index: 100;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div `
  color: rgb(0, 14, 26);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 16px;
  flex: 1;
  border-radius: 8px;
  padding: 16px;
`;
const Header = styled.h1 `
  font-size: var(--l1-fs);
  line-height: var(--l1-lh);
  font-weight: var(--l1-weight);
  margin: 0;
`;
const TextInstruction = styled.p `
  font-size: var(--l3-fs);
  line-height: var(--l3-lh);
  font-weight: var(--l3-weight);
  text-align: left;
  margin: 0px;
`;
const CameraIconContainer = styled.div `
  display: flex;
  height: 100px;
`;
const CameraIcon = styled.svg `
  flex: 1;
`;
const makeReader = (_component) => styled(_component) `
  flex: 1;
  display: flex;

  & div {
    display: none;
  }

  & section {
    padding-top: 0 !important;
    overflow: initial !important;
  }
  & video {
    object-fit: contain !important;
  }
`;
const CloseContainer = styled.div `margin-top: 20px;`;
const CloseButton = styled(Button) `
  width: 100%;
`;
const Scanner = () => {
    const reader = useRef(null);
    const [fallback, setFallback] = useState(false);
    const [Reader, setReader] = useState(null);
    const { completeScan } = useBurner();
    useEffect(() => {
        if (completeScan && !Reader) {
            import('react-qr-reader').then((module) => setReader(makeReader(module.default)));
        }
    }, [completeScan]);
    if (!completeScan) {
        return null;
    }
    return (React.createElement(Overlay, null,
        React.createElement(Container, null,
            React.createElement(Header, null, "Scan"),
            React.createElement(TextInstruction, null, fallback ? 'Upload a photo of a QR code' : 'Place the QR code within the scanner'),
            fallback && (React.createElement(CameraIconContainer, { onClick: () => reader.current.openImageDialog() },
                React.createElement(CameraIcon, { viewBox: "0 0 24 24" },
                    React.createElement("path", { fill: "#111111", d: "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" })))),
            Reader ? (React.createElement(Reader, { delay: 300, ref: reader, legacyMode: fallback, onError: (err) => {
                    console.error(err);
                    setFallback(true);
                }, onScan: (address) => {
                    if (address) {
                        completeScan(address);
                    }
                } })) : (React.createElement("div", null, "Loading..."))),
        React.createElement(CloseContainer, null,
            React.createElement(CloseButton, { onClick: () => completeScan(null) }, "Close"))));
};
export default Scanner;
//# sourceMappingURL=Scanner.js.map