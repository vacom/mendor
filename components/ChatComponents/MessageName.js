import React from "react";
import { Text } from "react-native";

const MessageName = ({ users }) => {
  let name = "";
  const userslength = Object.keys(users).length;
  if (userslength > 1) {
    users.map((user, i) => {
      if (userslength === i + 1) {
        name += user.name;
      } else {
        name += user.name + ", ";
      }
    });
  } else {
    name = users[0].name;
  }

  return (
    <Text
      numberOfLines={1}
      style={{
        fontSize: 16,
        color: "#000",
        fontWeight: "600"
      }}
    >
      {name}
    </Text>
  );
};

export default MessageName;
