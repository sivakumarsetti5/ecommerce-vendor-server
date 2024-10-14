var { gql } = require('apollo-server-express')

// Define the schema using SDL

var typeDefs = gql`
   type Student{
     rno:Int
     name:String
     marks:Int
   }

   type Query {
     getStudentName:String                     
     getPlayers:[String]
     getStudents:[Student]
   }

   type Mutation{
     saveStudent(name:String,rno:Int):Int
   }
`

module.exports = typeDefs;