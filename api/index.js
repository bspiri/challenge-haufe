const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  port: 5000,
});

server.route({
  method: "GET",
  path: "/",
  handler: (req, h) => {
    return "Hello from HapiJS!";
  },
});

server.start();
console.log("Server running on %s", server.info.uri);
