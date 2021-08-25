import React from 'react';

import IncomeSVG from '../../assets/income.svg';
import OutcomeSVG from '../../assets/outcome.svg';
import TotalSVG from '../../assets/total.svg';

import { Container } from './styles';

export const Summary: React.FC = () => {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeSVG} alt="Entradas" />
        </header>
        <strong>R$1000,<span>00</span></strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={OutcomeSVG} alt="Saídas" />
        </header>
        <strong>-R$500,<span>00</span></strong>
      </div>
      <div className="highlighted-background">
        <header>
          <p>Total</p>
          <img src={TotalSVG} alt="Total" />
        </header>
        <strong>R$500,<span>00</span></strong>
      </div>
    </Container>
  );
}