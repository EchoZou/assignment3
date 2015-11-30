//import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema; // Schema object

//build contract model
var ContractSchema = new Schema({
	contactName: String,
	contactNumber: String,
	emailAddress: String
},
{
	//use collection contracts
	collection: 'contracts'	
});




//give schema name Contract
module.exports = mongoose.model('Contract', ContractSchema);