var Productos = require('../model/productos.js');
var Usuarios = require('../model/usuarios.js');
var Carrito = requiere('../model/carrito.js');

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
					message: "",
					productos: ProductosTienda,modal:"modal",
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
		Productos.find(function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando pelicules');
				res.render('index', {
					titulo: "AlKa Tienda Informatica",
					home : "/user/home" ,
					alias:req.user.alias,
					message: req.flash('loginMessage'),
					productos: ProductosTienda,
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
	}
	productosWeb = function (req,res){
		Productos.find({tipo: req.params.producto}, function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando productos');
				res.render('productos', {
					alias:"",
					home : "/home" ,
					message: "",
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
		Productos.find({tipo: req.params.producto}, function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando productos');
				res.render('productos', {
					home : "/user/home/" ,
					alias:req.user.alias,
					message: "",
					productos: ProductosTienda,
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
			message: "",
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
			message: req.flash('signupMessage'),
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
			message: req.flash('loginMessage'),
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
        console.log("Añadiendo producto al carrito");
        var cookie = req.cookies;
        var session = req.session;
        console.log("nombre producto: cookie : "+cookie);
        console.log("nombre producto: session : "+session);
    }
    
    // Función que permmite ver los productos añadidos al carrito
    verCarrito = function (req,res){
        
    }
    
    // Función que borra un producto del carrito
    quitarProductoCarrito = function (req,res){
        
    }
    
    // Función que cierra el carrito
    cerrarCarrito = function (req,res){
        
    }
    
    // Función que lista los carritos
    listarCarritos = function (req,res){
        
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
    app.post('/anadeProductoCarrito', anadirProductoCarrito);
    app.get('/carrito', verCarrito);
    app.delete('/quitaProductoCarrito', quitarProductoCarrito);
    app.post('/cierraCarrito', cerrarCarrito);
    app.get('/listaCarritos', listarCarritos);
    

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