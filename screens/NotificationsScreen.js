import React from "react";
import { ScrollView } from "react-native";
import {Thumbnail, Button, Text} from "native-base";
import styled from "styled-components/native";
import {MaterialIcons} from "@expo/vector-icons";

//Components
import GradientContainer from "../components/GradientContainer";
import {HeaderRightContainer, HeaderRightElement} from "../components/HeaderRight";
import {Card, CardContainer, CardLeft, CardBody, CardRight} from "../components/Card";

class NotificationsScreen extends React.Component {
    static navigationOptions = {
        title: "Notificações",
        headerRight: (
            <HeaderRightContainer>
                <HeaderRightElement>
                    <MaterialIcons
                        name="search"
                        size={24}
                        color="#ffffff"
                    />
                </HeaderRightElement>
            </HeaderRightContainer>
        )
    };

    render() {
        return (
            <Container>
                <GradientContainer>
                    <ScrollView style={{paddingBottom: 30}}>

                        <Card>
                            <CardContainer>
                                <CardLeft>
                                    <Thumbnail
                                        style={{width: 48, height: 48}}
                                        source={{uri: 'https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg'}}
                                    />
                                </CardLeft>
                                <CardBody>
                                    <Text style={{fontSize: 14}}>Marta Sousa, acabou de enviar uma mensagens</Text>
                                </CardBody>
                                <CardRight>
                                    <Button small
                                            style={{backgroundColor: "#3F51B5", borderRadius: 2}}
                                    >
                                        <Text
                                            style={{
                                                lineHeight: 12,
                                                fontSize: 12,
                                                fontWeight: "600"
                                            }}
                                        >
                                            {"aceitar".toUpperCase()}
                                        </Text>
                                    </Button>
                                </CardRight>
                            </CardContainer>
                        </Card>

                        <Card>
                            <CardContainer>
                                <CardLeft>
                                    <Thumbnail
                                        style={{width: 48, height: 48}}
                                        source={{uri: 'https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg'}}
                                    />
                                </CardLeft>
                                <CardBody>
                                    <Text style={{fontSize: 14}}>Vitor Amaral enviou-te um pedido para conetar</Text>
                                </CardBody>
                                <CardRight>
                                    <MaterialIcons
                                        name="more-vert"
                                        size={24}
                                        color="#757575"
                                    />
                                </CardRight>
                            </CardContainer>
                        </Card>

                        <Card>
                            <CardContainer>
                                <CardLeft>
                                    <Thumbnail
                                        style={{width: 48, height: 48}}
                                        source={{uri: 'https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg'}}
                                    />
                                </CardLeft>
                                <CardBody>
                                    <Text style={{fontSize: 14}}>Vitor Amaral enviou-te um pedido para conetar</Text>
                                </CardBody>
                                <CardRight>
                                    <MaterialIcons
                                        name="more-vert"
                                        size={24}
                                        color="#757575"
                                    />
                                </CardRight>
                            </CardContainer>
                        </Card>

                    </ScrollView>
                </GradientContainer>
            </Container>
        );
    }
}

export default NotificationsScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;