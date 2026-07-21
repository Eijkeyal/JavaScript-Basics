const { timeStamp } = require("node:console");

//functions login users
function loginUser(username, callback) {
  console.log("Logging in...");

  setTimeout(() => {
    const user = {
      id: 1,
      name: username,
      email: `${username}@gmail.com`,
      address: "Bagdol",
    };

    console.log(`Welcome ${username}`);
    callback(user);
  }, 1000);
}
//function selectResturant
function selectRestaurant(user, callback) {
  console.log(`${user.name} is looking for restaurants...`);

  setTimeout(() => {
    const restaurant = {
      id: 101,
      name: "Tasty Bites",
      cuisine: "Multi-Cuisine",
      rating: 4.5,
      location: "Downtown",
    };

    console.log(`Selected: ${restaurant.name} (${restaurant.rating})`);

    callback(restaurant);
  }, 1200);
}
// functions selectFood
function selectFood(restaurant, callback) {
  console.log(`Browsing menu at ${restaurant.name}...`);
  setTimeout(() => {
    const order = {
      items: [
        { name: "Margherita Pizza", price: 12.99, quantity: 2 },
        { name: "Garlic Bread", price: 4.99, quantity: 1 },
        { name: "Coca-Cola", price: 2.99, quantity: 3 },
      ],
      restaurant: restaurant.name,
      specialInstructions: "Extra cheese on pizza",
    };
    console.log(`Added ${order.items.length} items to cart`);
    callback(order);
  }, 1500);
}
//functions calculateBill
function calculateBill(order, callback) {
  console.log("Calculating your Bill....");
  setTimeout(() => {
    let subtotal = 0;
    for (let i = 0; i < order.items.length; i++) {
      subtotal += order.items[i].price * order.items[i].quantity;
    }
    const tax = subtotal * 0.13; //13% service tax
    const deliveryFee = 3.99;
    const total = subtotal + deliveryFee + tax;

    const bill = {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2),
      items: order.items,
    };
    console.log(`Bill Calculated:${bill.total}`);
    callback(bill);
  }, 1300);
}
//function processPayment
function processPayment(bill, callback) {
  console.log(`Process Payment of $${bill.total}...`);
  setTimeout(() => {
    const payment = {
      amount: bill.total,
      status: "Successful",
      transactionId: "TXN" + Math.floor(Math.random() * 10000000),
      paymentMethod: "Credit Card",
      timeStamp: new Date().toISOString(),
    };
    console.log(`Payment ${payment.status}!`);
    callback(payment);
  }, 1400);
}
//function deliverOrder
function deliverOrder(payment, callback) {
  console.log(`Preparing for delivery...`);
  setTimeout(() => {
    const delivery = {
      estimatedTime: "25-30 minutes",
      deliveryPartner: "FoodMandu",
      trackingId: "TRK" + Math.floor(Math.random() * 10000),
      status: "Out of Delivery",
      eta: new Date(Date.now() + 30 * 60000).toLocaleTimeString(),
    };
    console.log("Order is out for delivery");
    callback(delivery);
  }, 1600);
}
function orderFood(username) {
  console.log("WELCOME TO FOOD DELIVERY SYSTEM");
  console.log("=".repeat(50));

  loginUser(username, function (user) {
    selectRestaurant(user, function (restaurant) {
      selectFood(restaurant, function (order) {
        calculateBill(order, function (bill) {
          processPayment(bill, function (payment) {
            deliverOrder(payment, function (delivery) {
              console.log("\n" + "=".repeat(50));
              console.log("ORDER CONFIRMATION");
              console.log("=".repeat(50));
              console.log(`Customer: ${user.name}`);
              console.log(`Restaurant: ${restaurant.name}`);
              console.log(
                `Items: ${order.items.map((i) => i.name).join(", ")}`,
              );
              console.log(`Total: $${bill.total}`);
              console.log(`Payment: ${payment.status}`);
              console.log(`Delivery: ${delivery.status}`);
              console.log(`ETA: ${delivery.eta}`);
              console.log(`Tracking: ${delivery.trackingId}`);
              console.log("=".repeat(50));
              console.log("Enjoy your meal!");
              console.log("=".repeat(50));
            });
          });
        });
      });
    });
  });
}

orderFood("Jessica");
