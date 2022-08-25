const mongoose = require('mongoose');
//Collection to store details of Role
const roleScheama= new mongoose.Schema({
    role:{
        type:String,
        unique:true
    },
//    user:{ type:mongoose.Schema.Types.ObjectId,
//           ref: "User"},
    status:String
})
module.exports = mongoose.model('Role', roleScheama);