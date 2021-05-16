import React from 'react';
import styled from 'styled-components';
import Header from '../component/Header';

const Front: React.FC = () => (
  <Container>
    <Header title="왜 안와?" fontColor="white" bgColor="black" />
  </Container>
);

export default Front;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
