const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require('@prisma/client')
const { makeExecutableSchema } = require('apollo-server')

const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
})

const prisma = new PrismaClient()

const port = 3000;

(async() => {
    const server = new ApolloServer({
        schema: schema,
        context: () => {
            return { prisma }
        },
    });
  
    await server.listen(port, "0.0.0.0").then(({ url }) => {
        console.log(`🚀 GraphQL API ready at ${url}`);
    });
}
)();

