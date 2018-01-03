import React from "react";
import { View, Text, Item, Label, Input } from "native-base";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View>
        <Header>
          <SearchView>
            <IconBackView>
              <MaterialIcons name="arrow-back" size={23} color="#757575" />
            </IconBackView>
            <ViewInput>
              <Input placeholder="Pesquisar"/>
            </ViewInput>
          </SearchView>
        </Header>

        <View />
      </View>
    );
  }
}

export default SearchScreen;

const Header = styled.View`
  padding: 10px;
  background-color: #3f51b5;
  height: 65px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
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
  padding: 0 15px;
`;

const ViewInput = styled.View`
  width: 80%;
`;
