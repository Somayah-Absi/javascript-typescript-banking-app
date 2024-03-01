class Transaction {
  amount: number;
  date: Date;
  constructor(amount: number) {
    this.amount = amount;
    this.date = new Date(); // Use the provided date
  }
}
class Customer {
  name: string;
  id: number;
  transactions: Transaction[];
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }
  // Method to get customer name
  getName() {
    return this.name;
  }
  // Method to get customer ID
  getId() {
    return this.id;
  }
  // Method to get customer transactions
  getTransactions() {
    return this.transactions;
  }
  // Method to calculate customer balance
  getBalance() {
    try {
      const balance = this.transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      return balance;
    } catch (error) {
      console.log(`Error calculating balance: ${error}`);
      return 0;
    }
  }
  // Method to add transaction for the customer this will make sure the transaction will not make balance negative
  addTransactions(amount: number) {
    const transaction = new Transaction(amount);
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
  name: string;
  customers: Customer[];
  constructor(name: string) {
    this.name = name;
    this.customers = [];
  }
  // Method to get branch name
  getName() {
    return this.name;
  }
  // Method to get customers of the branch
  getCustomers() {
    return this.customers;
  }
  // Method to add customer to the branch
  addCustomer(customer: Customer) {
    try {
      //  check if the customer already exists
      if (!this.customers.includes(customer)) {
        this.customers.push(customer);
        return true;
      } else {
        return false; // Customer already exists
      }
    } catch (error) {
      console.log(`Error adding customer: ${error}`);
      return false;
    }
  }
  // Method to add transaction for a customer of the branch
  addCustomerTransaction(customerId: number, amount: number) {
    try {
      const foundCustomer = this.customers.find(
        (customer) => customer.id === customerId
      );
      if (foundCustomer) {
        foundCustomer.addTransactions(amount);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`Error adding customer transaction: ${error}`);
      return false;
    }
  }
  // Method to search for customers by name
  searchCustomerByName(keyword: string): Customer[] {
    keyword = keyword.toLowerCase().trim();
    return this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(keyword)
    );
  }
  // Method to list customers of the branch
  listCustomers(includeTransactions: boolean) {
    try {
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
    } catch (error) {
      console.log(`Error listing customers: ${error}`);
    }
  }
}
class Bank {
  name: string;
  branches: Branch[];
  constructor(name: string) {
    this.name = name;
    this.branches = [];
  }
  // Method to add branch to the bank
  addBranch(branch: Branch) {
    try {
      //  check if the branch already exists
      if (!this.branches.includes(branch)) {
        this.branches.push(branch);
        return true;
      } else {
        return false; // Branch already exists
      }
    } catch (error) {
      console.log(`Error adding branch: ${error}`);
      return false;
    }
  }
  // Method to find branch by name
  findBranchByName(branchName: string) {
    try {
      const findBranch = this.branches.find(
        (branch) => branch.name === branchName
      );
      if (findBranch) {
        return findBranch;
      } else {
        return null;
      }
    } catch (error) {
      console.log(`Error finding branch by name: ${error}`);
      return null;
    }
  }
  // Method to add customer to a branch
  addCustomer(branch: Branch, customer: Customer) {
    try {
      const foundBranch = this.findBranchByName(branch.getName());
      if (foundBranch) {
        return foundBranch.addCustomer(customer);
      }
      return false;
    } catch (error) {
      console.log(`Error adding customer: ${error}`);
      return false;
    }
  }
  // Method to add transaction for a customer of a branch
  addCustomerTransaction(branch: Branch, customerId: number, amount: number) {
    try {
      const specificBranch = this.findBranchByName(branch.name);
      if (specificBranch) {
        return specificBranch.addCustomerTransaction(customerId, amount);
      }
      return false;
    } catch (error) {
      console.log(`Error adding customer transaction: ${error}`);
      return false;
    }
  }
  // Method to check if a branch is part of the bank
  checkBranch(branch: Branch) {
    try {
      if (this.branches.includes(branch)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`Error checking branch: ${error}`);
      return false;
    }
  }
  // Method to search for customers in all branches by name
  searchCustomersByName(keyword: string): Customer[] {
    keyword = keyword.toLowerCase().trim();
    let results: Customer[] = [];
    this.branches.forEach((branch) => {
      results = results.concat(branch.searchCustomerByName(keyword));
    });
    return results;
  }
  // Method to list customers of a branch
  listCustomers(branch: Branch, includeTransactions: boolean) {
    try {
      const specificBranch = this.findBranchByName(branch.getName());
      if (specificBranch) {
        return specificBranch.listCustomers(includeTransactions);
      }
    } catch (error) {
      console.log(`Error listing customers: ${error}`);
      return "";
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
console.log("balance:", customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
const searchResultsByName = arizonaBank.searchCustomersByName("anna");
console.log("Search Results by Name:", searchResultsByName);
