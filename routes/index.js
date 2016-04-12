var path = require('path');
var Productos = require('../model/productos.js');
module.exports = function(app){
	llistarPlacas = function (req, res){
		Productos.find(function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando pelicules');
				res.render('productos', {productos: ProductosTienda});
			}else{
				console.log('Error');
			}
		});
	}
	/*llistPeliBuscada = function (req,res){
		Pelis.find({codpeli: req.params.codpeli}, function (err,result){
			if (result.length == 0){
				res.send('La pelicula no existe');
			} else {
				/*res.send(result);
				res.render('listarUnaPeli', {pelis: result});
				console.log('Listando Pelicula');
			}
		});
	}
	eliminarPeli = function (req,res){
		Pelis.remove({codpeli: req.params.codpeli}, function (err,result){
			if (result.length == 0){
				res.send('La pelicula no existe');
			} else {
				res.render('peliAccio', {title : "elimada",codpeli : req.params.codpeli,accio : "elimada"});
				console.log('Eliminando Pelicula');
			}
		});
	}*/
	indexWebLogin = function (req,res){
		res.render('menu_piedepagina');
	}
	/*formulariActualitzarPeli = function (req,res){
		res.render('formPeliActualizar');
	}
	afegirPeli = function (req,res){
		var cod = req.body.codpeli;
		var tit = req.body.titol;
		var sin = req.body.sinopsis;
		var peliculaAfegir = new Pelis({
			codpeli:cod,
			titol:tit,
			sinopsis:sin
		});
		peliculaAfegir.save({codpeli:cod,titol:tit,sinopsis:sin}, function (err,result){
			res.render('peliAccio', {title : "afegida",codpeli : cod,accio : "afegida"});
			console.log('Afegint Pelicula');
		});
    }
    actualitzarPeli = function (req,res){
    	var cod = req.body.codpeli;
		var tit = req.body.titol;
		var sin = req.body.sinopsis;
    	Pelis.update({ codpeli:cod },{codpeli:cod,titol:tit,sinopsis:sin},function (err,result){
    		res.render('peliAccio', {title : "actualitzada",codpeli : cod,accio : "actualitzada"});
			console.log('Actualitzant Pelicula');
    	});
    }*/

	app.post('/login',llistarPlacas);
	app.get(
		'/',function (req,res) {
			res.sendFile(path.resolve(__dirname+'../public/index.html'));
			/*res.render('angelito',{angel:"¡¿Angelito, qué te pasaaaa?!"});*/
		}
	);
	/*app.get('/videoclub/buscar/:codpeli',llistPeliBuscada);
	app.get('/videoclub/eliminar/:codpeli',eliminarPeli);
	app.get('/videoclub/afegir/',formulariAfegirPeli);
	app.get('/videoclub/actualitzar/',formulariActualitzarPeli);
	app.post('/videoclub/afegir',afegirPeli);
	app.post('/videoclub/actualitzar',actualitzarPeli);*/
};