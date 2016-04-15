var Productos = require('../model/productos.js');
module.exports = function(app){
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
		Productos.find(function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando pelicules');
				res.render('index', {productos: ProductosTienda});
			}else{
				console.log('Error');
			}
		});
	}
	productosWeb = function (req,res){
		Productos.find({tipo: req.params.producto}, function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando productos');
				res.render('productos', {productos: ProductosTienda,titulo:req.params.producto});
			}else{
				console.log('Error');
			}
		});
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

	app.get('/',indexWebLogin);
	app.get('/:producto',productosWeb);

	/*app.get('/videoclub/buscar/:codpeli',llistPeliBuscada);
	app.get('/videoclub/eliminar/:codpeli',eliminarPeli);
	app.get('/videoclub/afegir/',formulariAfegirPeli);
	app.get('/videoclub/actualitzar/',formulariActualitzarPeli);
	app.post('/videoclub/afegir',afegirPeli);
	app.post('/videoclub/actualitzar',actualitzarPeli);*/
};