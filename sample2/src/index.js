import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';

const app = express();

const schema = gql`
    type Query {
        whoami: String
        students: [Student]
        findStudent(sid: ID!): Student
    }

    type Student {
        name: String
        id: ID
    }
`

const studentList = [
    {name: "Mohsin", id: 1},
    {name: "Daniyal", id: 2},
    {name: "Aamir", id: 3},
    {name: "Yousuf", id: 4},
];

const resolvers = {
    Query: {
        whoami: () => {
            return "Daniyal"
        },
        students: () => {
            return studentList;
        },
        findStudent: (_, args) => {

            const result = studentList.find((stdObj) => {
                return stdObj.id == args.sid
            })
            return result;
        }
    },
};


const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});