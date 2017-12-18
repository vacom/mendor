import React from "react";
//Styles
import { StyleSheet, ScrollView, Container } from "react-native";
import styled from "styled-components/native";
//Components
import Discussion from './Discussion'

class CategoryGroup extends React.Component {
  render() {
    const url = "https://images.askmen.com/1080x540/money/career/lessons-from-a-young-entrepreneur-1106093-TwoByOne.jpg"   
    return (
      <CategoryGroupContainer>
        <Title>{this.props.nameCategory}</Title>
        <ArticlesList horizontal showsHorizontalScrollIndicator={false}>
            <Discussion background={url} title="Jovens Empreendedores" description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande " messagesNumber="4"/>
            <Discussion background={url} title="Jovens Empreendedores" description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande" messagesNumber="4"/>
            <Discussion background={url} title="Jovens Empreendedores" description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande " messagesNumber="4"/>
            <Discussion background={url} title="Jovens Empreendedores" description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande " messagesNumber="4"/>
            <Discussion background={url} title="Jovens Empreendedores" description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande " messagesNumber="4"/>
            <Discussion background={url} title="Jovens Empreendedores" description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande " messagesNumber="4"/>
            <Discussion background={url} title="Jovens Empreendedores" description="A dificuldade de se tornar empreendedor nos dias de hoje é muito grande " messagesNumber="4"/>
        </ArticlesList>
      </CategoryGroupContainer>
    );
  }
}

export default CategoryGroup;
const Title = styled.Text`
  color: #9ca4ab;
  font-size: 16px;
  padding-left: 15px;
`;
const CategoryGroupContainer = styled.ScrollView`
  margin-bottom: 25px;

`
const ArticlesList = styled.ScrollView`
  margin-top: 20px;
`;
