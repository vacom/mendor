import React from "react";
import styled from "styled-components/native";
import { Label, LabelContainer, LabelsContainer } from "./Label";
import { Card } from "native-base";

const ProjectCard = props => {
  return (
    <Card>
      <ProjectContainer>
        <P style={{ color: "#000000", marginBottom: 4 }}>
          {props.project.title}
        </P>
        <ProjectControler>
          <Span style={{ color: "#9E9E9E", lineHeight: 22 }}>
            {props.project.description}
          </Span>
        </ProjectControler>
        <LabelsControl>
          <LabelsContainer>
            {props.project.technologies.map(res => {
              return (
                <LabelContainer key={res.id}>
                  <Label text={res.name} />
                </LabelContainer>
              );
            })}
          </LabelsContainer>
        </LabelsControl>
      </ProjectContainer>
    </Card>
  );
};

export { ProjectCard };

const ProjectContainer = styled.View`
  padding: 10px;
  border-radius: 2px;
  width: 300px;
`;

const ProjectControler = styled.View`
  overflow: hidden;
  height: 88px;
`;

//Labels
const LabelsControl = styled.View`
  height: 52px;
  overflow: hidden;
  background-color: #ffffff;
`;

const P = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  font-weight: 400;
`;
const Span = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
`;
