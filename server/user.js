var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  name: String
},{
	collection: 'users'
});


userSchema.methods.getUserInfo = function() {
  return this;
};

var User = mongoose.model('user', userSchema);
module.exports = User;
