
const {ApolloServer, PubSub, gql} = require('apollo-server');
const pubsub = new PubSub();
const PORT = 4000;

// Schema definition
const typeDefs = gql`
  type Query {
    currentNumber: Int
  }
  type Subscription {
    numberIncremented: Int
  }
`;

let currentNumber = 0;

function incrementNumber() {
    currentNumber++;
    pubsub.publish('NUMBER_INCREMENTED', {numberIncremented: currentNumber});
    setTimeout(incrementNumber, 1000);
}

// Start incrementing
incrementNumber();



// Resolver map
const resolvers = {
    Query: {
        currentNumber() {
            return currentNumber;
        }
    },
    Subscription: {
        numberIncremented: {
            subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED']),
        },
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
        path: '/subscriptions',
        onConnect: (connectionParams, webSocket, context) => {
            console.log('Client connected');
        },
        onDisconnect: (webSocket, context) => {
            console.log('Client disconnected')
        },
    },
});

server.listen().then(({url}) => {
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
    console.log('Query at studio.apollographql.com/dev')
});
