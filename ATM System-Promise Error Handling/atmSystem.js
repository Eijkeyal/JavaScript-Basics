// Function Insert Card
function insertCard(cardNumber) {
  return new Promise((resolve, reject) => {
    console.log("Inserting Card...");

    setTimeout(() => {
      if (!cardNumber || cardNumber.length < 8) {
        reject(new Error("Invalid card number! Please try again."));
        return;
      }

      const blockedCards = ["12345678", "87654321"];

      if (blockedCards.includes(cardNumber)) {
        reject(new Error("Card has been blocked! Please contact your bank."));
        return;
      }

      const card = {
        number: cardNumber,
        type: "Debit Card",
        bank: "Global Bank",
        expiry: "12/28",
      };

      console.log(`Card accepted: ****${card.number.slice(-4)}`);
      resolve(card);
    }, 1500);
  });
}

// Function Enter PIN
function enterPIN(card, pin) {
  return new Promise((resolve, reject) => {
    console.log("Entering PIN...");

    setTimeout(() => {
      if (!pin || pin.length !== 4) {
        reject(new Error("PIN must be exactly 4 digits!"));
        return;
      }

      const correctPIN = "1234";

      if (pin !== correctPIN) {
        reject(new Error("Incorrect PIN! Please try again."));
        return;
      }

      const account = {
        ...card,
        accountNumber: `ACC${Math.floor(Math.random() * 1000000)}`,
        balance: 1500.0,
        name: "Eijkeyal",
        accountType: "Savings",
      };

      console.log(`PIN verified! Welcome ${account.name}`);
      resolve(account);
    }, 1500);
  });
}

// Function Check Balance
function checkBalance(account) {
  return new Promise((resolve) => {
    console.log(`Checking balance for ${account.name}...`);

    setTimeout(() => {
      console.log(`Current Balance: $${account.balance.toFixed(2)}`);
      resolve(account);
    }, 1200);
  });
}

// Function Withdraw Money
function withdraw(account, amount) {
  return new Promise((resolve, reject) => {
    console.log(`Withdrawing $${amount}...`);

    setTimeout(() => {
      if (amount <= 0) {
        reject(new Error("Withdrawal amount must be greater than 0."));
        return;
      }
      if (amount > 500) {
        reject(new Error("Daily Withdrawal limit is $500!"));
        return; // Fixed: Added return here
      }
      if (amount > account.balance) {
        reject(new Error("Insufficient balance."));
        return;
      }

      account.balance -= amount;
      const transaction = {
        account: account,
        amount: amount,
        remainingBalance: account.balance,
        transactionId: "TXN" + Date.now(),
        timestamp: new Date().toISOString(),
        type: "Withdrawal",
      };

      console.log(`Withdrawal Successful! $${amount} dispensed.`);
      console.log(`Remaining Balance: $${account.balance.toFixed(2)}`);

      resolve(transaction);
    }, 2000);
  });
}

// Function print Receipt
function printReceipt(transaction) {
  return new Promise((resolve, reject) => {
    console.log("Printing Receipt...");
    setTimeout(() => {
      const printWorks = Math.random() > 0.1;
      if (!printWorks) {
        reject(new Error("Printer error! Receipt not printed."));
        return;
      }
      const receipt = {
        bankName: "Global Bank",
        atmLocation: "Branch 101 - Main Street",
        transaction: transaction,
        receiptId: "RCPT" + Math.floor(Math.random() * 10000),
      };
      console.log(`Receipt Printed Successfully!`);
      resolve(receipt);
    }, 1000);
  });
}

// Error handling with promise chain
function atmTransaction(cardNumber, pin, amount) {
  console.log("Welcome to the Global Bank ATM");
  console.log("=".repeat(50));
  console.log(" ", new Date().toLocaleString());
  console.log("=".repeat(50));

  insertCard(cardNumber)
    .then((card) => {
      console.log("PIN Verification..."); // Fixed typo: "Verification"
      return enterPIN(card, pin);
    })
    .then((account) => {
      console.log("Checking Balance..."); // Fixed typo: "Banlance" → "Balance"
      return checkBalance(account);
    })
    .then((account) => {
      // Fixed typo: "acocunt" → "account"
      console.log("Processing Withdrawal");
      return withdraw(account, amount);
    })
    .then((transaction) => {
      console.log("Printing Receipt...");
      return printReceipt(transaction);
    })
    .then((receipt) => {
      console.log("\n" + "=".repeat(50));
      console.log(" TRANSACTION COMPLETED SUCCESSFULLY ");
      console.log("=".repeat(50));
      console.log(` Amount Withdrawn: $${receipt.transaction.amount}`);
      console.log(
        ` Remaining Balance: $${receipt.transaction.remainingBalance.toFixed(2)}`,
      );
      console.log(` Transaction ID: ${receipt.transaction.transactionId}`);
      console.log(` Receipt ID: ${receipt.receiptId}`);
      console.log(` Branch: ${receipt.atmLocation}`);
      console.log(
        ` Time: ${new Date(receipt.transaction.timestamp).toLocaleString()}`,
      );
      console.log("=".repeat(50));
      console.log(" Thank you for using Global Bank!");
      console.log(" Please take your card and receipt.");
      console.log("=".repeat(50));
    })
    .catch((error) => {
      console.error("\n" + " ".repeat(15));
      console.error("ERROR:", error.message);
      console.error(" ".repeat(15));
      console.log(" Please try again or contact your bank.");
      console.log("=".repeat(50));
    });
}
atmTransaction("98765432", "1234", 100);
/*
// Test cases with corrected timing
console.log("\n Test 1: Successful Transaction");
atmTransaction("98765432", "1234", 100);

// Test 2: Invalid Card wait for test 1 to complete
setTimeout(() => {
  console.log("\nTest 2: Invalid Card");
  atmTransaction("123", "1234", 100);
}, 8000);

// Test 3: Wrong PIN
setTimeout(() => {
  console.log("\nTest 3: Wrong Pin");
  atmTransaction("98765432", "9999", 100);
}, 15000);

// Test 4: Insufficient Balance
setTimeout(() => {
  console.log("\nTest 4: Isufficient Balance");
  atmTransaction("98765432", "1234", 2000);
}, 22000);

// Test 5: Blocked Card
setTimeout(() => {
  console.log("\nTest 5: Blocked Card");
  atmTransaction("12345678", "1234", 100);
}, 29000);

// Test 6: Daily Limit Exceeded
setTimeout(() => {
  console.log("\n Test 6: Daily Limit Exceeded");
  atmTransaction("98765432", "1234", 600);
}, 36000);
*/
