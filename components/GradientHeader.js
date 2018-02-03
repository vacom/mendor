import React from "react";
//components
import { Text } from "native-base";
import { Row } from "react-native-easy-grid";
import { LinearGradient } from "expo";
//Styles
import styled from "styled-components/native";

const ContentContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;

const GradientHeader = ({title, text}) => {
  return (
    <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
      <ContentContainer>
        <Row
          style={{
            height: "auto",
            marginBottom: 10,
            marginTop: 30,
            backgroundColor: "transparent"
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: "600", color: "#fff" }}>
            {title}
          </Text>
        </Row>
        <Row
          style={{
            height: "auto",
            backgroundColor: "transparent",
            marginBottom: 30
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#fff"
            }}
          >
            {text}
          </Text>
        </Row>
      </ContentContainer>
    </LinearGradient>
  );
};

export default GradientHeader;
