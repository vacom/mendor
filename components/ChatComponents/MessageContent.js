import React from "react";
import { Text } from "react-native";

const MessageContent = ({ data, userId }) => {
  let content = "";
  if (data.messages && Object.keys(data.messages).length > 0) {
    if (
      data.messages[0].type == "PROJECT" &&
      Object.keys(data.messages).length > 0
    ) {
      if (data.messages[0].author.id == userId) {
        content = "Você partilhou um projeto.";
      } else {
        content = data.messages[0].author.name + " partilhou um projeto.";
      }
    } else {
      content = data.messages[0].content;
    }
  }
  return (
    <Text numberOfLines={1} style={{ fontSize: 14, color: "#757575" }}>
      {data.messages && Object.keys(data.messages).length > 0 ? content : "Sem mensagens."}
    </Text>
  );
};

export default MessageContent;
