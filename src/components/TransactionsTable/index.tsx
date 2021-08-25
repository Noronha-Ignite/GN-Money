import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import { api } from '../../services/api';
import { Transactions } from '../../models/Transaction';

export const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transactions>([]);

  useEffect(() => {
    api.get<{ transactions: Transactions }>('transactions').then(({ data }) => {
      setTransactions(data.transactions);
    });
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-br').format(new Date(transaction.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
