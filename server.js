const {ApolloServer} = require('apollo-server');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'https://101383730-comp3133-assig2-gxcr.vercel.app',
  credentials: true, // Allow credentials like cookies to be sent
};

app.use(cors(corsOptions));
const server = new ApolloServer({typeDefs, 
  resolvers,
  formatError: (err) => {
    // Log the error server-side
    console.log(err);
    // Return only the necessary error information to the client
    return {
      message: err.message,
      code: err.extensions.code, // Or any other error properties you might want to expose
    };
  },});

const mongoose = require('mongoose');

server.applyMiddleware({ app });
mongoose.connect('mongodb+srv://rootadmin:rootadmin@cluster0.fpg8zxl.mongodb.net/', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});