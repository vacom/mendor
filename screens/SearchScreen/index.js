import React from "react";
import { View, Text, Input, Thumbnail } from "native-base";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import GradientContainer from "../../components/GradientContainer";
import { ScrollView } from "react-native";
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
              <MaterialIcons name="arrow-back" size={23} color="#757575" />
            </IconBackView>
            <ViewInput>
              <Input placeholder="Pesquisar" />
            </ViewInput>
          </SearchView>
        </Header>
        <View style={{ flex: 1 }}>
          <GradientContainer>
            <ScrollView>
              <Card>
                <CardContainer>
                  <CardLeft>
                    <Thumbnail
                      style={{ width: 48, height: 48 }}
                      source={{
                        uri:
                          "https://images.gr-assets.com/authors/1497455560p5/1285555.jpg"
                      }}
                    />
                  </CardLeft>
                  <CardBody>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#000"
                      }}
                    >
                      José Saramago
                    </Text>
                    <Text style={{ fontSize: 14, color: "#757575" }}>
                      Escritor
                    </Text>
                  </CardBody>
                  <CardRight>
                    <MaterialIcons name="more-vert" size={24} color="#757575" />
                  </CardRight>
                </CardContainer>
              </Card>
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
