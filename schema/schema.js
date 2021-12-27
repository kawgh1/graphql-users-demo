// import GraphQL library
const graphql = require("graphql");
// lodash is a helper library for walking thru collections of data
// const _ = require("lodash");
// axios
const axios = require("axios");

// The entire purpose of the schema.js file is to instruct GraphQL about what kind of data
// and what kinds of properties that data has in our application

// from here we will destructure data from this library to use in our app

// we will use this GraphQLObjectType variable to instruct GraphQL
// about the presence or idea schema of a User in our app
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

// hard coded array of users
// const users = [
//     { id: "23", firstName: "Bill", age: 20 },
//     { id: "37", firstName: "Samantha", age: 21 },
// ];

// Important to define CompanyType before UserType
const CompanyType = new GraphQLObjectType({
    // name required
    name: "Company",
    // because we are referencing UserType before it is defined, we turn fields into
    // an arrow function, a closure, which means the function is defined but not run until
    // the whole file is loaded (and thus after UserType is defined)
    fields: () => ({
        // GraphQL has its own data types
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios
                    .get(
                        `http://localhost:3000/companies/${parentValue.id}/users`
                    )
                    .then((response) => response.data);
            },
        },
    }),
});

const UserType = new GraphQLObjectType({
    // name required
    name: "User",
    // fields required
    fields: {
        // GraphQL has its own data types
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                // console.log(parentValue, args);
                return axios
                    .get(
                        `http://localhost:3000/companies/${parentValue.companyId}`
                    )
                    .then((response) => response.data);
            },
        },
    },
});

// the root query is what allows GraphQL to jump and  land on any data piece in the graph
// you can read this as I'm aware of the UserType and if you give GraphQL an 'id' in the args,
// GraphQL will return the User object
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            // the resolve function's purpose is to actually reach out into the database
            // and grab the data you asked for
            // parentValue is not used much
            // args is what you are giving GraphQL to find the data you want, like the user id
            resolve(parentValue, args) {
                // return local data
                // return _.find(users, { id: args.id });
                // return data from another server
                return axios
                    .get(`http://localhost:3000/users/${args.id}`)
                    .then((response) => response.data);
            },
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/companies/${args.id}`)
                    .then((response) => response.data);
            },
        },
    },
});

// Root Mutation
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            // type here refers to the type of data we will return from the resolve function
            // thus the data type you are calling the mutation on might not be the same
            // data type that is returned from that mutation
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            // resolve(parentValue, args) {
            resolve(parentValue, { firstName, age }) {
                // post
                return axios
                    .post(`http://localhost:3000/users`, { firstName, age })
                    .then((response) => response.data);
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { id }) {
                return axios
                    .delete(`http://localhost:3000/users/${id}`)
                    .then((response) => response.data);
            },
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios
                    .patch(`http://localhost:3000/users/${args.id}`, args)
                    .then((response) => response.data);
            },
        },
    },
});

// GraphQLSchema takes in a RootQuery and returns a GraphQLSchema instance
// so we export this into our server.js file and now server.js can access
// the RootQuery and the whole GraphQLSchema here
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});
