import React from "react";
//Components
import {
  Card,
  CardContainer,
  CardLeft,
  CardBody,
  CardRight
} from "../../../components/Card";
import { Thumbnail, Text, Container, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { IMAGE_PLACEHOLDER } from "../../../constants/Utils";
import { Placeholder } from "../../../components";
import { TouchableOpacity } from "react-native";

const ContactList = props => {
  if (Object.keys(props.contacts).length > 0) {
    return props.contacts.map((data, index) => {
      return (
        <Card
          key={index}
          onPress={() => props.openProfile(data.contactID.id)}
        >
          <CardContainer>
            <CardLeft>
              <Thumbnail
                style={{ width: 48, height: 48 }}
                source={{
                  uri: IMAGE_PLACEHOLDER
                }}
              />
            </CardLeft>
            <CardBody>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#000"
                }}
              >
                {data.contactID.name}
              </Text>
              <Text style={{ fontSize: 14, color: "#757575" }}>
                {`${data.contactID.profile.role} na ${
                  data.contactID.profile.company
                }`}
              </Text>
            </CardBody>
            <CardRight>
              <TouchableOpacity
                onPress={() => props.openAction(data.id)}
              >
                <MaterialIcons name="more-vert" size={24} color="#757575" />
              </TouchableOpacity>
            </CardRight>
          </CardContainer>
        </Card>
      );
    });
  } else {
    return <Placeholder text="Sem Contactos" IconName="sentiment-neutral"/>;
  }
};

export default ContactList;
