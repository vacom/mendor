import React from "react";
import {Text, Container, Content, Form, Item, Input, Label, Fab} from "native-base";
import {Row} from "react-native-easy-grid";
import styled from "styled-components/native";
import {LinearGradient} from "expo";
import {MaterialIcons} from "@expo/vector-icons";

//Components
import { Label as MendorLabel, LabelContainer, LabelsContainer } from "../../../../components/Label";

class SkillStepScreen extends React.Component {
    static navigationOptions = {
        title: "",
    };
    state = {
        active: false,
    };

    render() {
        return (
            <ScreenContainer>
                <LinearGradient colors={["#3f51b5", "#B39DDB"]}>
                    <ContentContainer>
                        <Row style={{height: 'auto', marginBottom: 10, marginTop: 30, backgroundColor: 'transparent'}}>
                            <Text style={{fontSize: 26, fontWeight: '600', color: "#fff"}}>
                                Registar
                            </Text>
                        </Row>
                        <Row style={{height: 'auto', backgroundColor: 'transparent', marginBottom: 30}}>
                            <Text style={{
                                fontSize: 16,
                                lineHeight: 24,
                                color: '#fff',
                            }}>
                                Está quase, para terminar, selecione as areas de interesse que pretende.
                            </Text>
                        </Row>
                    </ContentContainer>
                </LinearGradient>
                <Container>
                    <Content style={{paddingLeft: 20, paddingRight: 20}}>
                        <Form style={{paddingBottom: 60, paddingTop: 30}}>
                            <Item style={{marginLeft: 0, marginBottom: 10}}>
                                <MaterialIcons
                                    name="search"
                                    size={24}
                                    color="#757575"
                                />
                                <Input placeholderTextColor="#757575" placeholder='Pesquisar areas de interesse'/>
                            </Item>
                            <LabelsContainer>
                                <LabelContainer>
                                    <MendorLabel text="Financeira" onPress={ () => this.setState({active: !this.state.active})} active={this.state.active}/>
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Gestão de Recursos Humanos" />
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Desenvolvimento Web" />
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Gestão Pessoas" />
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Gestão de equipas" />
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Tecnologias mobile" />
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Financeira" />
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Gestão de Recursos Humanos" />
                                </LabelContainer>
                                <LabelContainer>
                                    <MendorLabel text="Desenvolvimento Web" />
                                </LabelContainer>
                            </LabelsContainer>
                        </Form>
                    </Content>
                </Container>
                <Fab
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: '#3f51b5'}}
                    position="bottomRight"
                >
                    <MaterialIcons name="arrow-forward" size={24} color="#ffffff"/>
                </Fab>
            </ScreenContainer>
        );
    }
}

export default SkillStepScreen;

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;
