# Server Hello GraphQL

express with a middleware (express-graphql) to connect with graphql

# npm run json:server
        to run json-server over db.json file listening to 3004 port
# npm run dev
        to run nodemon over server.js

# Schemas using :
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLSchema,
        GraphQLList

# RootQuery with multiple entry points

# Bidirectional on nodes of the graph  


# Queries

        query findUserOnCompany {
                uno : company(id: "1") {
			id
    	                name
    	                description
    	                users{
                                id
                                firstName
                        }
    		
                }
                dos : company(id: "2") {
			id
    	                name
    	                description
    	                users{
                                id
                                firstName
                        }
    		
                }
        }

## Queries Fragments

        query findUserOnCompany {
                uno : company(id: "1") {
			...companyDetail
    	                users{
                                id
                                firstName
                        }
                }
                dos : company(id: "2") {
			...usersCompany 		
                }
        }

        fragment companyDetail on Company {
                id
                description
                name
        }

        fragment userDetail on User {
                id
                firstName
                age
        }

        fragment usersCompany on Company {
                ...companyDetail
                users{
                        ...userDetail
                }
        }

# Mutation
        mutation {
                addUser(firstName : "santiago", age: 12, companyId: "2") {
		        firstName,
                        id,
                        age,
                        company {
                                name
                        }
                }
        }

        mutation { 
                editUser(id: "4", firstName: "Roberta"){
                        ...userDetail
                }
        }

        mutation { 
                delUser(id: "4")
        }