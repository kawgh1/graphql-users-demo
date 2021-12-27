const express = require("express");

// graphql
const expressGraphQL = require("express-graphql").graphqlHTTP;

// GraphQL schema
const schema = require("./schema/schema");

const app = express();

// if request comes in looking for GraphQL - route to GraphQL
// graphiql is a development tool used for testing - NOT production
app.use(
    "/graphql",
    expressGraphQL({
        schema: schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log("express server running on Port 4000");
});
