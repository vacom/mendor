import React from "react";
import { TouchableHighlight, View, Text } from "react-native";
import styled from "styled-components/native";
//Components
import Discussion from "./Discussion";

const url = "https://i.ytimg.com/vi/YmIlsUKEjaA/maxresdefault.jpg";

const CategoryGroup = props => {
  return (
    <CategoryGroupContainer>
      <Title>{props.nameCategory}</Title>
      <ArticlesList horizontal showsHorizontalScrollIndicator={false}>
        {props.discussions.map((data, index) => {
          return (
            <TouchableHighlight key={data.id} onPress={props.goToDiscussion(data.id, data.title, props.avatar, props.userIdLogged)}>
              <View>
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
  margin-bottom: 25px;
`;
const ArticlesList = styled.ScrollView`
  margin-top: 20px;
`;
