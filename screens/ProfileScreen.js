import React from "react";
import {View} from "react-native";
import { Content, Thumbnail } from 'native-base';
import styled from "styled-components/native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo';

//Components
import Label from "../components/Label";

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: "Profile"
    };

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <LinearGradient colors={['#3F54AF' , '#B39DDB']}>
                            <AboutContainer>
                                <Row style={{ height: 48 }}>
                                    <Col style={{ width: 68 }}>
                                        <Thumbnail
                                            style={{ width: 48, height: 48 }}
                                            source={{ uri: 'https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg' }}
                                        />
                                    </Col>
                                    <Col>
                                        <DataContainer>
                                            <H1>Marta Sousa</H1>
                                            <Span style={{ paddingTop: 1, fontWeight: '600' }}>CTO na empresa UnhasLimpas</Span>
                                        </DataContainer>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ marginTop: 20 }}>
                                        <P style={{ lineHeight: 22 }}>
                                            Estou a desenvolver um spray muito bom que limpa as unhas e brilha,
                                            e tem como objetivo limpar tudo muito bem para sempre, vale apena
                                            investir na minha ideia.
                                        </P>
                                    </Col>
                                </Row>
                            </AboutContainer>
                        </LinearGradient>

                        <LinearGradient colors={['#3F54AF' , '#B39DDB']}>
                            <Row style={{ marginBottom: 1 }}>
                                <Col>
                                    <NumberContainer>
                                        <P style={{ color: '#000000' }}>15</P>
                                        <Span style={{ color: '#757575' }}>Conexões</Span>
                                    </NumberContainer>
                                </Col>
                                <Col style={{ marginRight: 1, marginLeft: 1 }}>
                                    <NumberContainer>
                                        <P style={{ color: '#000000' }}>10</P>
                                        <Span style={{ color: '#757575' }}>Recomendações</Span>
                                    </NumberContainer>
                                </Col>
                                <Col>
                                    <NumberContainer>
                                        <P style={{ color: '#000000' }}>45</P>
                                        <Span style={{ color: '#757575' }}>Discussões</Span>
                                    </NumberContainer>
                                </Col>
                            </Row>
                        </LinearGradient>

                        <Row>
                            <SkillContainer>
                                <Span style={{ color: '#757575' }}>{'competências'.toUpperCase()}</Span>
                                <LabelsContainer>
                                    <LabelContainer>
                                        <Label text="GRH"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Javascript"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Gestão de Pessoas"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Desenvolvimento Web"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Html5"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="..."/>
                                    </LabelContainer>
                                </LabelsContainer>
                            </SkillContainer>
                        </Row>

                        <Row>
                            <SkillContainer>
                                <Span style={{ color: '#757575' }}>{'tecnologias'.toUpperCase()}</Span>
                                <LabelsContainer>
                                    <LabelContainer>
                                        <Label text="GRH"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Javascript"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Gestão de Pessoas"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Desenvolvimento Web"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="Html5"/>
                                    </LabelContainer>
                                    <LabelContainer>
                                        <Label text="..."/>
                                    </LabelContainer>
                                </LabelsContainer>
                            </SkillContainer>
                        </Row>


                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

/*
--Globals
*/
const H1 = styled.Text`
  font-size: 18px;
  line-height: 20px;
  font-weight: 600;
  color: #ffffff;
`;

const P = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  font-weight: 400;
`;

const Span = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
`;

/*
--User Information Styles
*/
const AboutContainer = styled.View`
  padding: 30px 20px 30px 20px;
`;

/*
--Center
*/
const DataContainer = styled.View`
  padding-top: 4px;
`;

/*
--Numbers
*/
const NumberContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: #fff;
`;

/*
--Skills Styles
*/
const SkillContainer = styled.View`
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
`;

const LabelsContainer = styled.View`
  margin-top: 7px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LabelContainer = styled.View`
  margin-right: 8px;
  margin-top: 8px;
`;