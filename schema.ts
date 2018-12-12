const graphql = require('graphql');
const knexConfig = require("./db/knex").development;
const knex = require("knex")(knexConfig);
require("dotenv").config();
const accountSid = process.env.TWILIO1
const authToken = process.env.TWILIO2
const client = require('twilio')(accountSid, authToken);

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        number: { type: GraphQLString },
        body: { type: GraphQLString }
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return null
            }
        },

    }

});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        sendSMS: {
            type: UserType,
            args: {
                number: { type: GraphQLString },
                body: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const data = await knex.insert({ number: args.number }).table('users').returning('id')
                try {
                    client.messages
                        .create({
                            body: `${args.body}`,
                            from: '+19292425545',
                            statusCallback: 'http://postb.in/1234abcd',
                            to: `${args.number}`
                        })
                        .then(message => console.log(message.sid))
                        .done();

                } catch (error) {
                    console.log(error)
                }


            }
        },

    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});