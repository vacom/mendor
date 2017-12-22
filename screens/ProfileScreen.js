import React from "react";
import { Content, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo';
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//Components
import { Label, LabelContainer, LabelsContainer } from "../components/Label";
import { HeaderRightContainer, HeaderRightElement } from "../components/HeaderRight";

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: "Profile",
        headerRight: (
            <HeaderRightContainer>
                <HeaderRightElement>
                    <MaterialIcons
                        name="more-vert"
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
                <Content>
                    <Grid>
                        <LinearGradient colors={['#3f51b5' , '#B39DDB']}>
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
                                        <P style={{ lineHeight: 24 }}>
                                            Estou a desenvolver um spray muito bom que limpa as unhas e brilha,
                                            e tem como objetivo limpar tudo muito bem para sempre, vale apena
                                            investir na minha ideia.
                                        </P>
                                    </Col>
                                </Row>
                            </AboutContainer>
                        </LinearGradient>

                        <LinearGradient colors={['#3f51b5' , '#B39DDB']}>
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
                            <PortfolioContainer>
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
                            </PortfolioContainer>
                        </Row>

                        <Row>
                            <PortfolioContainer>
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
                            </PortfolioContainer>
                        </Row>

                        <Row>
                            <PortfolioContainer>
                                <Span style={{ color: '#757575' }}>{'projetos'.toUpperCase()}</Span>
                                <ProjectContainer>
                                    <P style={{ color: '#000000', marginBottom: 4 }}>Bevolum Plataforma de Voluntariado</P>
                                    <Span style={{ color: '#9E9E9E', lineHeight: 22 }}>
                                        Plataforma de Voluntariado, com muitas funcionalidades de qualidade,
                                        tem como objetivo ser voluntario, e assim uma pessoaa boa e humana,
                                        porque ajudar faz parte.
                                    </Span>
                                    <LabelsContainer>
                                        <LabelContainer>
                                            <Label text="GRH"/>
                                        </LabelContainer>
                                        <LabelContainer>
                                            <Label text="Javascript"/>
                                        </LabelContainer>
                                        <LabelContainer>
                                            <Label text="Angular.js"/>
                                        </LabelContainer>
                                        <LabelContainer>
                                            <Label text="..."/>
                                        </LabelContainer>
                                    </LabelsContainer>
                                </ProjectContainer>

                                <ProjectContainer>
                                    <P style={{ color: '#000000', marginBottom: 4 }}>Bevolum Plataforma de Voluntariado</P>
                                    <Span style={{ color: '#9E9E9E', lineHeight: 22 }}>
                                        Plataforma de Voluntariado, com muitas funcionalidades de qualidade,
                                        tem como objetivo ser voluntario, e assim uma pessoaa boa e humana,
                                        porque ajudar faz parte.
                                    </Span>
                                    <LabelsContainer>
                                        <LabelContainer>
                                            <Label text="GRH"/>
                                        </LabelContainer>
                                        <LabelContainer>
                                            <Label text="Javascript"/>
                                        </LabelContainer>
                                        <LabelContainer>
                                            <Label text="Angular.js"/>
                                        </LabelContainer>
                                        <LabelContainer>
                                            <Label text="..."/>
                                        </LabelContainer>
                                    </LabelsContainer>
                                </ProjectContainer>
                            </PortfolioContainer>
                        </Row>

                        <ContactContainer>
                            <Span style={{ color: '#757575' }}>{'contactos'.toUpperCase()}</Span>
                            <LinksContainer>
                                <LinkContainer>
                                    <Row>
                                        <Col style={{ width: 40 }}>
                                            <MaterialCommunityIcons
                                                name="google-plus"
                                                size={24}
                                                color="#757575"
                                            />
                                        </Col>
                                        <Col>
                                            <P style={{ color: '#757575', marginTop: 4 }}>travis.zuckerberg@gmail.com</P>
                                        </Col>
                                    </Row>
                                </LinkContainer>
                                <LinkContainer>
                                    <Row>
                                        <Col style={{ width: 40 }}>
                                            <MaterialCommunityIcons
                                                name="facebook-box"
                                                size={24}
                                                color="#757575"
                                            />
                                        </Col>
                                        <Col>
                                            <P style={{ color: '#757575', marginTop: 4 }}>http://www.facebook.com/travis</P>
                                        </Col>
                                    </Row>
                                </LinkContainer>
                                <LinkContainer>
                                    <Row>
                                        <Col style={{ width: 40 }}>
                                            <MaterialCommunityIcons
                                                name="linkedin-box"
                                                size={24}
                                                color="#757575"
                                            />
                                        </Col>
                                        <Col>
                                            <P style={{ color: '#757575', marginTop: 4 }}>http://www.linkedin.com/travis</P>
                                        </Col>
                                    </Row>
                                </LinkContainer>
                                <LinkContainer>
                                    <Row>
                                        <Col style={{ width: 40 }}>
                                            <MaterialCommunityIcons
                                                name="slack"
                                                size={24}
                                                color="#757575"
                                            />
                                        </Col>
                                        <Col>
                                            <P style={{ color: '#757575', marginTop: 4 }}>http://www.slack.com/travis</P>
                                        </Col>
                                    </Row>
                                </LinkContainer>
                                <LinkContainer>
                                    <Row>
                                        <Col style={{ width: 40 }}>
                                            <MaterialCommunityIcons
                                                name="trello"
                                                size={24}
                                                color="#757575"
                                            />
                                        </Col>
                                        <Col>
                                            <P style={{ color: '#757575', marginTop: 4 }}>http://www.trello.com/travis</P>
                                        </Col>
                                    </Row>
                                </LinkContainer>
                            </LinksContainer>
                        </ContactContainer>

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
  padding-top: 5px;
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
const PortfolioContainer = styled.View`
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
`;

/*
--Projects
*/

const ProjectContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

/*
--Contact
*/
const ContactContainer = styled.View`
  margin-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 18px;
`;

const LinksContainer = styled.View`
  margin-top: 15px;
`;

const LinkContainer = styled.View`
  margin-bottom: 12px;
`;