const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString
} = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        singup : {
            type: UserType,
            args: {
                email : { type: GraphQLString },
                password : { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, request) {
                return AuthService.signup({ email, password, request });
            }
        },
        logout : {
            type: UserType,
            resolve(parentValue, { email, password }, request) {
                let { user } = request;
                request.logOut();
                return user;
            }
        },
        login : {
            type: UserType,
            args: {
                email : { type: GraphQLString },
                password : { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, request) {
                return AuthService.login({ email, password, request });
            }
        }
    })
});


module.exports = mutation;