var mongoose = require('mongoose');
var schema = mongoose.Schema,
ObjectId = schema.ObjectId;
//Esquema del objeto factura
var schemaFactura = new schema ({
                idCarrito: ObjectId,
				fechaCreacionFactura: { type: Date, default: Date.now }
			    });
// Lo modulamos y lo hacemos público
module.exports = mongoose.model('factura',schemaFactura);