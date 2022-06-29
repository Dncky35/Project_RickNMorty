const { ApolloServer } = require("apollo-server");

const typeDefs = require("./GraphQL/TypeDefiner");
const resolvers = require("./GraphQL/Resolvers/characters");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

server.listen({port:PORT}).then((res:{url:any}) => {
    console.log(`Server Ready at ${res.url}`);
});