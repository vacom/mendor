import React from "react";
import { Image } from "react-native";
import { Icon, View } from "native-base";
import styled from "styled-components/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
//GraphQL
import { GET_AVATAR_URL } from "../api/Functions/Upload";
//Utils
import {
  IMAGE_PLACEHOLDER,
  IMAGE_DISCUSSIONS_PLACEHOLDER
} from "../constants/Utils";

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
          source={
            props.background != null
              ? {
                  uri: GET_AVATAR_URL(
                    props.background.secret,
                    "250x250",
                    props.background.name
                  )
                }
              : {
                  uri: IMAGE_DISCUSSIONS_PLACEHOLDER
                }
          }
        />
      </Background>
      <Content
        style={{
          justifyContent: "center",
          flex: 1,
          backgroundColor: "transparent"
        }}
      >
        <View style={{ height: 90 }}>
          <Title numberOfLines={2}>{props.title}</Title>
          <Desc numberOfLines={2}>{props.description}</Desc>
        </View>
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
          <Messages style={{ flexDirection: "row" }}>
            <View>
              <NumberMessages>{props.messagesNumber}</NumberMessages>
            </View>
            <View>
              <MaterialCommunityIcons name="forum" size={16} color="#fff" />
            </View>
          </Messages>
        </Footer>
      </Content>
    </Card>
  );
};

export default Discussion;

const Card = styled.View`
  width: 220px;
`;

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #c18a8c;
  opacity: 0.6;
`;

const BackgroundOpacity = styled.View`
  background: blue;
  opacity: 0.3;
  elevation: 20;
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
  height: 20px;
  width: 20px;
  margin-left: -7px;
`;

const NumberMessages = styled.Text`
  color: white;
  font-size: 16px;
  margin-right: 3px;
`;

const Messages = styled.View`
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;
