import React from "react";
import styled from "styled-components/native";
//Components
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Input } from "native-base";

const SearchInput = props => {
  return (
    <Header style={{ backgroundColor: props.color }}>
      <SearchView>
        <IconBackView>
          <TouchableOpacity
            onPress={() => {
              props.goBack();
            }}
          >
            <MaterialIcons name="arrow-back" size={23} color="#757575" />
          </TouchableOpacity>
        </IconBackView>
        <ViewInput>
          <Input
            type="text"
            placeholder={props.placeholder}
            onChangeText={text => props.handleChange(text)}
          />
        </ViewInput>
      </SearchView>
    </Header>
  );
};

export default SearchInput;

const Header = styled.View`
  padding: 10px;
  background-color: #3f51b5;
  height: 65px;
`;

const SearchView = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px;
  background-color: white;
  border-radius: 2px;
  elevation: 10;
`;

const IconBackView = styled.View`
  padding: 0px 5px 0px 0px;
`;

const ViewInput = styled.View`
  width: 80%;
`;
