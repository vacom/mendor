import React from "react";
import styled from "styled-components/native";
import { Spinner } from 'native-base';
//Components
import { Text } from "native-base";

const LoadingContainerWithStyles = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Loading = () => {
    return (
        <LoadingContainerWithStyles>
            <Spinner style={{height: 'auto'}} color='#fff' />
            <Text style={{fontSize: 20, marginTop: 10, color: '#fff', backgroundColor: 'transparent'}}>A carregar</Text>
        </LoadingContainerWithStyles>
    );
};

export default Loading;
