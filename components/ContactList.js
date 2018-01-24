import React from "react";
import { Card, CardContainer, CardLeft, CardBody, CardRight } from "./Card";
import { Thumbnail, Text, Container, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { IMAGE_PLACEHOLDER } from "../constants/Utils";
import { Placeholder } from "../components";
import { TouchableHighlight } from "react-native";

const ContactList = props => {
  if (props.contacts.length > 0) {
    return props.contacts.map((data, index) => {
      return (
          <Card key={index} onPress={props.goToProfile(data.contactID[0].id)}>
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
                  {data.contactID[0].name}
                </Text>
                <Text style={{ fontSize: 14, color: "#757575" }}>
                  Especialista
                </Text>
              </CardBody>

              <CardRight>
                <MaterialIcons name="more-vert" size={24} color="#757575" />
              </CardRight>
            </CardContainer>
          </Card>
      );
    });
  } else {
    return <Placeholder text="Sem Contactos" IconName="sentiment-neutral" />;
  }
};

export default ContactList;
