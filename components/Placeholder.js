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

const Placeholder = props => {
  const styles = {
    fontSize: 20,
    marginTop: 10,
    color: props.dark ? "#000" : "#fff",
    backgroundColor: "transparent"
  };
  return (
    <PlaceholderContainerWithStyles>
      <MaterialIcons
        name={props.IconName}
        size={42}
        color={props.dark ? "#000" : "#ffffff"}
        style={{ backgroundColor: "transparent" }}
      />
      <Text style={styles}>{props.text}</Text>
    </PlaceholderContainerWithStyles>
  );
};

export default Placeholder;
