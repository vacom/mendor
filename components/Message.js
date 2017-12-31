import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { View, Text } from "native-base";
import { LinearGradient } from "expo";

const Chat = props => {
  let message = null;
  const userId = props.userId;
  const userIdLogged = props.userIdLogged;
  if (userId == userIdLogged) {
    message = (
      <ViewMessageLogged>
        <TextLogged>{props.message}</TextLogged>
      </ViewMessageLogged>
    );
  } else {
    message = (
      <ViewMessageNotLogged>
        <ViewAvatar>
          <Avatar
            source={{
              uri:
                props.avatar
            }}
          />
        </ViewAvatar>
        <LinearGradient colors={["#3F53AF", "#673AB7"]} style={{borderRadius:10, padding:10}} start={[0, 0]} end={[1, 0]} >
          <TextNotLogged>{props.message}</TextNotLogged>
        </LinearGradient>
      </ViewMessageNotLogged>
    );
  }
  return <View>{message}</View>;
};

export default Chat;

const TextLogged = styled.Text`
  padding: 11px;
  color: #000;
  background: #fff;
  elevation: 1;
  border-radius: 10;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: justify;
  max-width: 90%;
`;

const TextNotLogged = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: justify;
`;

const ViewMessageLogged = styled.View`
  align-items: flex-end;
  padding: 5px 10px;
`;

const ViewMessageNotLogged = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 5px 10px;
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
