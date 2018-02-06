import React from "react";
//GraphQL
import { GET_AVATAR_URL } from "../../api/Functions/Upload";
//Utils
import { IMAGE_PLACEHOLDER } from "../../constants/Utils";
//Components
import { Card, CardContainer, CardLeft, CardBody, CardRight } from "../Card";
import { Thumbnail, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  MessageContent,
  MessageDate,
  MessageAvatar,
  MessageName
} from "../../components/ChatComponents";

const SearchCard = props => {
  return (
    <Card
      onPress={() => {
        if (props.typeSearch == "search") {
          props.onPress();
        }
      }}
    >
      <CardContainer>
        <CardLeft>
          {props.send_avatar ? (
            <TouchableOpacity onPress={() => props.goToProfile(props.id_user)}>
              <Thumbnail
                style={{ width: 48, height: 48 }}
                source={
                  props.avatar != null
                    ? {
                        uri: GET_AVATAR_URL(
                          props.avatar.secret,
                          "250x250",
                          props.avatar.name
                        )
                      }
                    : {
                        uri: IMAGE_PLACEHOLDER
                      }
                }
              />
            </TouchableOpacity>
          ) : (
            <MessageAvatar goToProfile={props.goToProfile} data={props.users} />
          )}
        </CardLeft>
        <CardBody>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#000"
            }}
          >
            {props.users ? <MessageName users={props.users} /> : props.name}
          </Text>
          {props.type ? (
            <Text style={{ fontSize: 14, color: "#757575" }}>{props.type}</Text>
          ) : (
            <Text style={{ fontSize: 14, color: "#757575" }}>
              <MessageContent
                data={props.message ? props.message : null}
                userId={props.userId ? props.userId : null}
              />
            </Text>
          )}
        </CardBody>
        <CardRight>
          {props.icon ? (
            <TouchableOpacity onPress={() => props.onPress()}>
              <MaterialIcons name={props.icon} size={22} color="#3F51B5" />
            </TouchableOpacity>
          ) : (
            <MessageDate data={props.data} />
          )}
        </CardRight>
      </CardContainer>
    </Card>
  );
};

export default SearchCard;
