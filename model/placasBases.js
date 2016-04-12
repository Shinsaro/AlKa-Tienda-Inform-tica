var mongoose = require('mongoose');
var schema = mongoose.Schema;
//Esquema del objecte
var schemaPlacasBases = new schema ({
				codplacabase: Number,
				titulo: String,
				descripcion: String
			     });
//el modulem y el fem public
module.exports = mongoose.model('placas',schemaPlacasBases);