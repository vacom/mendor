import React from "react";
import { Thumbnail, Button, DeckSwiper, CardItem, Card, Text, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//Components
import GradientContainer from "../components/GradientContainer";

const cards = [
    {
        name: 'Marta Sousa',
        job: 'CTO na empresa UnhasLimpas',
    },
    {
        name: 'Vitor Amaral',
        job: 'CTO na Formette',
    },
];

class DiscoverScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        return {
            title: "Descobrir",
            headerRight: <MaterialIcons
                name="person"
                size={24}
                onPress={params.goToProfile}
                color="white"
                style={{ marginRight: 20}}
            />
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({goToProfile: this._goToProfile});
    }

    _goToProfile = () => {
        this.props.navigation.navigate('Profile');
    };

    render() {
        return (
            <Container>
                <GradientContainer>

                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{elevation: 3}}>
                                <CardItem>
                                    <UserContainer>
                                        <Row style={{height: 48}}>
                                            <Col style={{width: 68}}>
                                                <Thumbnail
                                                    style={{width: 48, height: 48}}
                                                    source={{uri: 'https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg'}}
                                                />
                                            </Col>
                                            <Col>
                                                <DataContainer>
                                                    <Body>
                                                    <H1>{item.name}</H1>
                                                    <P style={{paddingTop: 1}}>{item.job}</P>
                                                    </Body>
                                                </DataContainer>
                                            </Col>
                                        </Row>
                                    </UserContainer>
                                </CardItem>
                                <CardItem cardBody>

                                </CardItem>
                                <CardItem>
                                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <Button style={{backgroundColor: '#3F51B5', borderRadius: 2}}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '600'
                                            }}>{'conectar'.toUpperCase()}</Text>
                                        </Button>
                                    </Row>
                                </CardItem>
                            </Card>
                        }
                    />


                </GradientContainer>
            </Container>
        );
    }
}

export default DiscoverScreen;

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
  color: #000;
`;

const P = styled.Text`
  font-size: 16px;
  line-height: 18px;
  color: #757575;
  font-weight: 400;
`;

const Span = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #000;
`;

const UserContainer = styled.View`
`;

/*
--Center
*/
const DataContainer = styled.View`
  padding-top: 5px;
`;

