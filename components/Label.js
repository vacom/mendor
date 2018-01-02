import React from 'react';
import styled from "styled-components/native";
import {TouchableWithoutFeedback} from "react-native";

/*
-- Label Styles
*/

const LabelWithStyles = styled.View`
  background-color: ${props => props.active ? "#ffffff" : "#F5F5F5"};
  padding: 9px;
  border-radius: 20px;
  border: 1px solid ${props => props.active ? "#B39DDB" : "#F5F5F5"};
  justify-content: center;
  align-items: center;
  align-self: flex-start;
`;

const Span = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${props => props.active ? "#000000" : "#757575"};
`;

const Label = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <LabelWithStyles {...props}>
                <Span {...props}>{props.text}</Span>
            </LabelWithStyles>
        </TouchableWithoutFeedback>
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