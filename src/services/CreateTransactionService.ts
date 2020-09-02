/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income'|'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    if( type==='outcome' && this.isNegative(this.transactionsRepository.getBalance().total - value) ){
      throw Error('The balance cannot assume a negative value.');
    }

    const transaction = this.transactionsRepository.create({title, value, type});

    return transaction;
  }

  private isNegative(value:number): boolean {
    return value < 0;
  }

}

export default CreateTransactionService;
