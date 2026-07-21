// Login function that returns a Promise
function login(username) {
  return new Promise((resolve, reject) => {
    console.log("Logging in...");

    setTimeout(() => {
      if (!username || username.length < 2) {
        reject(new Error("Invalid Username"));
        return;
      }

      const user = {
        id: 1,
        name: username,
        email: `${username}@gmail.com`,
        membership: "Gold",
      };

      console.log(`Welcome ${user.name}`);
      resolve(user);
    }, 1000);
  });
}

// Select Movie function
function selectMovie(user) {
  return new Promise((resolve) => {
    console.log(`${user.name} is selecting a movie...`);

    setTimeout(() => {
      const movies = [
        {
          id: 101,
          title: "Avengers: Endgame",
          genre: "Action",
          duration: "3h 2m",
          price: 15,
        },
        {
          id: 102,
          title: "Inception",
          genre: "Sci-Fi",
          duration: "2h 28m",
          price: 12,
        },
        {
          id: 103,
          title: "The Dark Knight",
          genre: "Action",
          duration: "2h 32m",
          price: 14,
        },
        {
          id: 104,
          title: "Interstellar",
          genre: "Sci-Fi",
          duration: "2h 49m",
          price: 13,
        },
      ];

      const selectedMovie = movies[Math.floor(Math.random() * movies.length)];

      console.log(`Selected: ${selectedMovie.title} (${selectedMovie.genre})`);
      console.log(`Price: $${selectedMovie.price} per ticket`);

      resolve({
        user,
        movie: selectedMovie,
      });
    }, 1500);
  });
}

// Select Seats function
function selectSeat(data) {
  return new Promise((resolve) => {
    const { user, movie } = data;

    console.log(`${user.name} is selecting seats for ${movie.title}...`);

    setTimeout(() => {
      const seats = ["A12", "A13", "A14"];

      const numberOfSeats = seats.length;
      const totalPrice = movie.price * numberOfSeats;

      console.log(`Seats Selected: ${seats.join(", ")}`);
      console.log(
        `${numberOfSeats} seat(s) × $${movie.price} = $${totalPrice}`,
      );

      resolve({
        user,
        movie,
        seats,
        total: totalPrice,
      });
    }, 1200);
  });
}

// Make Payment function
function makePayment(booking) {
  return new Promise((resolve, reject) => {
    console.log(`Processing payment of $${booking.total}...`);

    setTimeout(() => {
      const paymentSuccess = Math.random() > 0.2;

      if (!paymentSuccess) {
        reject(new Error("Payment failed! Insufficient funds."));
        return;
      }

      const payment = {
        transactionId: "TXN" + Math.floor(Math.random() * 1000000),
        amount: booking.total,
        status: "Completed",
        method: "Credit Card",
        timeStamp: new Date().toISOString(),
      };

      console.log(
        `Payment Successful! Transaction ID: ${payment.transactionId}`,
      );
      console.log(`Amount Paid: $${payment.amount}`);

      resolve({
        booking,
        payment,
      });
    }, 2000);
  });
}

// Download Ticket function
function downloadTicket(data) {
  return new Promise((resolve) => {
    const { booking, payment } = data;

    console.log("Generating your ticket...");

    setTimeout(() => {
      const ticket = {
        ticketId: "TKT" + Math.floor(Math.random() * 10000),
        movie: booking.movie.title,
        theater: "QFX Cinema 12",
        seats: booking.seats,
        date: "2026-07-25",
        time: "7:30 PM",
        total: booking.total,
        transactionId: payment.transactionId,
        qrCode: "QR" + Math.random().toString(36).substring(2, 8),
        customer: booking.user.name,
        status: "Confirmed",
      };

      console.log("Ticket generated successfully!");

      resolve(ticket);
    }, 1000);
  });
}

// calling Promise Chain
function bookMovieTicket(username) {
  console.log("MOVIE BOOKING TICKET SYSTEM");
  console.log("=".repeat(50));

  login(username)
    .then((user) => {
      console.log("Proceeding to movie selection...");
      return selectMovie(user);
    })
    .then((data) => {
      console.log("Selecting seats...");
      return selectSeat(data);
    })
    .then((booking) => {
      console.log("Processing payment...");
      return makePayment(booking);
    })
    .then((data) => {
      console.log("Generating ticket...");
      return downloadTicket(data);
    })
    .then((ticket) => {
      console.log("\n" + "=".repeat(50));
      console.log("TICKET CONFIRMATION");
      console.log("=".repeat(50));
      console.log(`Customer: ${ticket.customer}`);
      console.log(`Movie: ${ticket.movie}`);
      console.log(`Theater: ${ticket.theater}`);
      console.log(`Seats: ${ticket.seats.join(", ")}`);
      console.log(`Date: ${ticket.date}`);
      console.log(`Time: ${ticket.time}`);
      console.log(`Total: $${ticket.total}`);
      console.log(`Ticket ID: ${ticket.ticketId}`);
      console.log(`Transaction ID: ${ticket.transactionId}`);
      console.log(`QR Code: ${ticket.qrCode}`);
      console.log(`Status: ${ticket.status}`);
      console.log("=".repeat(50));
      console.log("Enjoy your movie!");
      console.log("=".repeat(50));
    })
    .catch((error) => {
      console.log("\nERROR:", error.message);
      console.log("Please try again!");
    });
}

bookMovieTicket("Eijkeyal");
