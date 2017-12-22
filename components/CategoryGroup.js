import React from "react";
import { TouchableHighlight, View } from "react-native";
import styled from "styled-components/native";
//Components
import Discussion from "./Discussion";

const url = "https://i.ytimg.com/vi/YmIlsUKEjaA/maxresdefault.jpg";

const CategoryGroup = props => {
  return (
    <CategoryGroupContainer>
      <Title>{props.nameCategory}</Title>
      <ArticlesList horizontal showsHorizontalScrollIndicator={false}>
        <TouchableHighlight onPress={() => props.goToDiscussion()}>
          <View>
            <Discussion
              background={url}
              id="1"
              title="Jovens Empreendedores"
              description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande "
              messagesNumber="4"
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => props.goToDiscussion()}>
          <View>
            <Discussion
              background={url}
              id="1"
              title="Jovens Empreendedores"
              description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande "
              messagesNumber="4"
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => props.goToDiscussion()}>
          <View>
            <Discussion
              background={url}
              id="1"
              title="Jovens Empreendedores"
              description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande "
              messagesNumber="4"
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => props.goToDiscussion()}>
          <View>
            <Discussion
              background={url}
              id="1"
              title="Jovens Empreendedores"
              description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande "
              messagesNumber="4"
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => props.goToDiscussion()}>
          <View>
            <Discussion
              background={url}
              id="1"
              title="Jovens Empreendedores"
              description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande "
              messagesNumber="4"
            />
          </View>
        </TouchableHighlight>
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
