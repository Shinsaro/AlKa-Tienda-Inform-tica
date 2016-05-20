var mongoose = require('mongoose');
var schema = mongoose.Schema;
ObjectId = schema.ObjectId;
//Esquema del objeto producto
var schemaProductos = new schema ({
				nombre: String,
				descripcion: String,
				precio: Number,
				marca : ObjectId,
				valoracion: [
                    {
                        usuario: ObjectId,
                        valor: Number
                    }
                ],
				tipo : String,
				foto: String,
                caracteristicas: [String],
                especificaciones: [
                        {
                            nombre: String,
                            caracteristicas: [String]
                        }
                ],
                comentario: [
                        {
                            alias: String,
                            foto: String,
                            opinion: String
                        }
                    ]
			    });
// Lo modulamos y lo hacemos público
module.exports = mongoose.model('productos',schemaProductos);
