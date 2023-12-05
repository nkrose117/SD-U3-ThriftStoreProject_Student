//? This array is not to be changed.
const salesTax = [
    {state: 'Alabama', tax: .04},
    {state: 'Alaska', tax: .00},
    {state: 'Arizona', tax: .056},
    {state: 'Arkansas', tax: .065},
    {state: 'California', tax: .0725},
    {state: 'Colorado', tax: .029},
    {state: 'Connecticut', tax: .0635},
    {state: 'Delaware', tax: .00},
    {state: 'DC', tax: .06},
    {state: 'Florida', tax: .06},
    {state: 'Georgia', tax: .04},
    {state: 'Hawaii', tax: .04166},
    {state: 'Idaho', tax: .06},
    {state: 'Illinois', tax: .0625},
    {state: 'Indiana', tax: .07},
    {state: 'Iowa', tax: .06},
    {state: 'Kansas', tax: .065},
    {state: 'Kentucky', tax: .06},
    {state: 'Louisiana', tax: .0445},
    {state: 'Maine', tax: .055},
    {state: 'Maryland', tax: .06},
    {state: 'Massachusetts', tax: .0625},
    {state: 'Michigan', tax: .06},
    {state: 'Minnesota', tax: .06875},
    {state: 'Mississippi', tax: .07},
    {state: 'Missouri', tax: .04225},
    {state: 'Montana', tax: .00},
    {state: 'Nebraska', tax: .055},
    {state: 'Nevada', tax: .0685},
    {state: 'New Hampshire', tax: .00},
    {state: 'New Jersey', tax: .06625},
    {state: 'New Mexico', tax: .05125},
    {state: 'New York', tax: .04},
    {state: 'North Carolina', tax: .0475},
    {state: 'North Dakota', tax: .05},
    {state: 'Ohio', tax: .0575},
    {state: 'Oklahoma', tax: .045},
    {state: 'Oregon', tax: .00},
    {state: 'Pennsylvania', tax: .06},
    {state: 'Rhode Island', tax: .07},
    {state: 'South Carolina', tax: .06},
    {state: 'South Dakota', tax: .06},
    {state: 'Tennessee', tax: .07},
    {state: 'Texas', tax: .0625},
    {state: 'Utah', tax: .061},
    {state: 'Vermont', tax: .06},
    {state: 'Virginia', tax: .053},
    {state: 'Washington', tax: .065},
    {state: 'West Virginia', tax: .06},
    {state: 'Wisconsin', tax: .05},
    {state: 'Wyoming', tax: .04},
];

//! Classes

// This is where I created my Product class.
class Product {
    constructor(upc, name, type, purchasePrice, quantity, marketPrice) {
      this.upc = upc;
      this.name = name;
      this.type = type;
      this.purchasePrice = purchasePrice; 
      this.quantity = quantity || 1;
      this.marketPrice = 0;
    }
  }
  
