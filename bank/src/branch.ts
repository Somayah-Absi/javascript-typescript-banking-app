import { Customer } from "./customer";
export class Branch {
  name: string;
  customers: Customer[];
  constructor(name: string) {
    this.name = name;
    this.customers = [];
  }
  // Method to get branch name
  getName():string {
    return this.name;
  }
  // Method to get customers of the branch
  getCustomers():Customer[] {
    return this.customers;
  }
  // Method to add customer to the branch
  addCustomer(customer: Customer):boolean {
    //  check if the customer already exists
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    } else {
       throw new Error("Customer already exists in the branch.");
      ; // Customer already exists
    }
  }
  // Method to add transaction for a customer of the branch
  addCustomerTransaction(customerId: number, amount: number):boolean {
    const foundCustomer = this.customers.find(
      (customer) => customer.id === customerId
    );
    if (foundCustomer) {
      foundCustomer.addTransactions(amount);
      return true;
    } else {
  throw new Error("Customer not found in the branch.");
    }
  }
  // Method to search for customers by name
  searchCustomerByName(keyword: string): Customer[] {
    keyword = keyword.toLowerCase().trim();
    return this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(keyword)
    );
  }

  
}
