var { gql } = require('apollo-server-express')

// Define the schema using SDL

var typeDefs = gql`
   scalar JSON
   scalar Upload
   
   input userInput{
      uid:String
      pwd:String
   }

   input ProductInput{
      name:String
      category:String
      cost:Int
      description:String
      vendorId:String
   }
   input UpdateProductInput{
      id:String
      name:String
      category:String
      cost:Int
      description:String
      filePath:String
   }

   type Product{
      _id:String
      name:String
      category:String
      cost:Int
      description:String
      filePath:String
    }
    input deleteProductInput{
     id:String
     path:String
    }

   type Query {
     getProducts(vendorId:String):[Product]
     handleLogin(userLoginData:userInput):JSON
   }

   type Mutation{
     saveProduct(file:Upload,productInput:ProductInput):JSON
     updateProduct(file:Upload,productInput:UpdateProductInput):JSON
     changePassword(id:String,newPwd:String,pwd:String):JSON
     deleteProduct(data:deleteProductInput):JSON
   }
`

module.exports = typeDefs;