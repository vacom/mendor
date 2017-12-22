import React from 'react';
import styled from "styled-components/native";

/*
-- Label Styles
*/

const LabelWithStyles = styled.View`
  background-color: #F5F5F5;
  padding: 10px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
`;

const Span = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #757575;
`;

const Label = (props) => {
    return (
        <LabelWithStyles>
            <Span>{props.text}</Span>
        </LabelWithStyles>
    )
};

/*
-- Label Container
*/

const LabelContainerWithStyles = styled.View`
  margin-right: 8px;
  margin-top: 8px;
`;

const LabelContainer = (props) => {
    return (
        <LabelContainerWithStyles>
            {props.children}
        </LabelContainerWithStyles>
    )
};

/*
-- Labels Container
*/

const LabelsContainerWithStyles = styled.View`
  margin-top: 7px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LabelsContainer = (props) => {
    return (
        <LabelsContainerWithStyles>
            {props.children}
        </LabelsContainerWithStyles>
    )
};

export { Label, LabelContainer, LabelsContainer };