import React from "react";
import { Text } from "react-native";

const MessageContent = ({ data }) => {
  return (
    <Text numberOfLines={1} style={{ fontSize: 14, color: "#757575" }}>
      {Object.keys(data.messages).length > 0
        ? data.messages[0].content
        : "Sem mensagens."}
    </Text>
  );
};

export default MessageContent;
