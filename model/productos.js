var mongoose = require('mongoose');
var schema = mongoose.Schema;
//Esquema del objeto producto
var schemaProductos = new schema ({
				nombre: String,
				descripcion: String,
				precio: Number,
				valoracion: Number,
				tipo : String,
				foto: String
			    });
// Lo modulamos y lo hacemos público
module.exports = mongoose.model('productos',schemaProductos);