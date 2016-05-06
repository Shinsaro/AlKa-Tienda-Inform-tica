var mongoose = require('mongoose');
var schema = mongoose.Schema,
ObjectId = schema.ObjectId;
//Esquema del objeto carrito
var schemaMarcas = new schema ({
	nombre: String,
	idProducto: [ObjectId]
});
// Lo modulamos y lo hacemos público
module.exports = mongoose.model('marcas',schemaMarcas);