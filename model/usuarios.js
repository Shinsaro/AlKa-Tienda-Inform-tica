var mongoose = require('mongoose');
var schema = mongoose.Schema;
//Esquema del objecte
var schemaUsuarios = new schema ({
					codigo: Number,
					nombre: String,
					apellidos: String,
					email: String,
					contraseña: String,
					foto: String,
					direccion : {
								calle: String,
								numero: Number,
								cp: Number
							},
					metodoPago: String,
					numeroCuenta: String
			    });
//el modulem y el fem public
module.exports = mongoose.model('usuarios',schemaUsuarios);