import React from "react";
import { Thumbnail } from "native-base";
//GraphQL
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER } from "../../constants/Utils";

const MessageAvatar = ({ data }) => {
  const { users } = data;
  let avatar =
    Object.keys(users) > 0
      ? GET_AVATAR_URL(users[0].secret, "250x250", users[0].name)
      : IMAGE_PLACEHOLDER;

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
