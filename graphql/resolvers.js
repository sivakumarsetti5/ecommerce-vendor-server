var resolvers = {
    Query:{
        getStudentName:function(){
            return "Sachin"
        },
        getPlayers:function(){
            return ['Sachin','Dhoni','Kohli']
        },
        getStudents:function(){
            const data=[
                {
                    rno:1,
                    name:"Siva",
                    marks:200
                },
                {
                    rno:2,
                    name:"Deekshith",
                    marks:300
                },
                {
                    rno:3,
                    name:"Joshitha",
                    marks:400
                }
            ]
            return data
        }

    },
    Mutation:{
        saveStudent:function(a,payload,c,d){
            console.log(1,a)
            console.log(2,payload)
            console.log(3,c)
            console.log(4,d)
            return 0
        }
    }
}
module.exports = resolvers