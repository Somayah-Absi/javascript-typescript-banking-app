import { Transaction } from "./transaction";

export class Customer {
  name: string;
  id: number;
  transactions: Transaction[];
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }
  // Method to get customer name
  getName():string {
    return this.name;
  }
  // Method to get customer ID
  getId() :number{
    return this.id;
  }
  // Method to get customer transactions
  getTransactions() :Transaction[]{
    return this.transactions;
  }
  // Method to calculate customer balance
  getBalance():number {
    const balance = this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return balance;
  }
  // Method to add transaction for the customer this will make sure the transaction will not make balance negative
  addTransactions(amount: number):boolean {
    const transaction = new Transaction(amount);

    const currentBalance = this.getBalance();
    const newBalance = currentBalance + amount;
    if (newBalance < 0) {
       throw new Error(
         "Transaction cannot be added. Balance would become negative."
       );
    }
    this.transactions.push(transaction);
    // Check if the transaction was added successfully
    if (this.transactions.includes(transaction)) {
      return true;
    } else {
      // Transaction not added, handle the error
      console.error("Failed to add transaction:", transaction);
      return false;
    }
  }
}
