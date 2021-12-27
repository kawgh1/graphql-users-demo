# GraphQL

-   GraphQL is probably 50% about creating a good Schema and 50% about writing good queries
-   GraphQL looks like Javascript but **it is NOT Javascript**

# GraphQL Schema

-   User

    -   Property Name - Type
        -   id : Id
        -   firstName : String
        -   company_id : Id
        -   position_id : Id
        -   users [Id]

-   Company

    -   Property Name - Type
        -   id : Id
        -   name : String
        -   description : String

-   Position
    -   Property Name - Type
        -   id : Id
        -   name : String
        -   description: String

## REST-ful Routing

-   Given a collection of records on a server, there should be a uniform URL and HTTP request method tused to utilize and access that collection of records

### Headaches of complex, deeply nested REST APIs

-   #### 1.) Deciding on REST API URL schema

    -   how to structure the method calls to access very particular data - gets very tough when we have heavily nested relationships between data

-   #### 2.) Too many HTTP REST calls

    -   When fetching complexly-related, heavily nested data we can easily run into situations where we are making 5 or 10 HTTP REST calls to get a single piece of data

-   #### 3.) Vulnerable to over-fetching data

    -   as databases grow larger and hold more data - it's more efficient for them to store data in large, many property structures - we may only need a company name to display a component but we get back a whole bunch of other stuff in the process we dont need

            query {
                user(id: '23') {
                    friends() {
                        company {
                            name
                        }
                    }
                }
            }

**npm install --save express express-graphql graphql lodash**

### How GraphQL-Express server works

![how-graphql-express-server-works](https://github.com/kawgh1/graphql-users-demo/blob/main/express-server-graphql.png)

### GraphiQL Dashboard

![graphiql-dashboard](https://raw.githubusercontent.com/kawgh1/graphql-users-demo/main/graphiql-dashboard2.png)

### Big Company GraphQL Server Architecture

![big-company-server-architecture](https://raw.githubusercontent.com/kawgh1/graphql-users-demo/main/big-company-graphql-server-architecture.png)
