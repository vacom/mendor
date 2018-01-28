import React from "react";
import styled from "styled-components/native";
//Components
import GradientContainer from "../../components/GradientContainer";
import { View } from "native-base";

const SearchContent = props => {
  return (
    <View style={{ flex: 1 }}>
      <GradientContainer>{props.children}</GradientContainer>
    </View>
  );
};

export default SearchContent;
