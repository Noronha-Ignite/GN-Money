export interface TransactionResponse {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string,
}

export type Transaction =  Omit<TransactionResponse, 'id' | 'createdAt'>;

export type Transactions = TransactionResponse[]