import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { View, Text } from "native-base";

const Chat = props => {
  let message = null;
  const id_user_signed = 1;
  if (props.id_user == id_user_signed) {
    message = (
      <ViewMessageMine>
        <TextMine>{props.message}</TextMine>
      </ViewMessageMine>
    );
  } else {
    message = (
      <ViewMessageNotMine>
        <ViewAvatar>
          <Avatar
            source={{
              uri:
                "https://scontent.fopo2-2.fna.fbcdn.net/v/t1.0-9/25498263_1521972947849794_5674696303839555748_n.jpg?oh=e027e305b330218e0780f28c2cdc1a31&oe=5ABE2638"
            }}
          />
        </ViewAvatar>
        <View>
          <TextNotMine>{props.message}</TextNotMine>
        </View>
      </ViewMessageNotMine>
    );
  }
  return <View>{message}</View>;
};

export default Chat;

const TextMine = styled.Text`
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

const TextNotMine = styled.Text`
  padding: 10px;
  background: #3f51b5;
  color: #fff;
  border-radius: 10;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: justify;
`;

const ViewMessageMine = styled.View`
  align-items: flex-end;
  padding: 5px 10px;
`;

const ViewMessageNotMine = styled.View`
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
