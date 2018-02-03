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

const Placeholder = ({
  IconName,
  size = 42,
  fontSize = 20,
  dark = false,
  text,
  link = false,
  linkText
}) => {
  return (
    <PlaceholderContainerWithStyles>
      <MaterialIcons
        name={IconName}
        size={size}
        color={dark ? "#757575" : "#ffffff"}
        style={{ backgroundColor: "transparent" }}
      />
      <Text
        style={{
          fontSize: fontSize,
          marginTop: 10,
          color: dark ? "#757575" : "#fff",
          backgroundColor: "transparent"
        }}
      >
        {text}
      </Text>

      {link ? (
        <Text
          style={{
            fontSize: fontSize,
            marginTop: 10,
            color: dark ? "#3F53AF" : "#fff",
            backgroundColor: "transparent"
          }}
        >
          {linkText}
        </Text>
      ) : null}
    </PlaceholderContainerWithStyles>
  );
};

export default Placeholder;
