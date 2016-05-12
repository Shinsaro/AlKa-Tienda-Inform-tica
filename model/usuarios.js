var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var schema = mongoose.Schema;
//Esquema del objecte
var schemaUsuarios = new schema ({
	alias: String,
	nombre: String,
	apellidos: String,
	correo: String,
	contrasena: String,
	telefono: Number,
	foto: String,
	direccionEnvio : {
		calle: String,
		numero: String,
		piso:Number,
        puerta:Number,
		cp: Number
	},
	direccionFacturacion : [{
		calle: String,
		numero: String,
		piso:Number,
        puerta:Number,
		cp: Number
	}],
	metodoPago: String,
	numeroCuenta: String,
    cuentaPaypal: String
});
// generando hash
schemaUsuarios.methods.generateHash = function(contrasena) {
    return bcrypt.hashSync(contrasena, bcrypt.genSaltSync(8), null);
};

// consultando si la contraseña es valida
schemaUsuarios.methods.validPassword = function(contrasena) {
    return bcrypt.compareSync(contrasena, this.contrasena);
};
//el modulem y el fem public
module.exports = mongoose.model('usuarios',schemaUsuarios);