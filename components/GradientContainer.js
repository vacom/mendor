import React from "react";
import { LinearGradient } from "expo";
import styled from "styled-components/native";

const StyledView = styled.View`
  flex: 1;
  background-color: #3f54af;
`;

const GradientContainer = props => {
  return (
    <StyledView {...props}>
      <LinearGradient
        colors={["#3F54AF", "#B39DDB"]}
        style={{
          flex: 1
        }}
      >
        {props.children}
      </LinearGradient>
    </StyledView>
  );
};

export default GradientContainer;
