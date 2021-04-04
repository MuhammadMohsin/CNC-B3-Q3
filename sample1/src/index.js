import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {uuid} from 'uuidv4';

const app = express();

const schema = gql`

    type Student {
        name: String
        id: ID
    }

    type Query {
        whoami: String
        students: [Student]
        findStudent(sid: ID!): Student
    }

    type Mutation {
        addStudent(name: String!): Student
        deleteStudent(sid: ID!): ID
    }

`

const studentList = [
    {name: "Mohsin", id: 1}
];

const resolvers = {
    Query: {
        whoami: (_, args, {currentStd}) => {
            console.log(currentStd)
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
    Mutation: {
        addStudent: (_, args) => {
            const lastId = studentList[studentList.length - 1].id
            const newStudent = {
                name: args.name,
                // id: lastId + 1
                id: uuid()
            }
            studentList.push(newStudent);
            return newStudent;
        },

        deleteStudent: (_, args) => {
            let stdIndex = -1
            studentList.forEach((sObj, ind) => {
                if (sObj.id == args.sid) {
                    stdIndex = ind;
                }
            });

            studentList.splice(stdIndex, 1);

            return args.sid;
        }
    }
};


const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        currentStd: studentList[0]
    }
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});