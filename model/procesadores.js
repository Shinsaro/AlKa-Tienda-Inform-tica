var mongoose = require('mongoose');
var schema = mongoose.Schema;
//Esquema del objecte
var schemaProcesadores = new schema ({
				codprocesador: Number,
				titulo: String,
				descripcion: String
			     });
//el modulem y el fem public
module.exports = mongoose.model('procesadores',schemaProcesadores);