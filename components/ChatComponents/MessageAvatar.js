import React from "react";
import { Thumbnail } from "native-base";
//GraphQL
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER, IMAGE_GROUP_CHAT } from "../../constants/Utils";

const MessageAvatar = ({ data }) => {
  let avatar = "";
  if (Object.keys(data).length < 2) {
    if (data[0].avatar) {
      avatar = GET_AVATAR_URL(
        data[0].avatar.secret,
        "250x250",
        data[0].avatar.name
      );
    } else {
      avatar = IMAGE_PLACEHOLDER;
    }
  } else {
    // GROUP IMAGE
    avatar = IMAGE_GROUP_CHAT;
  }

  return (
    <Thumbnail
      style={{ width: 48, height: 48 }}
      source={{
        uri: avatar
      }}
    />
  );
};

export default MessageAvatar;
