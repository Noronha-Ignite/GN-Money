import { createContext, useCallback, useEffect, useState } from 'react';

import { Transaction, TransactionInput, Transactions } from '../models/Transaction';
import { api } from '../services/api';

interface TransactionsContextData {
  transactions: Transactions;
  createTransaction: (transaction: TransactionInput) => Promise<Transaction>;
}

export const TransactionsContext = createContext({} as TransactionsContextData);

export const TransactioProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transactions>([]);

  useEffect(() => {
    api.get<{ transactions: Transactions }>('transactions').then(({ data }) => {
      setTransactions(data.transactions);
    });
  }, []);

  const createTransaction = useCallback(async (transaction: TransactionInput) => {

    return api
      .post<{ transaction: Transaction }>('/transactions', transaction)
      .then((response) => response.data.transaction)
      .then((insertedTransaction) => {
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
