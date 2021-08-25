import { TransactionsContext } from './../contexts/TransactionsContext';
import { useContext } from 'react';

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
}