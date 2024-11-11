const { ObjectId } = require("mongodb")
const getDb = require("../common/dbConnection")
const {GraphQLUpload} = require('graphql-upload')
const fs = require('fs')

var resolvers = {
    Upload:GraphQLUpload,
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
                const{file,productInput} = payload
                const { createReadStream, filename} = await file;
                // Specify the path where you want to save the uploaded file
                const stream = createReadStream();
                const uploadFilename = Date.now() + '_' + filename
                const out = fs.createWriteStream(`./uploads/${uploadFilename}`);
                stream.pipe(out);
                const inputData = {
                    ...productInput,
                    filePath : `uploads/${uploadFilename}`
                }
                const db = await getDb()
                const collection = db.collection('products')
                const result = await collection.insertOne(inputData)
                return result
            }catch(ex){
                console.error('save products error',ex)
                return ex.message
            }
        },
        deleteProduct:async function(a,payload,c,d){
            try{
                const{id,path} = payload?.data
                const _id = ObjectId.createFromHexString(id)
                const db = await getDb()
                const collection = db.collection('products')
                const res = await collection.deleteOne({_id})
                fs.unlink(path,()=>{
                    console.log(`${path} deleted`)
                })
                return res
            }catch(ex){
                console.log(ex.message)
                return {message:ex.message}
            }
        }
    }
}
module.exports = resolvers