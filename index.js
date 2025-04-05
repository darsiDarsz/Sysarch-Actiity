const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const app = express();
app.use(cors());


let movies = [
    { id: "1", title: "Spiderman", director: "Darryl", releaseYear: 2025 },
    { id: "2", title: "Iron Man", director: "Dobert DOwney", releaseYear: 2008 }
];


const typeDefs = gql`
    type Movie {
        id: ID!
        title: String!
        director: String!
        releaseYear: Int!
    }

    type Query {
        getMovies: [Movie]
        getMovie(id: ID!): Movie
    }

    type Mutation {
        addMovie(title: String!, director: String!, releaseYear: Int!): Movie
    }
`;

const resolvers = {
    Query: {
        getMovies: () => movies,
        getMovie: (_, { id }) => movies.find(movie => movie.id === id)
    },
    Mutation: {
        addMovie: (_, { title, director, releaseYear }) => {
            const newMovie = { 
                id: String(movies.length + 1), 
                title, 
                director, 
                releaseYear 
            };
            movies.push(newMovie);
            return newMovie;
        }
    }
}

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server running at http://localhost:4000/graphql");
    });
}
startServer();