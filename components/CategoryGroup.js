import React from "react";
import { TouchableOpacity, View, Text, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
//Components
import Discussion from "./Discussion";

const CategoryGroup = props => {
  return (
    <CategoryGroupContainer>
      <Title>{props.nameCategory}</Title>
      <ArticlesList horizontal showsHorizontalScrollIndicator={false}>
        {props.discussions.map((data, index) => {
          return (
            <View
              key={index}
              style={{
                marginRight: 5,
                marginLeft: 15,
                backgroundColor: "#fff",
                elevation: 10
              }}
            >
              <TouchableHighlight
                onPress={props.goToDiscussion(
                  data.id,
                  data.title,
                  props.avatar,
                  props.userIdLogged
                )}
              >
                <View style={{ elevation: 10 }}>
                  <Discussion
                    background={data.cover}
                    id={data.id}
                    title={data.title}
                    description={data.description}
                    messagesNumber={data.responses.length}
                    responses={data.responses}
                  />
                </View>
              </TouchableHighlight>
            </View>
          );
        })}
      </ArticlesList>
    </CategoryGroupContainer>
  );
};

export default CategoryGroup;

const Title = styled.Text`
  color: #9ca4ab;
  font-size: 16px;
  padding-left: 15px;
`;
const CategoryGroupContainer = styled.ScrollView`
  margin-bottom: 20px;
  padding-bottom: 5px;
`;
const ArticlesList = styled.ScrollView`
  background: #fff;
  margin-top: 20px;
`;
