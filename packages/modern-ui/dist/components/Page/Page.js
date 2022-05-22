import React, { useEffect } from 'react';
import _styled from 'styled-components';
import PageTitleBar from './PageTitleBar';
import ErrorBoundary from './ErrorBoundary';
const styled = _styled;
const PageContainer = styled.main `
  margin: 0 ${props => props.theme.pageMargin} ${props => props.theme.pageMargin};
  padding: ${props => props.theme.pageMargin};
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  background: ${props => props.theme.paperBackground};

  ${({ fullscreen }) => fullscreen ? `
    position: absolute;
    top: 60px;
    left: 10px;
    right: 10px;
    bottom: 10px;
  ` : ''}
`;
const Content = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Page = ({ children, title, variant, className }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
    return (React.createElement(PageContainer, { className: className, fullscreen: variant === 'fullscreen' },
        title && React.createElement(PageTitleBar, { title: title }),
        React.createElement(Content, null,
            React.createElement(ErrorBoundary, null, children))));
};
export default Page;
//# sourceMappingURL=Page.js.map