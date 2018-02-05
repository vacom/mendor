import React from "react";
import { Image } from "react-native";
import { View } from "native-base";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//GraphQL
import { GET_AVATAR_URL } from "../api/Functions/Upload";
//Utils
import {
  IMAGE_PLACEHOLDER,
  IMAGE_DISCUSSIONS_PLACEHOLDER
} from "../constants/Utils";

const resizeMode = "cover";

const _renderResponses = responses => {
  let responses_filtered = [];
  if (Object.keys(responses).length > 0) {
    for (x = 0; x < responses.length; x++) {
      responses_filtered.push(responses[x]);
    }
    for (i = 0; i < responses.length; i++) {
      let repeated = 0;
      for (a = 0; a < responses_filtered.length; a++) {
        if (responses[i].author.id == responses_filtered[a].author.id) {
          repeated++;
          if (repeated > 1) {
            responses_filtered.splice(a, 1);
            repeated = 0;
          }
        }
      }
    }
  }
  return responses_filtered.map((data, index) => {
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
  });
};
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
            {_renderResponses(props.responses)}
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
