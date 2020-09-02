/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title:string;
  value:number;
  type:'income'|'outcome';
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

  public list() {
    return { 'transactions': this.all(),'balance': this.getBalance() };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const balance = { income:0, outcome:0, total:0};

    this.transactions.forEach((transaction) => {
      if(transaction.type === 'income') {
        balance.income += transaction.value;
      } else {
        balance.outcome += transaction.value;
      }
    });

    balance.total = balance.income - balance.outcome;

   return balance;
  }

  public create({title, value, type}: TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
