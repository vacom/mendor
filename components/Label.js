import React from 'react';
import styled from "styled-components/native";


const Label = (props) => {
    return (
        <LabelContainer>
            <Span>{props.text}</Span>
        </LabelContainer>
    )
};

export default Label;

const LabelContainer = styled.View`
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