import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ListOfTransactions {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): ListOfTransactions {
    const transactions = this.transactionsRepository.all();

    if (transactions.length === 0) {
      throw Error('Não há transações.');
    }
    const balance = this.transactionsRepository.getBalance();

    return { transactions, balance };
  }
}

export default ListTransactionsService;
