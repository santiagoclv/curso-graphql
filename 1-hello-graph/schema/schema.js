const GraphQL = require('graphql');
var axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3004';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// interceptor to make data the response. I don't care about the status and stuff
axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});


const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLSchema,
        GraphQLList,
        GraphQLNonNull
} = GraphQL;

const CompanyType = new GraphQLObjectType({
        name: 'Company',
        fields: () => ({
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                users : {
                        type : new GraphQLList(UserType),
                        resolve(parentValue, args) {
                                return axios.get(`/companies/${parentValue.id}/users`);
                        }
                }
        })
});

const UserType = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
                id: { type: GraphQLString },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                company: {
                        type: CompanyType,
                        resolve(parentValue, args) {
                                return axios.get(`/companies/${parentValue.companyId}`);
                        }
                }

        })
});

const query = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
                user: {
                        type: UserType,
                        args: { id: { type: GraphQLString } },
                        resolve(parentValue, args) {
                                return axios.get(`/users/${args.id}`);;
                        }
                },
                company: {
                        type: CompanyType,
                        args: { id: { type: GraphQLString } },
                        resolve(parentValue, args) {
                                return axios.get(`/companies/${args.id}`);
                        }
                }
        })
});

const mutation = new GraphQLObjectType({
        name: 'RootMutation',
        fields: () => ({
                addUser: {
                        type: UserType,
                        args: { 
                                firstName: { type: new GraphQLNonNull(GraphQLString) },
                                age: { type: new GraphQLNonNull(GraphQLInt) },
                                companyId: { type: GraphQLString }
                        },
                        resolve(parentValue, args) {
                                return axios.post('/users', args);
                        }
                },
                delUser: {
                        type: UserType,
                        args: { 
                                id: { type: new GraphQLNonNull(GraphQLString) }
                        },
                        resolve(parentValue, args) {
                                return axios.delete(`/users/${args.id}`);
                        }
                },
                editUser: {
                        type: UserType,
                        args: { 
                                id: { type: new GraphQLNonNull(GraphQLString) },
                                firstName: { type: new GraphQLNonNull(GraphQLString) },
                                age: { type: GraphQLInt },
                                companyId: { type: GraphQLString }
                        },
                        resolve(parentValue, args) {
                                return axios.patch(`/users/${args.id}`, args);
                        }
                }
        })
});

module.exports = new GraphQLSchema({ query, mutation  });