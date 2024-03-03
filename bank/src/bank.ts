import { Customer } from "./customer";
import { Branch } from "./branch";

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
      if (!this.checkBranch(branch)) {
        this.branches.push(branch);
        return true;
      } else {
        return false; // Branch already exists
      }
    } catch (error) {
      console.log(` ${error}`);
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
      console.log(` ${error}`);
      return null;
    }
  }
  // Method to add customer to a branch
  addCustomer(branch: Branch, customer: Customer) {
    try {
      const foundBranch = this.findBranchByName(branch.getName());
      if (foundBranch) {
         foundBranch.addCustomer(customer);
        return true;
      }
      return false;
    } catch (error) {
      console.log(` ${error}`);
    
    }
  }
  // Method to add transaction for a customer of a branch
  addCustomerTransaction(branch: Branch, customerId: number, amount: number) {
    try {
      const specificBranch = this.findBranchByName(branch.name);
      if (specificBranch) {
        specificBranch.addCustomerTransaction(customerId, amount);
        return true;
      }
      return false;
    } catch (error) {
      console.log(` ${error}`);
    
    }
  }
  // Method to check if a branch is part of the bank
  checkBranch(branch: Branch) {
    try {
      if (this.checkBranch(branch)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(` ${error}`);
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
        console.log(`Customers of ${branch.getName()}:\n`);
        branch.customers.forEach((customer) => {
          console.log(`Customer: ${customer.getName()}\n`);
          if (includeTransactions) {
            console.log("Transactions:\n");
            customer.getTransactions().forEach((transaction) => {
              console.log(
                `Amount: ${transaction.amount}, Date: ${transaction.date}\n`
              );
            });
          }
        });
      }
    } catch (error) {
      console.log(`Error listing customers: ${error}`);
    }
  }
}
