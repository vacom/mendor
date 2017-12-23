import React from 'react';
import styled from "styled-components/native";
import {Col, Row} from "react-native-easy-grid";

/*
-- Card Styles
*/
const CardWithStyles = styled.View`
  background-color: #ffffff;
  elevation: 3;
  margin: 10px 10px 0 10px;
  border-radius: 2px;
`;

const Card = (props) => {
    return (
        <CardWithStyles>
            {props.children}
        </CardWithStyles>
    )
};

/*
-- Card Container
*/
const CardContainerWithStyles = styled.View`
  padding: 10px;
`;

const CardContainer = (props) => {
    return (
        <CardContainerWithStyles>
            <Row>
                {props.children}
            </Row>
        </CardContainerWithStyles>
    )
};


// For notifications ETC
/*
-- Card Left
*/
const CardLeft = (props) => {
    return (
        <Col style={{width: 48, height: 48}}>
            {props.children}
        </Col>
    )
};

/*
-- Card Body
*/
const CardBody = (props) => {
    return (
        <Col style={{justifyContent: 'center', height: 48, overflow: 'hidden', paddingLeft: 10, paddingRight: 10}}>
            {props.children}
        </Col>
    )
};

/*
-- Card Right
*/
const CardRight = (props) => {
    return (
        <Col style={{justifyContent: 'center', width: 'auto'}}>
            {props.children}
        </Col>
    )
};

export { Card, CardContainer, CardLeft, CardBody, CardRight };