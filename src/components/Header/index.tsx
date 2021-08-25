import React from 'react';

import LogoSVG from '../../assets/logo.svg';

import { Container, Content } from './styles';

interface HeaderProps {
  onOpenCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal }) => {
  return (
    <Container>
      <Content>
        <img src={LogoSVG} alt='GN Money' />
        <button onClick={onOpenCreateModal} type='button'>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
