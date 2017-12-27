import React from "react";
import { ScrollView } from "react-native";
import { Thumbnail, Button, Text, StyleSheet } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header, Content, Tab, Tabs } from 'native-base';

//Components
import GradientContainer from "../../components/GradientContainer";
import {
  HeaderRightContainer,
  HeaderRightElement
} from "../../components/HeaderRight";
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../components/Card";

class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: "Contactos",
    headerRight: (
      <HeaderRightContainer>
        <HeaderRightElement>
          <MaterialIcons name="search" size={24} color="#ffffff" />
        </HeaderRightElement>
      </HeaderRightContainer>
    )
  };

  render() {
    return (
      <Container>
        <GradientContainer>


          <ScrollView>
          <ScrollView style={{ paddingBottom: 140 }}>
            <Card>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={{
                      uri:
                        "https://images.wook.pt/getresourcesservlet/GetResource?+4Hu1d+XFcIbRCL+rns/dPLJIyl/ptUmguQ7wc4aH8s="
                    }}
                  />
                </CardLeft>
                <CardBody>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Eça de Queiroz</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
              </CardContainer>
            </Card>

            <Card>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={{
                      uri:
                        "http://www.citador.pt/images/autorid00334.jpg"
                    }}
                  />
                </CardLeft>
                <CardBody>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Fernando Pessoa</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
              </CardContainer>
            </Card>

            <Card>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={{
                      uri:
                        "http://www.revistaestante.fnac.pt/wp-content/uploads/2017/06/cam%C3%B5es-portugal-revista-estante-fnac.jpg"
                    }}
                  />
                </CardLeft>
                <CardBody>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Luís de Camões</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
              </CardContainer>
            </Card>

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

            <Card>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={{
                      uri:
                        "https://images.wook.pt/getresourcesservlet/GetResource?v2QDfMZIy1hbtNhb625PLd1y/jFDthOp5/mBVQIkC6w="
                    }}
                  />
                </CardLeft>
                <CardBody>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Miguel Torga</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
              </CardContainer>
            </Card>

            <Card>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={{
                      uri:
                        "http://www.revistaestante.fnac.pt/wp-content/uploads/2016/03/raul-brandao-revista-estante-fnac.jpg"
                    }}
                  />
                </CardLeft>
                <CardBody>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Raúl Brandão</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
              </CardContainer>
            </Card>

            <Card>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={{
                      uri:
                        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Picture_of_Florbela_Espanca.jpg"
                    }}
                  />
                </CardLeft>
                <CardBody>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Florbela Espanca</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
              </CardContainer>
            </Card>

            <Card>
              <CardContainer>
                <CardLeft>
                  <Thumbnail
                    style={{ width: 48, height: 48 }}
                    source={{
                      uri:
                        "http://www.citador.pt/images/autorid20127.jpg"
                    }}
                  />
                </CardLeft>
                <CardBody>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Antero de Quental</Text>
                  <Text style={{ fontSize: 14, color: "#757575" }}>Escritor</Text>
                </CardBody>
               
                <CardRight>
                  <MaterialIcons name="more-vert" size={24} color="#757575" />
                </CardRight>
                </CardContainer>
            </Card>

          </ScrollView>
          </ScrollView>
        </GradientContainer>
      </Container>
    );
  }
}

export default ContactsScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

