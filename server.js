const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const server = new ApolloServer({typeDefs, resolvers});
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rootadmin:rootadmin@cluster0.fpg8zxl.mongodb.net/', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});