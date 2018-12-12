import express = require("express");
import cors = require("cors");
import * as bodyParser from "body-parser";
import graphqlHTTP = require("express-graphql");
import schema from "./schema";

const server = express();

var corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true // <-- REQUIRED backend setting
};

server.use(cors(corsOptions));


// Binding express with graphql

server.use(
    "/graphql",
    bodyParser.json(),
    (req, _, next) => {
        return next();
    },
    graphqlHTTP(req => ({
        schema,
        context: { req },
        graphiql: true
    }))
);


server.listen(4000, () => {
    console.log('express is listening for requests on port: 4000');
});
