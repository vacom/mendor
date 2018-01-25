import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Card as NativeBaseCard } from "native-base";
import styled from "styled-components/native";
import { Col, Row } from "react-native-easy-grid";

/*
-- Card Styles
*/
const Card = props => {
  return (
    <TouchableWithoutFeedback {...props}>
      <NativeBaseCard
          style={{
              backgroundColor: "#ffffff",
              marginTop: 5,
              marginRight: 10,
              marginLeft: 10,
              marginBottom: 5,
              borderRadius: 2
          }}>{props.children}</NativeBaseCard>
    </TouchableWithoutFeedback>
  );
};

/*
-- Card Container
*/
const CardContainerWithStyles = styled.View`
  padding: 10px;
`;

const CardContainer = props => {
  return (
    <CardContainerWithStyles>
      <Row>{props.children}</Row>
    </CardContainerWithStyles>
  );
};

// For notifications ETC
/*
-- Card Left
*/
const CardLeft = props => {
  return <Col style={{ width: "auto", height: 48, backgroundColor: "pink" }}>{props.children}</Col>;
};

/*
-- Card Body
*/
const CardBody = props => {
  return (
    <Col
      style={{
        justifyContent: "center",
        height: 48,
        overflow: "hidden",
        paddingLeft: 10,
        paddingRight: 10
      }}
    >
      {props.children}
    </Col>
  );
};

/*
-- Card Right
*/
const CardRight = props => {
  return (
    <Col style={{ justifyContent: "center", width: "auto" }}>
      {props.children}
    </Col>
  );
};

export { Card, CardContainer, CardLeft, CardBody, CardRight };
