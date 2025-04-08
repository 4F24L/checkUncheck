const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type:String, required: true },
  lastName: {type: String},
  email : {type:String, required: true, unique: true},
  password : {type:String, required: true , minLength: 6},
  groupsJoined : [{type: mongoose.Schema.Types.ObjectId, ref:'Group'}],

},
{
    timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User;