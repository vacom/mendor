import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
//Components
import { Text } from "native-base";

const PlaceholderContainerWithStyles = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Placeholder = (props) => {
  return (
    <PlaceholderContainerWithStyles>
        <MaterialIcons name={props.IconName} size={42} color="#ffffff" style={{backgroundColor: 'transparent'}}/>
        <Text style={{fontSize: 20, marginTop: 10, color: '#fff', backgroundColor: 'transparent'}}>{props.text}</Text>
    </PlaceholderContainerWithStyles>
  );
};

export default Placeholder;
