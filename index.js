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


//! CREATE STORES
// Generate 3 different stores, each in a different state.

//! Inventory


//! Stocking

//* First Store

//* Second Store

//* Third Store

//! Selling

//* First Store

//* Second Store

//* Third Store

//! Testing
/* 
    Simply console log each store to check the completed details.
*/

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
  
  
  
  class Store {
      constructor(name, city, state) {
          this.name = name;
          this.location = {city, state};
          this.state = state;
          this.salesTax = this.calcSalesTax(state);
          this.inventory = [];
          this.balance = 100;
          this.expenses = 0;
          this.profit = 0;
          this.paidTax = 0;
      }
      
  
  static createStore(name, city, state) {
      return new Store(name, city, state);
  };
  
  calcSalesTax(state) {
      // console.log(state);
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
          console.log(`Returning 0: isn't on the list.`);
      }
  }
  
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
  
  sellItemFromInventory(upc, quantityToSell) {
      let itemToSell = this.inventory.find (item => item.upc === upc);
      if(itemToSell && itemToSell.quantity >= quantityToSell) {
          itemToSell.quantity -= quantityToSell;
          this.profit = quantityToSell * (itemToSell.marketPrice - itemToSell.purchasePrice);
          this.balance = this.balance + this.profit;
          this.paidTax = this.paidTax + (itemToSell.marketPrice * this.salesTax);
          
          } else {
          if (! itemToSell || itemToSell.quantity < quantityToSell); {
              console.log('Out of stock.');
          }
      }
  }
  };
  
  // console.log('Create a product of upc 12 quantity 3');
  // const firstProduct = new Product(12, 'soap', 'toiletry', 300, 3);
  // console.log(firstProduct);
  
  // console.log('Create a store called Store A');
  
  // const thriftStoreA = Store.createStore('Store A', 'Burlington', 'Vermont');
  // console.log(thriftStoreA);
  
  // console.log(`Add to Store A's inventory for upc 12 quantity 3`);
  
  // let markUpPrice = .1;
  // thriftStoreA.addItemToInventory(firstProduct, markUpPrice);
  // console.log(thriftStoreA);
  
  // console.log(`Sell from Store A's inventory upc 12 quantity 1`);
  
  // thriftStoreA.sellItemFromInventory(12, 2);
  // console.log(thriftStoreA);
  
  // const firstStore = new Store('New Store', 'Burlington', 'Vermont' );
  // console.log(firstStore);
  
  // const findState = firstStore.calcSalesTax(1);
  // console.log(firstStore(1));
  
  
  // !1. Create 3 different Stores in 3 different states.
  
  const thriftStoreA = Store.createStore('Store A', 'Burlington', 'Vermont');
  // console.log(thriftStoreA);
  
  const thriftStoreB = Store.createStore('Store B', 'Boston', 'Massachusetts');
  // console.log(thriftStoreB);
  
  const thriftStoreC = Store.createStore('Store C', 'Anchorage', 'Alaska');
  // console.log(thriftStoreC);
  
  // ! 2. Create at least 3 items with the same upc.
  
  const guitarProduct = new Product(12, 'Guitar', 'Instruments', 10, 3);
  // console.log(guitarProduct);
  
  // ! 1. One store should be holding these three different items.
  
  thriftStoreA.addItemToInventory(guitarProduct, .1);
  // console.log(thriftStoreA);
  
  // ! 3. Create at least 2 items with more than 1 as their quantity.
  
  const shirtProduct = new Product(7, 'T-Shirt', 'Clothing', 4, 3);
  
  const microWaveProduct = new Product(3, 'Microwave', 'Appliance', 3, 5);
  
  const chairProduct = new Product(2, 'Chair', 'Furniture', 3, 7);
  
  const artProduct = new Product(11, 'Painting', 'Artwork', 2, 2);
  
  
  // 4. Stock each store with at least 3 items each.
  thriftStoreA.addItemToInventory(artProduct, .1);
  thriftStoreA.addItemToInventory(chairProduct, .1);
  thriftStoreA.addItemToInventory(shirtProduct, .1);
  // console.log(thriftStoreA);
  
  thriftStoreB.addItemToInventory(guitarProduct, .2);
  thriftStoreB.addItemToInventory(microWaveProduct, .2);
  thriftStoreB.addItemToInventory(artProduct, .2);
  // console.log(thriftStoreB);
  
  
  thriftStoreC.addItemToInventory();
  thriftStoreC.addItemToInventory();
  thriftStoreC.addItemToInventory();
  
  // 5. Sell at least 1 item from each store.
  //    1. Show that you have tested:
  //       1. Trying to sell an item that doesn't have enough in stock.
  //       2. Trying to sell an item that is less than the quantity desired.
  // 6. Within the **Testing** area of the file (bottom of the document), `console.log` each store.