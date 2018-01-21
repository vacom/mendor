import React from "react";
import { Image } from "react-native";
import { Icon, View } from "native-base";
import styled from "styled-components/native";
//GraphQL
import { GET_AVATAR_URL } from "../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER } from "../constants/Utils";

const resizeMode = "cover";

const Discussion = props => {
  return (
    <Card>
      <Background>
        <Image
          style={{
            flex: 1,
            borderRadius: 3,
            resizeMode
          }}
          source={{ uri: props.background }}
        />
      </Background>
      <Content
        style={{
          justifyContent: "center",
          flex: 1,
          backgroundColor: "transparent"
        }}
      >
        <Title numberOfLines={2}>{props.title}</Title>
        <Desc numberOfLines={2}>{props.description}</Desc>
        <Footer
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Users style={{ flex: 1, flexDirection: "row" }}>
            {props.responses.map((data, index) => {
              return (
                <ImageUser
                  key={data.id}
                  source={
                    data.author.avatar != null
                      ? {
                          uri: GET_AVATAR_URL(
                            data.author.avatar.secret,
                            "250x250",
                            data.author.avatar.name
                          )
                        }
                      : {
                          uri: IMAGE_PLACEHOLDER
                        }
                  }
                />
              );
            })}
          </Users>
          <Messages>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <NumberMessages>{props.messagesNumber}</NumberMessages>
              <Icon name="mail" style={{ color: "#fff", fontSize: 14 }} />
            </View>
          </Messages>
        </Footer>
      </Content>
    </Card>
  );
};

export default Discussion;

const Card = styled.View`
  margin-right: 10px;
  margin-left: 15px;
  width: 220px;
  elevation: 10;
`;

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Content = styled.View`
  padding: 10px;
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
  height: 35px;
`;

const Users = styled.View`
  padding-left: 7px;
  height: 15px;
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
