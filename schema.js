const {gql} = require('apollo-server');

const typeDefs = gql`
    enum Gender{
        male
        female
        other
    }
    type User{
        id: ID!
        username: String!
        email: String!
        password: String
    }
    type Employee{
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        gender: Gender!
        salary: Int!
    }
    type Mutation{
        signUp(username: String!, email: String!, password: String!): User!
        addEmployee(firstName: String!, lastName: String!, email: String!, gender:Gender!, salary: Int!): Employee!
        deleteEmployee(id: ID!): Employee!
        updateEmployee(
            id: ID!,
            firstName: String,
            lastName: String,
            email: String,
            gender: Gender,
            salary: Int
          ): Employee
    }
    type Query{
        login(username: String!, password: String!): User!
        allEmployees: [Employee]!
        employee(id: ID!): Employee!
    }
`;
module.exports = typeDefs;