var { gql } = require('apollo-server-express')

// Define the schema using SDL

var typeDefs = gql`
   scalar JSON
   
   input userInput{
      uid:String
      pwd:String
   }

   input ProductInput{
      name:String
      category:String
      cost:Int
      description:String
   }

   type Product{
      name:String
      category:String
      cost:Int
      description:String
    }

   type Query {
     getProducts:[Product]
     handleLogin(userLoginData:userInput):JSON
   }

   type Mutation{
     saveProduct(productInput:ProductInput):JSON
     changePassword(id:String,newPwd:String,pwd:String):JSON
   }
`

module.exports = typeDefs;