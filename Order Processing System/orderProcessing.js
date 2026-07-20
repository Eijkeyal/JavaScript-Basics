//Login user call function
function loginUser(username, callback) {
  console.log("Logging in.....");
  setTimeout(() => {
    console.log("User Logged in");
    callback(username);
  }, 1000);
}

//getCart functions
function getCart(username, callback) {
  console.log("Getting Cart...");
  setTimeout(() => {
    const cart = {
      items: [
        { name: "Apple", price: 30 },
        { name: "Orange", price: 20 },
        { name: "Banana", price: 30 },
        { name: "Juice", price: 20 },
        { name: "Noodels", price: 30 },
        { name: "Papaya", price: 20 },
        { name: "Qiwi", price: 30 },
        { name: "Dragon Fruit", price: 20 },
      ],
    };
    console.log("Cart Fetched");
    callback(cart);
  }, 1500);
}

//calculateTotal function
function calculateTotal(cart, username, callback) {
  console.log("Calculating total...");

  setTimeout(() => {
    let total = 0;

    for (let i = 0; i < cart.items.length; i++) {
      total += cart.items[i].price;
    }

    console.log(`The total sum of ${username}'s cart is ${total}`);
    callback(total);
  }, 1600);
}
//placeOrder function
function placeOrder(username, cart, total, callback) {
  console.log("Placing order...");

  setTimeout(() => {
    const order = {
      orderId: 101,
      username,
      items: cart.items,
      total,
      status: "success",
    };

    console.log("Order Successfully");
    callback(order);
  }, 1700);
}
//callback chain
loginUser("Eijkeyal", (username) => {
  console.log(`Welcome ${username}`);

  getCart(username, (cart) => {
    console.log(cart);

    calculateTotal(cart, username, (total) => {
      console.log("Final Total:", total);

      placeOrder(username, cart, total, (order) => {
        console.log("Your order is placed.");
        console.log(order);
      });
    });
  });
});
