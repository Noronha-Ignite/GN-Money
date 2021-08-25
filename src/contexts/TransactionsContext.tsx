import { createContext, useCallback, useEffect, useState } from 'react';

import { Transaction, TransactionInput, Transactions } from '../models/Transaction';
import { api } from '../services/api';

interface TransactionsContextProps {
  transactions: Transactions;
  createTransaction: (transaction: TransactionInput) => Promise<Transaction>;
}

export const TransactionsContext = createContext({} as TransactionsContextProps);

export const TransactioProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transactions>([]);

  useEffect(() => {
    api.get<{ transactions: Transactions }>('transactions').then(({ data }) => {
      setTransactions(data.transactions);
    });
  }, []);

  const createTransaction = useCallback(async (transaction: TransactionInput) => {

    return api
      .post<{ transaction: Transaction}>('/transactions', transaction)
      .then((response) => response.data)
      .then((response) => {
        const insertedTransaction = response.transaction;

        setTransactions([...transactions, insertedTransaction]);

        return insertedTransaction;
      });
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
