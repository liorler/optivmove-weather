var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  searches: [
    {
      cityName: String,
      timestamp: String
    }
  ]
},{
	collection: 'users-search'
});


userSchema.methods.getUserSearches = function() {
  return this.searches;
};

var UserSearch = mongoose.model('userSearch', userSchema);
module.exports = UserSearch;
