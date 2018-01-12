import React from "react";
import {Text, Container, Content, Form, Item, Input, Label, Button} from "native-base";
import {Row} from "react-native-easy-grid";
import styled from "styled-components/native";
import {LinearGradient} from "expo";
import {MaterialIcons} from "@expo/vector-icons";

//Components
import {
    HeaderRightContainer,
    HeaderRightElement
} from "../../../components/HeaderRight";

class ProfileStepScreen extends React.Component {
    static navigationOptions = {
        title: "Editar Perfil",
        headerRight: (
            <HeaderRightContainer>
                <HeaderRightElement>
                    <MaterialIcons
                        name="save"
                        size={24}
                        color="#ffffff"
                    />
                </HeaderRightElement>
            </HeaderRightContainer>
        )
    };

    render() {
        return (
            <ScreenContainer>
                <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
                    <ContentContainer>
                        <DashedContainer>
                            <Row style={{height: 'auto', backgroundColor: 'transparent'}}>
                                <MaterialIcons
                                    name="file-upload"
                                    size={42}
                                    color="#ffffff"
                                />
                            </Row>
                            <Row style={{height: 'auto', marginBottom: 15, marginTop: 6, backgroundColor: 'transparent'}}>
                                <Text style={{fontSize: 16, fontWeight: '400', color: "#fff"}}>
                                    Carregar foto de perfil
                                </Text>
                            </Row>
                            <Row style={{height: 'auto', backgroundColor: 'transparent'}}>
                                <Button
                                    style={{backgroundColor: "#3F51B5", borderRadius: 2}}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "600"
                                        }}
                                    >
                                        {"carregar".toUpperCase()}
                                    </Text>
                                </Button>
                            </Row>
                        </DashedContainer>
                    </ContentContainer>
                </LinearGradient>
                <Container>
                    <Content style={{paddingLeft: 20, paddingRight: 20}}>
                        <Form style={{paddingBottom: 60}}>
                            <Item style={{marginLeft: 0}} floatingLabel>
                                <Label style={{color: '#757575'}}>Nome</Label>
                                <Input/>
                            </Item>
                            <Item style={{marginLeft: 0}} floatingLabel>
                                <Label style={{color: '#757575'}}>Empresa</Label>
                                <Input/>
                            </Item>
                            <Item style={{marginLeft: 0}} floatingLabel>
                                <Label style={{color: '#757575'}}>Profissão</Label>
                                <Input/>
                            </Item>
                            <Item style={{marginLeft: 0}} floatingLabel>
                                <Label style={{color: '#757575'}}>Sobre mim/Ideia</Label>
                                <Input/>
                            </Item>
                        </Form>
                    </Content>
                </Container>
            </ScreenContainer>
        );
    }
}

export default ProfileStepScreen;

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  margin: 30px;
`;

const DashedContainer = styled.View`
  padding: 30px;
  border: 1px dashed #ffffff;
  align-items: center;
  border-radius: 6px;
`;