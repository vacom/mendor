import React from "react";
import { Thumbnail } from "native-base";
import { TouchableOpacity } from "react-native";
//GraphQL
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER, IMAGE_GROUP_CHAT } from "../../constants/Utils";

const MessageAvatar = props => {
  let avatar = "";
  let id = null;
  if (Object.keys(props.data).length < 2) {
    id = props.data[0].id;
    if (props.data[0].avatar) {
      avatar = GET_AVATAR_URL(
        props.data[0].avatar.secret,
        "250x250",
        props.data[0].avatar.name
      );
    } else {
      avatar = IMAGE_PLACEHOLDER;
    }
  } else {
    // GROUP IMAGE
    avatar = IMAGE_GROUP_CHAT;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.goToProfile && id) {
          props.goToProfile(id);
        }
      }}
    >
      <Thumbnail
        style={{ width: 48, height: 48 }}
        source={{
          uri: avatar
        }}
      />
    </TouchableOpacity>
  );
};

export default MessageAvatar;
