import React from 'react';
import styled from 'styled-components';

const Header: React.FC<Props> = props => {
  const { title, bgColor, fontColor } = props;
  return (
    <Container bgColor={bgColor ?? 'initial'}>
      <Title fontColor={fontColor ?? 'initial'}>{title ?? 'Header'}</Title>
    </Container>
  );
};

export default Header;

interface Props {
  title: string | number;
  bgColor?: string;
  fontColor?: string;
}

interface ContainerStyleProps {
  bgColor: string;
}
const Container = styled.header<ContainerStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vw;
  min-height: 50px;
  background-color: ${({ bgColor }) => bgColor};
`;

interface TitleStyleProps {
  fontColor: string;
}
const Title = styled.h1<TitleStyleProps>`
  font-size: calc(10px + 3vmin);
  color: ${({ fontColor }) => fontColor};
`;
