var Productos = require('../model/productos.js');
var Usuarios = require('../model/usuarios.js');
var Carrito = require('../model/carrito.js');
var Marcas = require('../model/marcas.js');
var mongoose = require('mongoose');

module.exports = function(app,passport){
	indexWeb = function (req,res){
		Productos.find(function (err,ProductosTienda){
			if(!err){
				console.log('Mostrando Productos');
				res.render('index', {
					titulo: "AlKa Tienda Informatica",
					alias:"",
					home : "/home" ,
					carrito: "",
					productos: ProductosTienda,
					modal:"modal",
					nameTarget: "#myModal",
					entrarSalir: "Log In",
					componentes: "/home/category/componentes",
					placaBase:"/home/category/placa base",
					procesadores:"/home/category/procesadores"
				});
			}else{
				console.log('Error');
			}
		});
	}
	indexWebLogin = function (req,res){
		if (req.user.admin == true){
			res.render('paginaAdmin',{
				alias:req.user.alias,
				titulo:"Panel de control Admin",
				home : "/user/home",
				modal:"modal",
				nameTarget:"#profileModal",
				entrarSalir: "Mi perfil",
				componentes: "/user/home/category/componentes",
				placaBase:"/user/home/category/placa base",
				procesadores:"/user/home/category/procesadores",
				carrito: ""
			});
		} else {
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
							res.render('index', {
								titulo: "AlKa Tienda Informatica",
								home : "/user/home" ,
								alias:req.user.alias,
								productos: ProductosTienda,
								carrito: ProductosCarrito,
								modal:"modal",
								nameTarget:"#profileModal",
								entrarSalir: "Mi perfil",
								componentes: "/user/home/category/componentes",
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
	}
	productosWeb = function (req,res){
		var arrayMarcasNombres = [], arrayMarcasMarcadas = [];
		Marcas.find(function (err,MarcasTienda){
			arrayMarcasNombres = MarcasTienda;
			Marcas.find({nombre: {$in : req.body.marcas}},function (err,MarcasTiendaEscojidas){
				for (var j = 0; j < MarcasTiendaEscojidas.length; j++){
					if (MarcasTiendaEscojidas != undefined) {
						if (j == 0){
							arrayMarcasNombres = [];
						}
						arrayMarcasNombres.push(MarcasTiendaEscojidas[j]._id);
					}
				}
				for (var i = 0; i < MarcasTienda.length; i++) {
					for (var k = 0; k < MarcasTiendaEscojidas.length; k++) {
						if (MarcasTienda[i].nombre.indexOf(MarcasTiendaEscojidas[k].nombre) > -1){
							arrayMarcasMarcadas[i] = "checked";
						}
					}
				}
				Productos.find({tipo: req.params.producto,marca: {$in : arrayMarcasNombres}},function (err,ProductosMarcasTienda){
					if(!err){
						console.log('Mostrando productos');
						res.render('productos', {
							alias:"",
							home : "/home" ,
							carrito: "",
							productos: ProductosMarcasTienda,
							marcas: MarcasTienda,
							marcasMarcadas: arrayMarcasMarcadas,
							accionFiltrar: req.url,
							titulo:req.params.producto,
							modal:"modal",
							nameTarget:"#myModal",
							entrarSalir: "Log In",
							componentes: "/home/category/componentes",
							placaBase:"/home/category/placa base",
							procesadores:"/home/category/procesadores"
						});
					}else{
						console.log('Error');
					}
				});
			});	
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
				var arrayMarcasNombres = [], arrayMarcasMarcadas = [];
				Marcas.find(function (err,MarcasTienda){
					arrayMarcasNombres = MarcasTienda;
					Marcas.find({nombre: {$in : req.body.marcas}},function (err,MarcasTiendaEscojidas){
						for (var j = 0; j < MarcasTiendaEscojidas.length; j++){
							if (MarcasTiendaEscojidas != undefined) {
								if (j == 0){
									arrayMarcasNombres = [];
								}
								arrayMarcasNombres.push(MarcasTiendaEscojidas[j]._id);
							}
						}
						for (var i = 0; i < MarcasTienda.length; i++) {
							for (var k = 0; k < MarcasTiendaEscojidas.length; k++) {
								if (MarcasTienda[i].nombre.indexOf(MarcasTiendaEscojidas[k].nombre) > -1){
									arrayMarcasMarcadas[i] = "checked";
								}
							}
						}
						Productos.find({tipo: req.params.producto,marca: {$in : arrayMarcasNombres}},function (err,ProductosMarcasTienda){
							if(!err){
								console.log('Mostrando productos');
								res.render('productos', {
									home : "/user/home/" ,
									alias:req.user.alias,
									productos: ProductosMarcasTienda,
									carrito: ProductosCarrito,
									marcas: MarcasTienda,
									marcasMarcadas: arrayMarcasMarcadas,
									accionFiltrar: req.url,
									titulo:req.params.producto,
									modal:"modal",
									nameTarget:"#profileModal",
									entrarSalir: "Mi perfil",
									componentes: "/user/home/category/componentes",
									placaBase:"/user/home/category/placa base",
									procesadores:"/user/home/category/procesadores"
								});
							}else{
								console.log('Error');
							}
						});
					});
				});
			});
		});
	}
	todosProductosWeb = function (req,res){
		var arrayMarcasNombres = [], arrayMarcasMarcadas = [];
		Marcas.find(function (err,MarcasTienda){
			arrayMarcasNombres = MarcasTienda;
			Marcas.find({nombre: {$in : req.body.marcas}},function (err,MarcasTiendaEscojidas){
				for (var j = 0; j < MarcasTiendaEscojidas.length; j++){
					if (MarcasTiendaEscojidas != undefined) {
						if (j == 0){
							arrayMarcasNombres = [];
						}
						arrayMarcasNombres.push(MarcasTiendaEscojidas[j]._id);
					}
				}
				for (var i = 0; i < MarcasTienda.length; i++) {
					for (var k = 0; k < MarcasTiendaEscojidas.length; k++) {
						if (MarcasTienda[i].nombre.indexOf(MarcasTiendaEscojidas[k].nombre) > -1){
							arrayMarcasMarcadas[i] = "checked";
						}
					}
				}
				Productos.find({marca: {$in : arrayMarcasNombres}},function (err,ProductosMarcasTienda){
					if(!err){
						console.log('Mostrando productos');
						res.render('productos', {
							alias:"",
							home : "/home" ,
							carrito: "",
							productos: ProductosMarcasTienda,
							marcas: MarcasTienda,
							marcasMarcadas: arrayMarcasMarcadas,
							accionFiltrar: req.url,
							titulo:"Componentes",
							modal:"modal",
							nameTarget:"#myModal",
							entrarSalir: "Log In",
							componentes: "/home/category/componentes",
							placaBase:"/home/category/placa base",
							procesadores:"/home/category/procesadores"
						});
					}else{
						console.log('Error');
					}
				});
			});
		});
	}
	todosProductosWebLogin = function (req,res){
		if (idProductoCarrito == undefined) {
			var idProductoCarrito = [];
		}
		Carrito.find({idUsuario: req.user._id}, function (err,carritoUsuario){
			for (var i = 0; i < carritoUsuario.length; i++) {
				idProductoCarrito.push(mongoose.Types.ObjectId(carritoUsuario[i].idProducto));
			}
			Productos.find({_id: {$in : idProductoCarrito}}, function (err,ProductosCarrito){
				var arrayMarcasNombres = [], arrayMarcasMarcadas = [];
				Marcas.find(function (err,MarcasTienda){
					arrayMarcasNombres = MarcasTienda;
					Marcas.find({nombre: {$in : req.body.marcas}},function (err,MarcasTiendaEscojidas){
						for (var j = 0; j < MarcasTiendaEscojidas.length; j++){
							if (MarcasTiendaEscojidas != undefined) {
								if (j == 0){
									arrayMarcasNombres = [];
								}
								arrayMarcasNombres.push(MarcasTiendaEscojidas[j]._id);
							}
						}
						for (var i = 0; i < MarcasTienda.length; i++) {
							for (var k = 0; k < MarcasTiendaEscojidas.length; k++) {
								if (MarcasTienda[i].nombre.indexOf(MarcasTiendaEscojidas[k].nombre) > -1){
									arrayMarcasMarcadas[i] = "checked";
								}
							}
						}
						Productos.find({marca: {$in : arrayMarcasNombres}},function (err,ProductosMarcasTienda){
							if(!err){
								console.log('Mostrando productos');
								res.render('productos', {
									home : "/user/home/" ,
									alias:req.user.alias,
									productos: ProductosMarcasTienda,
									marcas: MarcasTienda,
									marcasMarcadas: arrayMarcasMarcadas,
									accionFiltrar: req.url,
									carrito: ProductosCarrito,
									titulo:"Componentes",
									modal:"modal",
									nameTarget:"#profileModal",
									entrarSalir: "Mi perfil",
									componentes: "/user/home/category/componentes",
									placaBase:"/user/home/category/placa base",
									procesadores:"/user/home/category/procesadores"
								});
							}else{
								console.log('Error');
							}
						});
					});
				});
			});
		});
	}
	miperfil = function (req,res){
		if (idProductoCarrito == undefined) {
			var idProductoCarrito = [];
		}
		Carrito.find({idUsuario: req.user._id}, function (err,carritoUsuario){
			for (var i = 0; i < carritoUsuario.length; i++) {
				idProductoCarrito.push(mongoose.Types.ObjectId(carritoUsuario[i].idProducto));
			}
			Productos.find({_id: {$in : idProductoCarrito}}, function (err,ProductosCarrito){
				res.render('perfil',{
					carrito:ProductosCarrito,
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
					componentes: "/user/home/category/componentes",
					placaBase:"/user/home/category/placa base",
					procesadores:"/user/home/category/procesadores"
				});
			});
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
			componentes: "/user/home/category/componentes",
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
			componentes: "/home/category/componentes",
			placaBase:"/user/home/category/placa base",
			procesadores:"/user/home/category/procesadores"
		});
	}
	logoutWeb = function(req, res) {
        req.logout();
        res.redirect('/home');
    };
    anadirProductoForm = function (req,res){
    	Productos.find(function (err,ProductosTienda){
    		if(!err){
    			res.render('formularioAdminAñadir',{
    				small : "Añadir y Actualizar productos",
    				formulario: "formProductos",
    				titulo: "Añadir producto formulario",
    				home : "/user/home",
    				productos: ProductosTienda,
    				modal: "modal",
    				carrito: "",
    				alias: req.user.alias,
    				nameTarget:"#profileModal",
					entrarSalir: "Mi perfil",
					componentes: "/home/category/componentes",
					placaBase:"/user/home/category/placa base",
					procesadores:"/user/home/category/procesadores"
    			});
    		}
    	});
    }
    anadirMarcaForm = function (req,res){
    	Productos.find(function (err,ProductosTienda){
    		if(!err){
    			res.render('formularioAdminAñadir',{
    				small : "Añadir marcas con sus productos",
    				formulario: "formMarca",
    				titulo: "Añadir marca formulario",
    				home : "/user/home",
    				productos: ProductosTienda,
    				modal: "modal",
    				carrito: "",
    				alias: req.user.alias,
    				nameTarget:"#profileModal",
					entrarSalir: "Mi perfil",
					componentes: "/home/category/componentes",
					placaBase:"/user/home/category/placa base",
					procesadores:"/user/home/category/procesadores"
    			});
    		}
    	});
    }
   listarProductosForm = function (req,res){
    	Productos.find(function (err,ProductosTienda){
    		if(!err){
    			res.render('formularioAdminListar',{
    				small : "Listar productos",
    				formulario: "formProductos",
    				titulo: "Lista de productos",
    				home : "/user/home",
    				productos: ProductosTienda,
    				modal: "modal",
    				carrito: "",
    				alias: req.user.alias,
    				nameTarget:"#profileModal",
					entrarSalir: "Mi perfil",
					componentes: "/home/category/componentes",
					placaBase:"/user/home/category/placa base",
					procesadores:"/user/home/category/procesadores"
    			});
    		}
    	});
    }
    listarMarcasForm = function (req,res){
		Marcas.find(function (err,MarcasTienda){
			res.render('formularioAdminListarForm',{
				small : "Listar marcas con sus productos",
				formulario: "formMarca",
				titulo: "Lista de marcas",
				home : "/user/home",
				productosMarcas: MarcasTienda,
				productos: "",
				modal: "modal",
				carrito: "",
				alias: req.user.alias,
				nameTarget:"#profileModal",
				entrarSalir: "Mi perfil",
				componentes: "/home/category/componentes",
				placaBase:"/user/home/category/placa base",
				procesadores:"/user/home/category/procesadores"
			});
    	});
    }
    listarMarca = function (req,res){
    	var arrayMarcasNombres = []
    	Marcas.find(function (err,MarcasTienda){
			Marcas.find({nombre: {$in : req.body.marcas}},function (err,MarcasTiendaEscojidas){
				for (var j = 0; j < MarcasTiendaEscojidas.length; j++){
					arrayMarcasNombres.push(MarcasTiendaEscojidas[j]._id);
				}
				Productos.find({marca: {$in : arrayMarcasNombres}},function (err,ProductosMarcasTienda){
					res.render('formularioAdminListar',{
						small : "Listar marcas con sus productos",
						formulario: "formMarca",
						titulo: "Lista de marcas",
						home : "/user/home",
						productosMarcas: MarcasTienda,
						productos: ProductosMarcasTienda,
						modal: "modal",
						carrito: "",
						alias: req.user.alias,
						nameTarget:"#profileModal",
						entrarSalir: "Mi perfil",
						componentes: "/home/category/componentes",
						placaBase:"/user/home/category/placa base",
						procesadores:"/user/home/category/procesadores"
					});
				});
	    	});
	    });
    }
    anadirProducto = function (req,res){
    	console.log("Añadiendo producto a la base de datos");
        Productos.findOne({nombre:req.body.nombre},function (err,Producto){
        	if (!Producto){
        		var nombre = req.body.nombre,
	        		descripcion = req.body.descripcion,
	        		precio = req.body.precio,
	        		marca = req.body.marca,
					tipo  = req.body.tipo,
					foto = req.body.foto,
					valoracion = 0;
				Marcas.findOne({nombre: req.body.marca},function (err,Marca){
					if (Marca){
						var producto = new Productos ({
							nombre: req.body.nombre,
							descripcion: req.body.descripcion,
							precio: req.body.precio,
							marca : Marca._id,
							valoracion: 0,
							tipo : req.body.tipo,
							foto: req.body.foto
						});
						producto.save({nombre: nombre, descripcion: descripcion, precio: precio,marca: marca, valoracion : valoracion, tipo : tipo, foto: foto},function (err,ProductoAñadido){
							if (!err)
								res.redirect('back');
						});
						Marcas.update({_id:Marca._id},{$set:{ idProducto: producto}},function(err,result){
							console.log("añadido el nuevo producto a la marca");
						});
					} else {
						res.redirect('/user/home/anadirMarcaForm');		
					}
				});
        	}
    	});
    }
    actualizarProducto = function (req,res){
    	Productos.find({nombre: {$in : req.body.productos}},function (err,Producto){
    		if (Producto){
				Marcas.findOne({nombre: req.body.marcaNombre},function (err,Marca){
					if (Marca){
						console.log(req.body.productos);
						Productos.update({nombre: {$in : req.body.productos}},{marca: Marca._id},{multi : true},function (err,ProductoAñadido){
							if (!err)
								console.log("Producto actualitzado");
								res.redirect('back');
						});
					}
		    	});
			}
		});
    }
    anadirMarca = function (req,res){
    	console.log("Añadiendo producto a la base de datos");
        Usuarios.findOne({_id:req.body.nombre},function (err,Marca){
        	if (!Marca){
        		var nombre = req.body.nombre,
        			productos = req.body.producto;
        		if (productos == undefined){
        			productos = [];
        		}
	        	var marca = new Marcas ({
	        		idProducto : productos,
	        		nombre: nombre	        		
	        	});
        		marca.save({nombre: nombre, idProducto: productos},function (err,MarcaAñadida){
	        		if (!err)
	        			res.redirect('back');
	        	});
        	} else {
        		res.redirect('back');
        	}
    	});
    }
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
        var usuarioObjID = "";
        Usuarios.findOne({correo:req.user.correo},function (err,usuarioID){
        	usuarioObjID = usuarioID._id;
        	var carrito = new Carrito ({
        		idProducto:req.body.id,
        		idUsuario: usuarioObjID
        	});
        	Carrito.findOne({idProducto:req.body.id},function (error,productosWebCarrito){
        		if (!productosWebCarrito){
	        		carrito.save({idProducto:req.body.id,idUsuario:usuarioObjID},function (err,carritoProductos){
		        		console.log(carritoProductos);
		        		res.redirect('back');
		        	});
	        	} else {
	        		res.redirect('back');
	        	}
        	});
    	});
    }

    quitarProductoCarrito = function (req,res){
    	Carrito.remove({idProducto: req.body.idProductoCarrito,idUsuario:req.user._id}, function (err,result){
    		console.log("Eliminando producto del carrito");
			res.redirect('back');
		});
    }
    app.get('/',indexWeb);
	app.get('/home',indexWeb);
	app.get('/user/home',isLoggedIn,indexWebLogin);
	app.get('/user/home/listarProductosForm',isLoggedIn,listarProductosForm);
	app.get('/user/home/listarMarcasForm',isLoggedIn,listarMarcasForm);
	app.post('/user/home/listarMarcaEscojida',isLoggedIn,listarMarca);
	app.get('/user/home/anadirProductoForm',isLoggedIn,anadirProductoForm);
	app.get('/user/home/anadirMarcaForm',isLoggedIn,anadirMarcaForm);
	app.post('/user/home/anadirProducto',isLoggedIn,anadirProducto);
	app.post('/user/home/actualizarProducto',isLoggedIn,actualizarProducto);
	app.post('/user/home/anadirMarca',isLoggedIn,anadirMarca);
	app.all('/home/category/componentes',todosProductosWeb);
	app.all('/user/home/category/componentes',isLoggedIn,todosProductosWebLogin);
	app.all('/home/category/:producto',productosWeb);
	app.all('/user/home/category/:producto',isLoggedIn,productosWebLogin);
	app.get('/user/home/logout',isLoggedIn,logoutWeb);
	app.get('/user/home/miperfil',isLoggedIn,miperfil);
	app.post('/user/home/user/home/miperfil/actualizarDatos',isLoggedIn,actualitzarPerfil);
	app.post('/user/home/miperfil/upload',isLoggedIn,subirFoto);
	app.post('/home/login',passport.authenticate('local-login',{ successRedirect : '/user/home', failureRedirect : '/home', failureFlash : true }),loginWeb);
	app.post('/home/register',passport.authenticate('local-register',{ successRedirect : '/home', failureRedirect : '/home', failureFlash : true }),registerWeb);
    app.get('/user/home/pedido',realizarPedido);
    app.post('/user/home/anadeProductoCarrito', isLoggedIn, anadirProductoCarrito);
    app.post('/user/home/quitarProductoCarrito', isLoggedIn, quitarProductoCarrito);

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