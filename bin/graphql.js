var express = require('express')

var { ApolloServer } = require('apollo-server-express')

var typeDefs = require('../graphql/typeDef')
var resolvers = require('../graphql/resolvers')
var app = express();
async function startServer() {
    // Create Apollo server instance
    var server = new ApolloServer({ typeDefs, resolvers })  

    // Start the server and apply middleware to the Express app
    await server.start()
    server.applyMiddleware({ app, path: '/graphql' });

    // Start the Express server
    app.listen(2020, () => {
        console.log('Server is running on http://localhost:2020/graphql')
    })
}
startServer()