GraphQL Schema

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

-   1.) Deciding on REST API URL schema - how to structure the method calls to access very particular data - gets very tough when we have heavily nested relationships between data

-   2.) When fetching complexly-related, heavily nested data we can easily run into situations where we are making 5 or 10 HTTP REST calls to get the data we need

-   3.) Vulnerable to overfetching data - as databases grow larger and hold more data - it's more efficient for them to store data in large, many property structures - we may only need a company name to display a component but we get back a whole bunch of other stuff in the process we dont need

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
