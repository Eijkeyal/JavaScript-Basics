const http = require("http");

const server = http.createServer((req, res) => {
  // for GET route
  if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Users API",
      }),
    );
  }

  // for POST route
  else if (req.url === "/users" && req.method === "POST") {
    res.writeHead(200, { "Content-Type": "json" });
    res.end(
      JSON.stringify({
        message: "User created",
      }),
    );
  }
  //for PUT route
  else if (req.url === "/users" && req.method === "PUT") {
    res.writeHead(200, { "content-type": "json" });
    res.end(
      JSON.stringify({
        message: "Data Updated",
      }),
    );
  }
  //for Delete Route
  else if (req.url === "/users" && req.method === "DELETE") {
    res.writeHead(200, { "content-type": "json" });
    res.end(
      JSON.stringify({
        message: "Users Deleted",
      }),
    );
  } else {
    res.writeHead(404);
    res.end("Page not Available");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`This server is running on http://localhost:${PORT}`);
});
/*
const http = require('http');
const server1 = createServer((req,res)=>{

});
const PORT1 = 3000;
server1.listen.apply(PORT,()=>{

});
*/
