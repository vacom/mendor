import React from "react";
//Styles
import { StyleSheet, ScrollView, Container, Image } from "react-native";
import { Text, View, Icon } from "native-base";
import styled from "styled-components/native";
import { Col, Row, Grid } from "react-native-easy-grid";

class Discussion extends React.Component {
  render() {
    const resizeMode = "center";
    return (
      <DiscussionCard>
        <Image
          style={{
            flex: 1,
            resizeMode
          }}
          source={{ uri: "../assets/images/entrepeneur.jpg" }}
        />
        <Title numberOfLines={2}>{this.props.title}</Title>
        <Desc numberOfLines={2}>{this.props.description}</Desc>
        <Footer
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Grid>
            <Col>
              <Users style={{ flex: 1, flexDirection: "row" }}>
                <ImageUser
                  source={{
                    uri:
                      "https://www.thewrap.com/wp-content/uploads/2015/11/Donald-Trump.jpg"
                  }}
                />
                <ImageUser
                  source={{
                    uri:
                      "https://www.unilad.co.uk/wp-content/uploads/2017/08/jaime-lannister-1024.jpg"
                  }}
                />
                <ImageUser
                  source={{
                    uri:
                      "https://optclean.com.br/wp-content/uploads/2017/03/Rollo.png"
                  }}
                />
              </Users>
            </Col>
            <Col>
              <Messages style={{ flex: 1, flexDirection: "row" }}>
                <NumberMessages>{this.props.messagesNumber}</NumberMessages>
                <Icon name="mail" style={{ color: "#fff", fontSize: 18 }} />
              </Messages>
            </Col>
          </Grid>
        </Footer>
      </DiscussionCard>
    );
  }
}

export default Discussion;

const DiscussionCard = styled.View`
  background: #f3b9bf;
  padding: 10px;
  margin-right: 10px;
  margin-left: 15px;
  width: 220px;
  border-radius: 3px;
  elevation: 10;
`;

const Title = styled.Text`
  font-weight: 600;
  color: white;
  font-size: 21px;
`;

const Desc = styled.Text`
  font-size: 16px;
  color: white;
  margin-top: 5px;
`;

const Users = styled.View`
  padding-left: 7px;
`;
const Footer = styled.View`
  margin-top: 10px;
`;

const ImageUser = styled.Image`
  border-radius: 50px;
  height: 25px;
  width: 25px;
  margin-left: -7px;
`;

const NumberMessages = styled.Text`
  color: white;
  font-size: 18px;
  margin-right: 3px;
`;

const Messages = styled.View`
  align-self: flex-end;
`;
