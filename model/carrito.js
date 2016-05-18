var mongoose = require('mongoose');
var schema = mongoose.Schema,
ObjectId = schema.ObjectId;
//Esquema del objeto carrito
var schemaCarrito = new schema ({
				idProducto: ObjectId,
                cantidad: { type: Number, default: 1 },
				idUsuario: ObjectId,
				fechaCreacionCarrito: { type: Date, default: Date.now },
                finalizar: { type: Boolean, default: false }
			    });
// Lo modulamos y lo hacemos público
module.exports = mongoose.model('carritos',schemaCarrito);
