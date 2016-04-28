var Productos = require('../model/productos.js');
var Usuarios = require('../model/usuarios.js');
var Carrito = require('../model/carrito.js');
var mongoose = require('mongoose');

module.exports = function(app,passport){
	/*
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
	indexWeb = function (req,res){
		Productos.find(function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando pelicules');
				res.render('index', {
					titulo: "AlKa Tienda Informatica",
					alias:"",
					home : "/home" ,
					carrito: "",
					productos: ProductosTienda,
					modal:"modal",
					nameTarget: "#myModal",
					entrarSalir: "Log In",
					placaBase:"/home/category/placa base",procesadores:"/home/category/procesadores"
				});
			}else{
				console.log('Error');
			}
		});
	}
	indexWebLogin = function (req,res){
		if (idProductoCarrito == undefined) {
			var idProductoCarrito = [];
		}
		Carrito.find({idUsuario: req.user._id}, function (err,carritoUsuario){
			for (var i = 0; i < carritoUsuario.length; i++) {
				idProductoCarrito.push(mongoose.Types.ObjectId(carritoUsuario[i].idProducto));
			}
			Productos.find({_id: {$in : idProductoCarrito}}, function (err,ProductosCarrito){
				Productos.find(function (err,ProductosTienda){
					if(!err){
						console.log('Mostrando pelicules');
						res.render('index', {
							titulo: "AlKa Tienda Informatica",
							home : "/user/home" ,
							alias:req.user.alias,
							productos: ProductosTienda,
							carrito: ProductosCarrito,
							modal:"modal",
							nameTarget:"#profileModal",
							entrarSalir: "Mi perfil",
							placaBase:"/user/home/category/placa base",
							procesadores:"/user/home/category/procesadores"
						});
					}else{
						console.log('Error');
					}
				});
			});
		});
	}
	productosWeb = function (req,res){
		Productos.find({tipo: req.params.producto}, function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando productos');
				res.render('productos', {
					alias:"",
					home : "/home" ,
					carrito: "",
					productos: ProductosTienda,
					titulo:req.params.producto,
					modal:"modal",
					nameTarget:"#myModal",
					entrarSalir: "Log In",
					placaBase:"/home/category/placa base",
					procesadores:"/home/category/procesadores"
				});
			}else{
				console.log('Error');
			}
		});
	}
	productosWebLogin = function (req,res){
		if (idProductoCarrito == undefined) {
			var idProductoCarrito = [];
		}
		Carrito.find({idUsuario: req.user._id}, function (err,carritoUsuario){
			for (var i = 0; i < carritoUsuario.length; i++) {
				idProductoCarrito.push(mongoose.Types.ObjectId(carritoUsuario[i].idProducto));
			}
			Productos.find({_id: {$in : idProductoCarrito}}, function (err,ProductosCarrito){
				Productos.find(function (err,ProductosTienda){
					if(!err){
						console.log('Mostrando productos');
						res.render('productos', {
							home : "/user/home/" ,
							alias:req.user.alias,
							productos: ProductosTienda,
							carrito: ProductosCarrito,
							titulo:req.params.producto,
							modal:"modal",
							nameTarget:"#profileModal",
							entrarSalir: "Mi perfil",
							placaBase:"/user/home/category/placa base",
							procesadores:"/user/home/category/procesadores"
						});
					}else{
						console.log('Error');
					}
				});
			});
		});
	}
	miperfil = function (req,res){
		res.render('perfil',{
			calle:req.user.direccionEnvio.calle,
			numero:req.user.direccionEnvio.numero,
			piso:req.user.direccionEnvio.piso,
			cp:req.user.direccionEnvio.cp,
			correo:req.user.correo,
			telefono:req.user.telefono,
			apellidos:req.user.apellidos,
			nombre: req.user.nombre,
			fotoPerfil: req.user.foto,
			alias: req.user.alias,
			home : "/user/home",
			titulo:"Mi perfil",
			modal:"modal",
			nameTarget: "#profileModal",
			entrarSalir: "Mi perfil",
			placaBase:"/user/home/category/placa base",
			procesadores:"/user/home/category/procesadores"
		});
	}
	actualitzarPerfil = function (req,res){
		var calle = req.body.calle,
			numero = req.body.numero,
			piso = req.body.piso,
			cp = req.body.cp,
			telefono = req.body.telefono,
			apellidos = req.body.apellidos,
			nombre = req.body.nombre;
		Usuarios.update({correo:req.user.correo},
						{	'direccionEnvio.calle':calle,
							'direccionEnvio.numero':numero,
							'direccionEnvio.piso':piso,
							'direccionEnvio.cp':cp,
							telefono:telefono,
							apellidos:apellidos,
							nombre:nombre
						},
						function(err,result){
					   		console.log('Perfil actualitzado');
					   		res.redirect('/user/home/miperfil');
					   	});
	}
	subirFoto = function(req, res) {
	   //El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
	   var ruta = require('path');
	   var fs = require('fs'), path = req.files.archivo.path;
	   var newPath = ruta.join(__dirname,'../public/images/fotosPerfilUsuarios/'+req.user.alias);
	   var is = fs.createReadStream(path);
	   var os = fs.createWriteStream(newPath);
	   is.pipe(os);
	   is.on('end', function() {
	      //eliminamos el archivo temporal
	      fs.unlinkSync(path);
	   });
	   var fotoUsuario = "/images/fotosPerfilUsuarios/"+req.user.alias;
	   Usuarios.update({correo:req.user.correo},{foto:fotoUsuario},function(err,result){
	   		console.log('Foto actualitzada en el documente del usuario logueado');
	   		res.redirect('/user/home/miperfil');
	   });
	};
	registerWeb = function (req,res){
		res.render('redirigir',{
			alias:"",
			home : "/home" ,
			titulo:"Registro correcto",
			texto:"Cuenta creada con exito, por favor proceda a loguearse ahora.",
			modal:"modal",
			nameTarget: "#myModal",
			entrarSalir: "Log In",
			placaBase:"/home/placa base",
			procesadores:"/home/procesadores"
		});
		console.log("Usuario añadido");
	}
	loginWeb = function (req,res){
		res.render('redirigir',{
			alias:req.user.alias,
			home : "/user/home" ,
			titulo:"Log In",
			texto:"Proceda a loguearse.",
			nameTarget:"#profileModal",
			entrarSalir: "Mi perfil",
			placaBase:"/user/home/category/placa base",
			procesadores:"/user/home/category/procesadores"
		});
	}
	logoutWeb = function(req, res) {
        req.logout();
        res.redirect('/home');
    };
    realizarPedido = function (req,res){
		// Función que envía los productos...
		Productos.find(function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando productos añadidos al pedido');
				res.render('pedido', {productos: ProductosTienda});
			}else{
				console.log('Error al mostrar los productos añadidos al pedido. '+err);
			}
		});
	}
    
    // Funciones del carrito
    
    // Función que añade un producto al carrito
    anadirProductoCarrito = function (req,res){
        /*console.log("Añadiendo producto al carrito");*/
        var usuarioObjID = "";
        console.log("body de objeto que añadoir al carro : " + req.body.id);
        Usuarios.findOne({correo:req.user.correo},function (err,usuarioID){
        	usuarioObjID = usuarioID._id;
        	var carrito = new Carrito ({
        		idProducto:req.body.id,
        		idUsuario: usuarioObjID
        	});
        	carrito.save({idProducto:req.body.id,idUsuario:usuarioObjID},function (err,carritoProductos){
        		console.log(carritoProductos);
        		res.redirect('back');
        	});
    	});
    }    

	/*
    actualitzarPeli = function (req,res){
    	var cod = req.body.codpeli;
		var tit = req.body.titol;
		var sin = req.body.sinopsis;
    	Pelis.update({ codpeli:cod },{codpeli:cod,titol:tit,sinopsis:sin},function (err,result){
    		res.render('peliAccio', {title : "actualitzada",codpeli : cod,accio : "actualitzada"});
			console.log('Actualitzant Pelicula');
    	});
    }*/

	app.get('/home',indexWeb);
	app.get('/user/home',isLoggedIn,indexWebLogin);
	app.get('/home/category/:producto',productosWeb);
	app.get('/user/home/category/:producto',isLoggedIn,productosWebLogin);
	app.get('/user/home/logout',isLoggedIn,logoutWeb);
	app.get('/user/home/miperfil',isLoggedIn,miperfil);
	app.post('/user/home/user/home/miperfil/actualizarDatos',isLoggedIn,actualitzarPerfil);
	app.post('/user/home/miperfil/upload',isLoggedIn,subirFoto);
	app.post('/home/login',passport.authenticate('local-login',{ successRedirect : '/user/home', failureRedirect : '/home', failureFlash : true }),loginWeb);
	app.post('/home/register',passport.authenticate('local-register',{ successRedirect : '/home', failureRedirect : '/home', failureFlash : true }),registerWeb);
    app.get('/pedido',realizarPedido);
    app.post('/anadeProductoCarrito', isLoggedIn, anadirProductoCarrito);
    app.delete('/quitaProductoCarrito', quitarProductoCarrito);    

	/*app.get('/videoclub/buscar/:codpeli',llistPeliBuscada);
	app.get('/videoclub/actualitzar/',formulariActualitzarPeli);
	app.post('/videoclub/actualitzar',actualitzarPeli);*/
};
function isLoggedIn(req, res, next) {
    // si esta autenticado en la sesion, sigue adelante 
    if (req.isAuthenticated())
    	return next();
    // sino lo redirigimos a la pagina de inicio.
    res.redirect('/home');
}