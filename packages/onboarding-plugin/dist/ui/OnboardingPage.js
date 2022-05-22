import React, { useState } from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
const Container = styled.div `
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.background};
`;
const InnerContainer = styled.div `
  max-width: 700px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: 700px;
  margin: 0 auto;
`;
const Slides = styled.div `
  flex: 5;
  position: relative;

  & .react-swipeable-view-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
const PageWrapper = styled.div `
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Bottom = styled.div `
  flex: 1;
  display: flex;
`;
const Dots = styled.div `
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
`;
const Dot = styled.div `
  height: 14px;
  width: 14px;
  border-radius: 14px;
  background: ${props => props.active ? '#8e8e8e' : '#cacaca'};
  display: inline-block;
  margin: 0 8px;
`;
const Col = styled.div `
  flex: ${props => props.width || 1};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OnboardingPage = ({ plugin, BurnerComponents, actions }) => {
    const [pageNum, setPage] = useState(0);
    const complete = () => {
        plugin.complete();
        actions.navigateTo('/');
    };
    const { Button } = BurnerComponents;
    return (React.createElement(Container, null,
        React.createElement(InnerContainer, null,
            React.createElement(Slides, null,
                React.createElement(SwipeableViews, { onChangeIndex: (index) => setPage(index), index: pageNum }, plugin.slides.map((page, index) => (React.createElement(PageWrapper, { key: index }, page)))),
                React.createElement(Dots, null, plugin.slides.map((page, index) => (React.createElement(Dot, { key: index, active: index === pageNum }))))),
            React.createElement(Bottom, null,
                plugin.showArrowButtons && (React.createElement(Col, null, pageNum > 0 && (React.createElement(Button, { onClick: () => setPage(pageNum - 1) }, "Back")))),
                React.createElement(Col, { width: 2 }, (plugin.alwaysShowSkip || pageNum === plugin.slides.length - 1) && (React.createElement(Button, { onClick: complete }, "Get Started"))),
                plugin.showArrowButtons && (React.createElement(Col, null, pageNum < plugin.slides.length - 1 && (React.createElement(Button, { onClick: () => setPage(pageNum + 1) }, "Next"))))))));
};
export default OnboardingPage;
//# sourceMappingURL=OnboardingPage.js.map