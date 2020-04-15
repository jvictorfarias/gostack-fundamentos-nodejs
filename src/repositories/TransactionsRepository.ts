import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.reduce(
      (prevTransaction, currTransaction) =>
        currTransaction.type === 'income'
          ? prevTransaction + currTransaction.value
          : prevTransaction,
      0,
    );
    const outcomeTransactions = this.transactions.reduce(
      (prevTransaction, currTransaction) =>
        currTransaction.type === 'outcome'
          ? prevTransaction + currTransaction.value
          : prevTransaction,
      0,
    );

    const balance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: incomeTransactions - outcomeTransactions,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
