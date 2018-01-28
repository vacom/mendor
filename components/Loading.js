import React from "react";
import styled from "styled-components/native";
import { Spinner } from "native-base";
//Components
import { Text } from "native-base";

const LoadingContainerWithStyles = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Loading = props => {
  const styles = {
    fontSize: 20,
    marginTop: 10,
    color: props.dark ? "#000" : "#fff",
    backgroundColor: "transparent"
  };
  return (
    <LoadingContainerWithStyles>
      <Spinner
        style={{ height: "auto" }}
        color={props.dark ? "#000" : "#fff"}
      />
      <Text style={styles}>{props.text || "A carregar..."}</Text>
    </LoadingContainerWithStyles>
  );
};

export default Loading;
