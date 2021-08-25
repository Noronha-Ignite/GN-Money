import React, { useContext } from 'react';

import IncomeSVG from '../../assets/income.svg';
import OutcomeSVG from '../../assets/outcome.svg';
import TotalSVG from '../../assets/total.svg';

import { TransactionsContext } from '../../contexts/TransactionsContext';
import { TransactionType } from '../../models/TransactionType';

import { Container } from './styles';

export const Summary: React.FC = () => {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce((acc, transaction) => {
    if ( transaction.type === TransactionType.Income ) {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  const currencyFormatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeSVG} alt='Entradas' />
        </header>
        <strong>{currencyFormatter.format(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={OutcomeSVG} alt='Saídas' />
        </header>
        <strong>-{currencyFormatter.format(summary.withdraws)}</strong>
      </div>
      <div className='highlighted-background'>
        <header>
          <p>Total</p>
          <img src={TotalSVG} alt='Total' />
        </header>
        <strong>{currencyFormatter.format(summary.total)}</strong>
      </div>
    </Container>
  );
};
