import React from "react";
import styled from "styled-components/native";
import { Modal, TouchableHighlight, TouchableNativeFeedback } from "react-native";
import { Text, View, Icon } from "native-base";
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
  align-items: center;
  flex-direction: row;
  padding: 20px;
`;

const ViewIcon = styled.View`
  margin-right: 15px;
`;

const ListText = styled.Text`
  font-size: 16px;
  color: #757575;
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
                    <ViewIcon>
                      <MaterialIcons
                        name={data.icon}
                        size={24}
                        color="#757575"
                      />
                    </ViewIcon>
                    <View>
                      <ListText>{data.text}</ListText>
                    </View>
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
