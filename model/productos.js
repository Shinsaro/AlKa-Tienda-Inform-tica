var mongoose = require('mongoose');
var schema = mongoose.Schema;
//Esquema del objecte
var schemaProductos = new schema ({
				nombre: String,
				descripcion: String,
				tipo : String,
				foto: String
			     });
//el modulem y el fem public
module.exports = mongoose.model('productos',schemaProductos);