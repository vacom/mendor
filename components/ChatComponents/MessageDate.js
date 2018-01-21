import React from "react";
import { Text } from "react-native";
//Utils
import moment from "moment/min/moment-with-locales";

const MessageDate = ({ data }) => {
  return (
    <Text style={{ fontSize: 14, color: "#757575" }}>
      {Object.keys(data.messages).length > 0
        ? moment(data.messages[0].createdAt).fromNow()
        : ""}
    </Text>
  );
};

export default MessageDate;
