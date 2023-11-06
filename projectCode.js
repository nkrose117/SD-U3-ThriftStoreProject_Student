// //? This array is not to be changed.
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
    console.log(state);
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

console.log('Create a product of upc 12 quantity 3');
const firstProduct = new Product(12, 'soap', 'toiletry', 300, 3);
console.log(firstProduct);

console.log('Create a store called Store A');

const thriftStoreA = Store.createStore('Store A', 'Burlington', 'Vermont');
console.log(thriftStoreA);

console.log(`Add to Store A's inventory for upc 12 quantity 3`);

let markUpPrice = .1;
thriftStoreA.addItemToInventory(firstProduct, markUpPrice);
console.log(thriftStoreA);

console.log(`Sell from Store A's inventory upc 12 quantity 1`);

thriftStoreA.sellItemFromInventory(12, 2);
console.log(thriftStoreA);

// const firstStore = new Store('New Store', 'Burlington', 'Vermont' );
// console.log(firstStore);

// const findState = firstStore.calcSalesTax(1);
// console.log(firstStore(1));






    




// Each store will need:  
// - A **name**
// - A location
//   - **City**
//   - **State**
// - A **sales tax** value
//   - *Please see note below*
// - An **inventory**
//   - Will start empty
// - A **balance**
//   - This will detail the current funds the store has. (*Don't overthink this. Start with 100 or 200*).
// - **Expenses**
//   - This should start as zero for all stores.
// - **Profit**
//   - This should start as zero for all stores
// - **Paid Tax**
//   - Will need to evaluate the sales tax and update this key.