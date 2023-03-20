const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
title:{
    type:String,
    require:true
},
description:{
    type:String,
    require:true
},
completed:{
    type:Boolean,
    require:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    require:true
}
},{timestamps:true})

const User= mongoose.model('users',userSchema)
module.exports=User