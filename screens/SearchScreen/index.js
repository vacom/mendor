import React from "react";
import { View, Text, Input, Thumbnail } from "native-base";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import GradientContainer from "../../components/GradientContainer";
import { ScrollView, TouchableOpacity } from "react-native";
import { Placeholder } from "../../components";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../components/Card";

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Header>
          <SearchView>
            <IconBackView>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <MaterialIcons name="arrow-back" size={23} color="#757575" />
              </TouchableOpacity>
            </IconBackView>
            <ViewInput>
              <Input placeholder="Pesquisar" />
            </ViewInput>
          </SearchView>
        </Header>
        <View style={{ flex: 1 }}>
          <GradientContainer>
            <ScrollView>
            <Placeholder text="Sem Resultados" IconName="warning" />
            </ScrollView>
          </GradientContainer>
        </View>
      </Container>
    );
  }
}

export default SearchScreen;

const Container = styled.View`
  flex: 1;
`;
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
