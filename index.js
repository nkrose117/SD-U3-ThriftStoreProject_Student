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
      
//   Factory Method to create new stores.
  static createStore(name, city, state) {
      return new Store(name, city, state);
  };

//   Method to calculate sales tax based on state.
  calcSalesTax(state) {
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
          newProduct.marketPrice = newProduct.marketPrice.toFixed(2);
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
          this.profit = this.profit.toFixed(2);
          this.balance = this.balance + this.profit;
          this.paidTax = this.paidTax + (itemToSell.marketPrice * this.salesTax);
          
          } else {
          if (! itemToSell || itemToSell.quantity < quantityToSell); {
              console.log('Not Enough Product in Stock');
          } 
      }
  }};


//! CREATE STORES
const thriftStoreA = Store.createStore('Store A', 'Burlington', 'Vermont');
// console.log(thriftStoreA);

const thriftStoreB = Store.createStore('Store B', 'Boston', 'Massachusetts');
// console.log(thriftStoreB);

const thriftStoreC = Store.createStore('Store C', 'Anchorage', 'Alaska');
// console.log(thriftStoreC);


//! Inventory

  //! Create at least 3 items with the same upc.
  
  const guitarProduct = new Product(12, 'Guitar', 'Instruments', 10, 3);

  //! One store should be holding these three different items.
  
  thriftStoreA.addItemToInventory(guitarProduct, .1);
  //   console.log(thriftStoreA); 
 
   // ! 3. Create at least 2 items with more than 1 as their quantity.
  
  const shirtProduct = new Product(7, 'T-Shirt', 'Clothing', 4, 3);
  
  const microWaveProduct = new Product(3, 'Microwave', 'Appliance', 3, 5);
  
  const chairProduct = new Product(2, 'Chair', 'Furniture', 3, 7);
  
  const artProduct = new Product(11, 'Painting', 'Artwork', 2, 2);


//! Stocking

 // ! 4. Stock each store with at least 3 items each.
 thriftStoreA.addItemToInventory(artProduct, .1);
 thriftStoreA.addItemToInventory(chairProduct, .1);
 thriftStoreA.addItemToInventory(shirtProduct, .1);
 // console.log(thriftStoreA);

 
 thriftStoreB.addItemToInventory(guitarProduct, .2);
 thriftStoreB.addItemToInventory(microWaveProduct, .2);
 thriftStoreB.addItemToInventory(artProduct, .2);
 // console.log(thriftStoreB);
 
 
 thriftStoreC.addItemToInventory(shirtProduct, .1);
 thriftStoreC.addItemToInventory(artProduct, .1);
 thriftStoreC.addItemToInventory(microWaveProduct, .1);
 // console.log(thriftStoreC);


//! Selling

// ! 5. Sell at least 1 item from each store.
  
  //! A
  thriftStoreA.sellItemFromInventory(12, 5);//! Trying to sell an item that is less than the quantity desired.
  // console.log(thriftStoreA);         // "Not Enough Product in Stock"
  
  thriftStoreA.sellItemFromInventory(7, 1); // sell one shirt
  // console.log(thriftStoreA); 
  
  //! B
  thriftStoreB.sellItemFromInventory(11, 2); // sell two paintings
  
  thriftStoreB.sellItemFromInventory(15, 3); //! Trying to sell an item that isn't in the inventory.
  // console.log(thriftStoreB);         // "Item doesn't exist in inventory".
  
  //! C
  
  thriftStoreC.sellItemFromInventory(3, 2); // sell two shirts
  
  thriftStoreC.sellItemFromInventory(7, 3); //sell three microwaves
  // console.log(thriftStoreC);

//! Testing

  console.log(thriftStoreA);
  console.log(thriftStoreB);
  console.log(thriftStoreC);