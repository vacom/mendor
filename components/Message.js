import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { View, Text } from "native-base";
import { LinearGradient } from "expo";
import moment from "moment/min/moment-with-locales";
import { GET_AVATAR_URL } from "../api/Functions/Upload";
import { IMAGE_PLACEHOLDER } from "../constants/Utils";
import ProjectCard from "./ProjectCard";

const Message = props => {
  let message = null;
  const userId = props.userId;
  const userIdLogged = props.userIdLogged;
  let avatar = null;
  if (props.avatar) {
    avatar = GET_AVATAR_URL(props.avatar.secret, "250x250", props.avatar.name);
  } else {
    avatar = IMAGE_PLACEHOLDER;
  }
  if (userId == userIdLogged) {
    if (props.type != "PROJECT") {
      message = (
        <ViewMessageLogged>
          <TextLogged>{props.message}</TextLogged>
          <TextDate>{moment(props.createdAt).fromNow()}</TextDate>
        </ViewMessageLogged>
      );
    } else if (props.type == "PROJECT") {
      message = (
        <ViewCardLogged>
          <View>
            <ProjectCard project={props.project} />
          </View>
        </ViewCardLogged>
      );
    }
  } else {
    if (props.type != "PROJECT") {
      message = (
        <ViewMessage>
          <ViewMessageNotLogged>
            <ViewAvatar>
              <Avatar
                source={{
                  uri: avatar
                }}
              />
            </ViewAvatar>
            <LinearGradient
              colors={["#3F53AF", "#673AB7"]}
              style={{ borderRadius: 10, padding: 10 }}
              start={[0, 0]}
              end={[1, 0]}
            >
              <TextNotLogged>{props.message}</TextNotLogged>
            </LinearGradient>
          </ViewMessageNotLogged>
          <TextDate>{moment(props.createdAt).fromNow()}</TextDate>
        </ViewMessage>
      );
    } else if (props.type == "PROJECT") {
      message = (
        <ViewMessage>
          <ViewMessageNotLogged>
            <ViewAvatar>
              <Avatar
                source={{
                  uri: avatar
                }}
              />
            </ViewAvatar>
            <View>
              <ProjectCard project={props.project} />
            </View>
          </ViewMessageNotLogged>
        </ViewMessage>
      );
    }
  }
  return <View style={{ flex: 1 }}>{message}</View>;
};

export default Message;

const TextLogged = styled.Text`
  padding: 11px;
  color: #000;
  background: #fff;
  elevation: 1;
  border-radius: 10;
  font-size: 16px;
  text-align: justify;
  max-width: 90%;
`;

const TextDate = styled.Text`
  padding: 0;
  color: #6a6a6a;
  font-size: 10px;
`;

const TextNotLogged = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: justify;
`;

const ViewCardLogged = styled.View`
  align-items: flex-end;
  padding: 5px 10px;
  width: 100%;
`;

const ViewMessageLogged = styled.View`
  align-items: flex-end;
  padding: 5px 10px;
  width: 100%;
`;

const ViewMessage = styled.View`
  padding: 5px 10px;
`;

const ViewMessageNotLogged = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  max-width: 80%;
`;

const Avatar = styled.Image`
  border-radius: 50px;
  width: 45px;
  height: 45px;
`;

const ViewAvatar = styled.View`
  padding-right: 5px;
`;