// This is where I created my Store class.
  class Store {
      constructor(name, city, state, stateTax) {
          this.name = name;
          this.location = {city, state};
          this.state = state;
          this.salesTax = stateTax;
          this.inventory = [];
          this.balance = 100;
          this.expenses = 0;
          this.profit = 0;
          this.paidTax = 0;
      }
      
//   Factory Method to create new stores.
  static createStore(name, city, state) {
      const taxRate = Store.calcSalesTax(state); //! Added calcSalesTax functionality into createStore
      return new Store(name, city, state, taxRate);
  };

  // Method to calculate sales tax based on state.
  static calcSalesTax(state) {
      let stateTax = -1; 
      for (const item of salesTax) {
          if (item.state === state) {
              stateTax = item.tax;
              break;
          }
      }
      if (stateTax >= 0) {
          return stateTax;
      } else {
          console.log(`State Not Found.`);
      }
  }
  
//   Method to add items to the stores' inventories.
  addItemToInventory(newProduct, markUpPrice) { 
      let existingItem = this.inventory.find (item => item.upc === newProduct.upc);
      if(existingItem) {
          if ((newProduct.purchasePrice * newProduct.quantity) > this.balance) {
              console.log ('Not enough money in balance');
              return
          }
          existingItem.quantity += newProduct.quantity;
      } else {
          if ((newProduct.purchasePrice * newProduct.quantity) > this.balance) {
              console.log ('Not enough money in balance');
              return
          }
          newProduct.marketPrice = newProduct.purchasePrice * (1 + markUpPrice);
          this.inventory.push(newProduct);
      }
      this.balance = this.balance - (newProduct.quantity * newProduct.purchasePrice);
      this.expenses = this.expenses + (newProduct.quantity * newProduct.purchasePrice);
  } 
 
//  Method to sell items from the stores' inventories.
  sellItemFromInventory(upc, quantityToSell) {
      let itemToSell = this.inventory.find (item => item.upc === upc);
      if(itemToSell === undefined) {
          console.log(`Item doesn't exist in inventory`);
          return
      }
      if(itemToSell && itemToSell.quantity >= quantityToSell) {
          itemToSell.quantity -= quantityToSell;
          this.profit = quantityToSell * (itemToSell.marketPrice - itemToSell.purchasePrice);
          this.balance = this.balance + this.profit;
          this.paidTax = this.paidTax + (itemToSell.marketPrice * this.salesTax);
          
          } else {
          if (! itemToSell || itemToSell.quantity < quantityToSell) {
              console.log('Not Enough Product in Stock');
          } 
      }
  }};


//! Create Stores

const thriftStoreA = Store.createStore('Store A', 'Burlington', 'Vermont');
const thriftStoreB = Store.createStore('Store B', 'Boston', 'Massachusetts');
const thriftStoreC = Store.createStore('Store C', 'Anchorage', 'Alaska');

//! Inventory

  const fenderProduct = new Product(12, 'Guitar', 'Instruments', 10, 3);
  const gibsonProduct = new Product(12, 'Guitar', 'Instruments', 5, 2 );
  const jacksonProduct = new Product(12, 'Guitar', 'Instruments', 5, 2);
  const shirtProduct = new Product(7, 'T-Shirt', 'Clothing', 4, 3);
  const microWaveProduct = new Product(3, 'Microwave', 'Appliance', 3, 5);
  const chairProduct = new Product(2, 'Chair', 'Furniture', 3, 7);
  const artProduct = new Product(11, 'Painting', 'Artwork', 2, 2);

//! Stocking

 thriftStoreA.addItemToInventory(fenderProduct, .1);
 thriftStoreA.addItemToInventory(gibsonProduct, .1);
 thriftStoreA.addItemToInventory(jacksonProduct, .1);

 thriftStoreB.addItemToInventory(chairProduct, .2);
 thriftStoreB.addItemToInventory(microWaveProduct, .2);
 thriftStoreB.addItemToInventory(artProduct, .2);
 
 thriftStoreC.addItemToInventory(shirtProduct, .1);
 thriftStoreC.addItemToInventory(artProduct, .1);
 thriftStoreC.addItemToInventory(microWaveProduct, .1);

//! Selling
  
  
  thriftStoreA.sellItemFromInventory(12, 8);  // "Not Enough Product in Stock"
  thriftStoreA.sellItemFromInventory(7, 1); // sell one shirt
  
  thriftStoreB.sellItemFromInventory(11, 2); // sell two paintings
  thriftStoreB.sellItemFromInventory(15, 3); // "Item doesn't exist in inventory".
  
  thriftStoreC.sellItemFromInventory(3, 2); // sell two shirts
  thriftStoreC.sellItemFromInventory(7, 3); //sell three microwaves
 
//! Testing

  console.log(thriftStoreA);
  console.log(thriftStoreB);
  console.log(thriftStoreC);


