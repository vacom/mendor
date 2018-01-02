import React from "react";
import styled from "styled-components/native";
import GradientContainer from "../../components/GradientContainer";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header, Item, Input, Icon, Button, Text, View, Thumbnail } from 'native-base';
import {
    Card,
    CardContainer,
    CardLeft,
    CardBody,
    CardRight
  } from "../../components/Card";

class SearchScreen extends React.Component {
    static navigationOptions = {
        header: (
            <Header searchBar>
            <Item>
              <Input placeholder="José Saramago" />
            </Item>
          </Header>
        )
      };

    render() {
        return (
  
            <Container>
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
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>José Saramago</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
              </CardContainer>
            </Card>
        </ScrollView>
        </GradientContainer>
        </Container>
        )
    }
}

export default SearchScreen

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;