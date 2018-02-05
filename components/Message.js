import React from "react";
import styled from "styled-components/native";
import { View, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import moment from "moment/min/moment-with-locales";
import { GET_AVATAR_URL } from "../api/Functions/Upload";
import { IMAGE_PLACEHOLDER } from "../constants/Utils";
import ProjectCard from "./ProjectCard";

const Message = ({
  message = null,
  userId,
  userIdLogged,
  avatar = null,
  type,
  createdAt,
  project,
  goToProfile
}) => {
  if (avatar) {
    avatar = GET_AVATAR_URL(avatar.secret, "250x250", avatar.name);
  } else {
    avatar = IMAGE_PLACEHOLDER;
  }
  if (type == "NOTIFICATION") {
    message = (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 10
        }}
      >
        <Text style={{ fontSize: 12 }}>{message}</Text>
      </View>
    );
  } else {
    if (userId == userIdLogged) {
      if (type != "PROJECT") {
        message = (
          <ViewMessageLogged>
            <TextLogged>{message}</TextLogged>
            <TextDate>{moment(createdAt).fromNow()}</TextDate>
          </ViewMessageLogged>
        );
      } else if (type == "PROJECT") {
        message = (
          <ViewCardLogged>
            <View>
              <ProjectCard project={project} />
            </View>
          </ViewCardLogged>
        );
      }
    } else {
      if (type != "PROJECT") {
        message = (
          <ViewMessage>
            <ViewMessageNotLogged>
              <ViewAvatar>
                <TouchableOpacity onPress={() => goToProfile(userId)}>
                  <Avatar
                    source={{
                      uri: avatar
                    }}
                  />
                </TouchableOpacity>
              </ViewAvatar>
              <View>
                <LinearGradient
                  colors={["#3F53AF", "#673AB7"]}
                  style={{ borderRadius: 10, padding: 10 }}
                  start={[0, 0]}
                  end={[1, 0]}
                >
                  <TextNotLogged>{message}</TextNotLogged>
                </LinearGradient>
                <TextDate>{moment(createdAt).fromNow()}</TextDate>
              </View>
            </ViewMessageNotLogged>
          </ViewMessage>
        );
      } else if (type == "PROJECT") {
        message = (
          <ViewMessage>
            <ViewMessageNotLogged>
              <ViewAvatar>
                <TouchableOpacity onPress={() => goToProfile(userId)}>
                  <Avatar
                    source={{
                      uri: avatar
                    }}
                  />
                </TouchableOpacity>
              </ViewAvatar>
              <View>
                <ProjectCard project={project} />
              </View>
            </ViewMessageNotLogged>
          </ViewMessage>
        );
      }
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
  max-width: 100%;
`;

const TextDate = styled.Text`
  padding: 0;
  color: #6a6a6a;
  font-size: 10px;
`;

const TextNotLogged = styled.Text`
  background-color: transparent;
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
  border-radius: 10px;
  align-items: flex-end;
  padding: 5px 10px;
  width: 100%;
  padding-left: 25px;
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
