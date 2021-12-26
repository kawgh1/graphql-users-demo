// import GraphQL library
const graphql = require("graphql");

// The entire purpose of the schema.js file is to instruct GraphQL about what kind of data
// and what kinds of properties that data has in our application

// from here we will destructure data from this library to use in our app

// we will use this GraphQLObjectType variable to instruct GraphQL
// about the presence or idea schema of a User in our app
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
    // name required
    name: "User",
    // fields required
    fields: {
        // GraphQL has its own data types
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
    },
});
