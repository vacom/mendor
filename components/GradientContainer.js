import React from 'react';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  background-color: #3F54AF;
`;

const GradientContainer = (props) => {
    return (
        <StyledView>
            <LinearGradient
                colors={['#3F54AF' , '#B39DDB']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: Dimensions.get("window").height,
                }}
            >
                {props.children}
            </LinearGradient>
        </StyledView>
    );
};

export default GradientContainer;