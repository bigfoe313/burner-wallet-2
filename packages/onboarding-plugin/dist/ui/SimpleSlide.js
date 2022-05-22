import React from 'react';
import styled from 'styled-components';
const Slide = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15%;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.div `
  font-size: 36px;
`;
const Image = styled.div `
  background-image: url('${props => props.url}');
  width: 100%;
  flex: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 20px 0;
`;
const Subtitle = styled.div `
  font-size: 24px;
`;
const SimpleSlide = ({ title, subtitle, image }) => {
    return (React.createElement(Slide, null,
        React.createElement(Title, null, title),
        React.createElement(Image, { url: image }),
        React.createElement(Subtitle, null, subtitle)));
};
export default SimpleSlide;
//# sourceMappingURL=SimpleSlide.js.map