import React from "react";
import styled from "styled-components/native";
import {
  Modal,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";
import { Text, View, Icon, Badge } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

/*
-- Modal Styles
*/
const ModalOpacity = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContentView = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ModalContent = styled.View`
  width: 100%;
  background-color: #fff;
`;

const ViewList = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
`;

const ListText = styled.Text`
  font-size: 16px;
  color: #757575;
  margin-left: 15px;
`;

const ModalBottom = props => {
  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={props.visible}
      onRequestClose={props.close}
    >
      <ModalOpacity>
        <ModalContentView>
          <ModalContent>
            {props.content.map((data, i) => {
              return (
                <TouchableNativeFeedback key={i}>
                  <ViewList>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <MaterialIcons
                        name={data.icon}
                        size={24}
                        color="#757575"
                      />
                      <ListText>{data.text}</ListText>
                    </View>

                    {data.badge && (
                        <Badge success>
                          <Text>{data.notifications}</Text>
                        </Badge>
                    )}
                  </ViewList>
                </TouchableNativeFeedback>
              );
            })}
          </ModalContent>
        </ModalContentView>
      </ModalOpacity>
    </Modal>
  );
};

export { ModalBottom };
