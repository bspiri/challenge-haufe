const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");

const server = Hapi.server({
  port: 5000,
});

Mongoose.connect("mongodb://localhost:27017");

const MovieModel = Mongoose.model("movie", {
  title: String,
  date: Date,
});

server.route({
  method: "GET",
  path: "/",
  handler: (req, h) => {
    return "Hello from HapiJS!";
  },
});

server.route({
  method: "POST",
  path: "/movie",
  handler: async (req, h) => {
    try {
      var movie = new MovieModel(req.payload);
      var result = await movie.save();
      return h.response(result);
    } catch (err) {
      return h.response(err).code(500);
    }
    h(req.payload);
  },
});

server.start((error) => {
  if (error) {
    throw error;
  }
  console.log("Server running on %s", server.info.uri);
});
