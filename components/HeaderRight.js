import React from "react";
import styled from "styled-components/native";

/*
-- HeaderRightContainer Styles
*/

const HeaderRightContainerWithStyles = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const HeaderRightContainer = props => {
  return (
    <HeaderRightContainerWithStyles>
      {props.children}
    </HeaderRightContainerWithStyles>
  );
};

/*
-- HeaderRightElement Styles
*/

const HeaderRightElementWithStyles = styled.View`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 20px;
`;

const HeaderRightElement = props => {
  return (
    <HeaderRightElementWithStyles>
      {props.children}
    </HeaderRightElementWithStyles>
  );
};

export { HeaderRightContainer, HeaderRightElement };
