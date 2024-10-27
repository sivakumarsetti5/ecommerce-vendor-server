const { ObjectId } = require("mongodb")
const getDb = require("../common/dbConnection")

var resolvers = {
    Query:{
        getProducts:async function(){
            try{
                var db = await getDb()
                var collection = db.collection('products')
                var result = collection.find({}).toArray()
                return result
            }catch(ex){
                console.error('getProduct Error',ex)
                return []
            }
        },
        handleLogin: async function(a,payload,c,d){
            //console.log('login data',payload)
            try{
                const db = await getDb()
                const collection = db.collection('vendors')
                const result = collection.find(payload?.userLoginData).toArray()
                return result
            }catch(ex){
                console.error('handle login',ex)
                return []
            }
        }    
    },
    Mutation:{
        changePassword:async function(a,payload,c,d){
            try{
                var db= await getDb()
                var collection = db.collection('vendors')
                const res =await collection.find({ _id: ObjectId.createFromHexString(payload?.id), pwd: payload?.pwd }).toArray()
                if(!res?.length){
                    return {
                        message:"Current Password was Wrong",
                        errorCode:1
                    }
                }
                var result = collection.updateOne({_id:ObjectId.createFromHexString(payload?.id)},{$set:{pwd:payload?.newPwd}})
                return result
            }catch(ex){

            }
        },
        saveProduct:async function(a,payload){
            try{
                var db= await getDb()
                var collection = db.collection('products')
                var result = collection.insertOne(payload.productInput)
                return result
            }catch(ex){
                console.error('save products error',ex)
                return ex.message
            }
        }
    }
}
module.exports = resolvers