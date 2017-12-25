import React from "react";
import { ScrollView, TouchableHighlight } from "react-native";
import { Thumbnail, Button, Text, View } from "native-base";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

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
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "Conversas",
    headerRight: (
      <HeaderRightContainer>
        <HeaderRightElement>
          <MaterialIcons name="search" size={24} color="#ffffff" />
        </HeaderRightElement>
      </HeaderRightContainer>
    )
  };

  render() {
    const { navigate } = this.props.navigation;

    const _goToChatView = () => {
      navigate("ChatView");
    };

    return (
      <Container>
        <GradientContainer>
          <ScrollView style={{ paddingBottom: 30 }}>
            <TouchableHighlight onPress={_goToChatView}>
              <View>
                <Card handlePress={_goToChatView}>
                  <CardContainer>
                    <CardLeft>
                      <Thumbnail
                        style={{ width: 48, height: 48 }}
                        source={{
                          uri:
                            "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/25659784_1765573030153718_6319117596302378519_n.jpg?oh=24a6cd2344187d7f8c0e2847e673db02&oe=5ACBEF04"
                        }}
                      />
                    </CardLeft>
                    <CardBody>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          color: "#000",
                          fontWeight: "600"
                        }}
                      >
                        Flávio Amaral
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 14, color: "#757575" }}
                      >
                        Já desenhei a página de contactos. Contacta-me para te
                        mostrar
                      </Text>
                    </CardBody>
                    <CardRight>
                      <Text style={{ fontSize: 14, color: "#757575" }}>
                        12:03
                      </Text>
                    </CardRight>
                  </CardContainer>
                </Card>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={_goToChatView}>
              <View>
                <Card handlePress={_goToChatView}>
                  <CardContainer>
                    <CardLeft>
                      <Thumbnail
                        style={{ width: 48, height: 48 }}
                        source={{
                          uri:
                            "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/25498263_1521972947849794_5674696303839555748_n.jpg?oh=e027e305b330218e0780f28c2cdc1a31&oe=5ABE2638"
                        }}
                      />
                    </CardLeft>
                    <CardBody>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          color: "#000",
                          fontWeight: "600"
                        }}
                      >
                        Vitor Amaral
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 14, color: "#757575" }}
                      >
                        Relativamente ao crédito, teremos de abordar melhor essa
                        situação.
                      </Text>
                    </CardBody>
                    <CardRight>
                      <Text style={{ fontSize: 14, color: "#757575" }}>
                        12:03
                      </Text>
                    </CardRight>
                  </CardContainer>
                </Card>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={_goToChatView}>
              <View>
                <Card handlePress={_goToChatView}>
                  <CardContainer>
                    <CardLeft>
                      <Thumbnail
                        style={{ width: 48, height: 48 }}
                        source={{
                          uri:
                            "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/13627206_1379839418710828_7794737684553008176_n.jpg?oh=c9b0e09abdf973faff3e5d8a598b8a78&oe=5ACF621A"
                        }}
                      />
                    </CardLeft>
                    <CardBody>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          color: "#000",
                          fontWeight: "600"
                        }}
                      >
                        Hugo Silva
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 14, color: "#757575" }}
                      >
                        Já trataste de escrever o relatório de contas?
                      </Text>
                    </CardBody>
                    <CardRight>
                      <Text style={{ fontSize: 14, color: "#757575" }}>
                        12:03
                      </Text>
                    </CardRight>
                  </CardContainer>
                </Card>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </GradientContainer>
      </Container>
    );
  }
}

export default ChatScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
