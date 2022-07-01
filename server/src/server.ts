const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const typeDefs = require("./GraphQL/TypeDefiner");
const resolvers = require("./GraphQL/Resolvers/characters");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
});

mongoose.connect(MONGODB,  { useNewUrlParser:true}).then(() => {
    console.log('MongoDB Connected');
    return server.listen({port:PORT});
}).then((res:{url:any}) => {
    console.log(`Server running at ${res.url}`);
});
