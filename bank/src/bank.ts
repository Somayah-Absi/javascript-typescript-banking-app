class Transaction {
  amount : number;
  date:Date;
  constructor(amount:number, date:Date) {
    this.amount = amount;
    this.date = new Date(); // Use the provided date
  }
}

class Customer {
  name: string;
  id:number;
  transactions:Transaction[];
  constructor(name:string, id:number) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getTransactions() {
    return this.transactions;
  }

  getBalance() {
    const balance = this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return balance;
  }

  addTransactions(amount:number) {
    const transaction = new Transaction(amount,new Date);
    try {
      const currentBalance = this.getBalance();
      const newBalance = currentBalance + amount;

      if (newBalance < 0) {
        console.log(
          "Transaction cannot be added. Balance would become negative."
        );
        return false;
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
    } catch (error) {
      // Error occurred during transaction addition, handle the error
      console.error("Error adding transaction:", error);
      return false;
    }
  }
}

class Branch {
  name:string;
  customers:Customer[];
  constructor(name:string) {
    this.name = name;
    this.customers = [];
  }

  getName() {
    return this.name;
  }

  getCustomers() {
    return this.customers;
  }

  addCustomer(customer:Customer) {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    } else {
      return false;
    }
  }

  addCustomerTransaction(customerId:number, amount:number) {
    const foundCustomer = this.customers.find(
      (customer) => customer.id === customerId
    );
    if (foundCustomer) {
      foundCustomer.addTransactions(amount);
      return true;
    } else {
      return false;
    }
  }
  listCustomers(includeTransactions:boolean) {
    let output = `Customers of ${this.name}:\n`;
    this.customers.forEach((customer) => {
      output += `Customer: ${customer.getName()}\n`;
      if (includeTransactions) {
        output += "Transactions:\n";
        customer.getTransactions().forEach((transaction) => {
          output += `Amount: ${transaction.amount}, Date: ${transaction.date}\n`;
        });
      }
    });
    return output; // Return the output string
  }
}

class Bank {
  name:string;
  branches:Branch[];
  constructor(name:string) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch:Branch) {
    if (!this.branches.includes(branch)) {
      this.branches.push(branch);
      return true;
    } else {
      return false;
    }
  }

  findBranchByName(branchName:string) {
    const findBranch = this.branches.find(
      (branch) => branch.name === branchName
    );
    if (findBranch) {
      return findBranch;
    } else {
      return null;
    }
  }

  addCustomer(branch:Branch, customer:Customer) {
    const foundBranch = this.findBranchByName(branch.getName());
    if (foundBranch) {
      return foundBranch.addCustomer(customer);
    }
    return false;
  }

  addCustomerTransaction(branch:Branch, customerId:number, amount:number) {
    const specificBranch = this.findBranchByName(branch.name);
    if (specificBranch) {
      return specificBranch.addCustomerTransaction(customerId, amount);
    }
    return false;
  }
  checkBranch(branch:Branch) {
    if (this.branches.includes(branch)) {
      return true;
    } else {
      return false;
    }
  }

  listCustomers(branch:Branch, includeTransactions:boolean) {
    const specificBranch = this.findBranchByName(branch.getName());
    if (specificBranch) {
      return specificBranch.listCustomers(includeTransactions);
    }
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
arizonaBank.findBranchByName("West Branch");
arizonaBank.findBranchByName("Sun Branch");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

customer1.addTransactions(-1000);

console.log("balance:",customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));