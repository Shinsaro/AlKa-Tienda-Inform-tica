var Productos = require('../model/productos.js');
var Usuarios = require('../model/usuarios.js');
var Carrito = require('../model/carrito.js');
var Marcas = require('../model/marcas.js');
var mongoose = require('mongoose');

module.exports = function(app,passport){
	indexWeb = function (req,res){
		var arrayNombresProductos = [];
		Productos.find({foto : {$ne : null}},function (err,ProductosTienda){
			if (arrayValoraciones == undefined) {
				var arrayValoraciones = [];
			}
			for (var x = 0; x < ProductosTienda.length; x++){
				arrayValoraciones.push(ProductosTienda[x].valoracion);
			}
			for (var i = 0; i < ProductosTienda.length; i++ ){
				arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
			}
			if(!err){
				console.log('Mostrando Productos');
				res.render('index', {
					titulo: "AlKa Tienda Informatica",
					alias:"",
					home : "/home" ,
					carrito: "",
					productos: ProductosTienda,
					productosLista : arrayNombresProductos,
					valoraciones: arrayValoraciones,
					modal:"modal",
					nameTarget: "#myModal",
					entrarSalir: "Log In",
					messageDangerRegistrar: req.flash('signupMessage'),
					messageSuccessRegistrar: req.flash('signupMessage'),
					messageDangerLogin: req.flash('loginMessage'),
					componentes: "/home/category/componentes",
					ram: "/home/category/ram",
					hdd: "/home/category/disco duro",
					targetas:"/home/category/targetas graficas",
					cajas: "/home/category/cajas",
					fuentes:"/home/category/fuentes",
					placaBase:"/home/category/placa base",
					procesadores:"/home/category/procesadores",
					configura: "/home/configura tu pc"
				});
			}else{
				console.log('Error');
			}
		});
	}
	indexWebLogin = function (req,res){
		if (req.user.admin == true){
			var arrayNombresProductos = [];
			Productos.find({foto : {$ne : null}},function (err,ProductosTienda){
				for (var i = 0; i < ProductosTienda.length; i++ ){
					arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
				}
				res.render('paginaAdmin',{
					alias:req.user.alias,
					titulo:"Panel de control Admin",
					home : "/user/home",
					modal:"modal",
					productosLista : arrayNombresProductos,
					nameTarget:"#profileModal",
					entrarSalir: "Mi perfil",
					messageDangerRegistrar: req.flash('signupMessage'),
					messageSuccessRegistrar: req.flash('signupMessage'),
					messageDangerLogin: req.flash('loginMessage'),
					componentes: "/user/home/category/componentes",
					ram: "/user/home/category/ram",
					hdd: "/user/home/category/disco duro",
					cajas:"/user/home/category/cajas",
					fuentes:"/user/home/category/fuentes",
					targetas:"/user/home/category/targetas graficas",
					placaBase:"/user/home/category/placa base",
					procesadores:"/user/home/category/procesadores",
					configura: "/user/home/configura tu pc",
					carrito: ""
				});
			});
		} else {
			var arrayNombresProductos = [];
			if (idProductoCarrito == undefined) {
				var idProductoCarrito = [];
			}
			Carrito.find({idUsuario: req.user._id, finalizar:false}, function (err,carritoUsuario){
				for (var i = 0; i < carritoUsuario.length; i++) {
					idProductoCarrito.push(mongoose.Types.ObjectId(carritoUsuario[i].idProducto));
				}
				Productos.find({_id: {$in : idProductoCarrito}}, function (err,ProductosCarrito){
					Productos.find(function (err,ProductosTienda){
						if (arrayValoraciones == undefined) {
							var arrayValoraciones = [];
						}
						for (var x = 0; x < ProductosTienda.length; x++){
							arrayValoraciones.push(ProductosTienda[x].valoracion);
						}
						for (var i = 0; i < ProductosTienda.length; i++ ){
							arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
						}
						if(!err){
							console.log('Mostrando productos');
							res.render('index', {
								titulo: "AlKa Tienda Informatica",
								home : "/user/home" ,
								alias:req.user.alias,
								productos: ProductosTienda,
								productosLista : arrayNombresProductos,
								carrito: ProductosCarrito,
								valoraciones: arrayValoraciones,
								modal:"modal",
								nameTarget:"#profileModal",
								entrarSalir: "Mi perfil",
								messageDangerRegistrar: req.flash('signupMessage'),
								messageSuccessRegistrar: req.flash('signupMessage'),
								messageDangerLogin: req.flash('loginMessage'),
								componentes: "/user/home/category/componentes",
								ram: "/user/home/category/ram",
								hdd: "/user/home/category/disco duro",
								cajas:"/user/home/category/cajas",
								fuentes:"/user/home/category/fuentes",
								targetas:"/user/home/category/targetas graficas",
								placaBase:"/user/home/category/placa base",
								procesadores:"/user/home/category/procesadores",
								configura: "/home/configura tu pc"
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
		var arrayMarcasNombres = [], arrayMarcasMarcadas = [], arrayNombresProductos = [];
		Marcas.find(function (err,MarcasTienda){
			arrayMarcasNombres = MarcasTienda;
			Marcas.find({nombre: {$in : req.body.marcas}},function (err,MarcasTiendaEscojidas){
				console.log("MarcasTienda");
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
				tituloSeccion = req.params.producto.substring(0,1).toUpperCase() + req.params.producto.substring(1);
				Productos.find({foto : {$ne : null}},function (err,ProductosTienda){
					Productos.find({tipo: req.params.producto,marca: {$in : arrayMarcasNombres},foto : {$ne : null}},function (err,ProductosMarcasTienda){
						if (arrayValoraciones == undefined) {
							var arrayValoraciones = [];
						}
						for (var x = 0; x < ProductosMarcasTienda.length; x++){
							arrayValoraciones.push(ProductosMarcasTienda[x].valoracion);
						}
						for (var i = 0; i < ProductosTienda.length; i++ ){
							arrayNombresProductos.push(ProductosTienda[i].nombre);
						}
						if(!err){
							console.log('Mostrando productos');
							res.render('productos', {
								alias:"",
								home : "/home" ,
								carrito: "",
								productos: ProductosMarcasTienda,
								productosLista : arrayNombresProductos,
								marcas: MarcasTienda,
								marcasMarcadas: arrayMarcasMarcadas,
								valoraciones: arrayValoraciones,
								accionFiltrar: req.url,
								titulo:tituloSeccion,
								modal:"modal",
								nameTarget:"#myModal",
								entrarSalir: "Log In",
								messageDangerRegistrar: req.flash('signupMessage'),
								messageSuccessRegistrar: req.flash('signupMessage'),
								messageDangerLogin: req.flash('loginMessage'),
								componentes: "/home/category/componentes",
								ram: "/home/category/ram",
								hdd: "/home/category/disco duro",
								targetas:"/home/category/targetas graficas",
								cajas: "/home/category/cajas",
								fuentes:"/home/category/fuentes",
								placaBase:"/home/category/placa base",
								procesadores:"/home/category/procesadores",
								configura: "/home/configura tu pc"
							});
						}else{
							console.log('Error');
						}
					});
				});
			});	
		});
	}
	productosWebLogin = function (req,res){
		var arrayNombresProductos = [];
		if (idProductoCarrito == undefined) {
			var idProductoCarrito = [];
		}
		Carrito.find({idUsuario: req.user._id, finalizar:false}, function (err,carritoUsuario){
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
						tituloSeccion = req.params.producto.substring(0,1).toUpperCase() + req.params.producto.substring(1);
						Productos.find({foto : {$ne : null}},function (err,ProductosTienda){
							Productos.find({tipo: req.params.producto,marca: {$in : arrayMarcasNombres},foto : {$ne : null}},function (err,ProductosMarcasTienda){
								if (arrayValoraciones == undefined) {
									var arrayValoraciones = [];
								}
								for (var x = 0; x < ProductosMarcasTienda.length; x++){
									arrayValoraciones.push(ProductosMarcasTienda[x].valoracion);
								}
								for (var i = 0; i < ProductosTienda.length; i++ ){
									arrayNombresProductos.push(ProductosTienda[i].nombre);
								}
								if(!err){
									console.log('Mostrando productos');
									res.render('productos', {
										home : "/user/home/" ,
										alias:req.user.alias,
										productos: ProductosMarcasTienda,
										productosLista : arrayNombresProductos,
										carrito: ProductosCarrito,
										marcas: MarcasTienda,
										marcasMarcadas: arrayMarcasMarcadas,
										valoraciones: arrayValoraciones,
										accionFiltrar: req.url,
										titulo:tituloSeccion,
										modal:"modal",
										nameTarget:"#profileModal",
										entrarSalir: "Mi perfil",
										messageDangerRegistrar: req.flash('signupMessage'),
										messageSuccessRegistrar: req.flash('signupMessage'),
										messageDangerLogin: req.flash('loginMessage'),
										componentes: "/user/home/category/componentes",
										ram: "/user/home/category/ram",
										hdd: "/user/home/category/disco duro",
										cajas:"/user/home/category/cajas",
										fuentes:"/user/home/category/fuentes",
										targetas:"/user/home/category/targetas graficas",
										placaBase:"/user/home/category/placa base",
										procesadores:"/user/home/category/procesadores",
										configura: "/user/home/configura tu pc"
									});
								}else{
									console.log('Error');
								}
							});
						});
					});
				});
			});
		});
	}
	todosProductosWeb = function (req,res){
		var arrayMarcasNombres = [], arrayMarcasMarcadas = [], arrayNombresProductos = [];
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
				Productos.find({foto : {$ne : null}},function (err,ProductosTienda){
					Productos.find({marca: {$in : arrayMarcasNombres},foto : {$ne : null}},function (err,ProductosMarcasTienda){
						if (arrayValoraciones == undefined) {
							var arrayValoraciones = [];
						}
						for (var x = 0; x < ProductosMarcasTienda.length; x++){
							arrayValoraciones.push(ProductosMarcasTienda[x].valoracion);
						}
						for (var i = 0; i < ProductosTienda.length; i++ ){
							arrayNombresProductos.push(ProductosTienda[i].nombre);
						}
						if(!err){
							console.log('Mostrando productos');
							res.render('productos', {
								alias:"",
								home : "/home" ,
								carrito: "",
								productos: ProductosMarcasTienda,
								productosLista : arrayNombresProductos,
								marcas: MarcasTienda,
								marcasMarcadas: arrayMarcasMarcadas,
								valoraciones: arrayValoraciones,
								accionFiltrar: req.url,
								titulo:"Componentes",
								modal:"modal",
								nameTarget:"#myModal",
								entrarSalir: "Log In",
								messageDangerRegistrar: req.flash('signupMessage'),
								messageSuccessRegistrar: req.flash('signupMessage'),
								messageDangerLogin: req.flash('loginMessage'),
								componentes: "/home/category/componentes",
								ram: "/home/category/ram",
								hdd: "/home/category/disco duro",
								targetas:"/home/category/targetas graficas",
								cajas: "/home/category/cajas",
								fuentes:"/home/category/fuentes",
								placaBase:"/home/category/placa base",
								procesadores:"/home/category/procesadores",
								configura: "/home/configura tu pc"
							});
						}else{
							console.log('Error');
						}
					});
				});
			});
		});
	}
	todosProductosWebLogin = function (req,res){
		var arrayNombresProductos = [];
		if (idProductoCarrito == undefined) {
			var idProductoCarrito = [];
		}
		Carrito.find({idUsuario: req.user._id, finalizar:false}, function (err,carritoUsuario){
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
						Productos.find({foto : {$ne : null}},function (err,ProductosTienda){
							Productos.find({marca: {$in : arrayMarcasNombres},foto : {$ne : null}},function (err,ProductosMarcasTienda){
								if (arrayValoraciones == undefined) {
									var arrayValoraciones = [];
								}
								for (var x = 0; x < ProductosMarcasTienda.length; x++){
									arrayValoraciones.push(ProductosMarcasTienda[x].valoracion);
								}
								for (var i = 0; i < ProductosTienda.length; i++ ){
									arrayNombresProductos.push(ProductosTienda[i].nombre);
								}
								if(!err){
									console.log('Mostrando productos');
									res.render('productos', {
										home : "/user/home/" ,
										alias:req.user.alias,
										productos: ProductosMarcasTienda,
										productosLista : arrayNombresProductos,
										marcas: MarcasTienda,
										marcasMarcadas: arrayMarcasMarcadas,
										valoraciones: arrayValoraciones,
										accionFiltrar: req.url,
										carrito: ProductosCarrito,
										titulo:"Componentes",
										modal:"modal",
										nameTarget:"#profileModal",
										entrarSalir: "Mi perfil",
										messageDangerRegistrar: req.flash('signupMessage'),
										messageSuccessRegistrar: req.flash('signupMessage'),
										messageDangerLogin: req.flash('loginMessage'),
										componentes: "/user/home/category/componentes",
										ram: "/user/home/category/ram",
										hdd: "/user/home/category/disco duro",
										cajas:"/user/home/category/cajas",
										fuentes:"/user/home/category/fuentes",
										targetas:"/user/home/category/targetas graficas",
										placaBase:"/user/home/category/placa base",
										procesadores:"/user/home/category/procesadores",
										configura: "/user/home/configura tu pc"
									});
								}else{
									console.log('Error');
								}
							});
						});
					});
				});
			});
		});
	}
	configuraTuPC = function (req,res){
		var arrayNombresProductos = [];
		Productos.find(function (err,ProductosTienda){
			for (var i = 0; i < ProductosTienda.length; i++ ){
				arrayNombresProductos.push(ProductosTienda[i].nombre);
			}
			Productos.find().count().distinct('tipo',function(err,tiposProductos){
				if (req.user != undefined){
					Carrito.find({idUsuario: req.user._id, finalizar:false}, function (err,carritoUsuario){
						if (idProductoCarrito == undefined) {
							var idProductoCarrito = [];
						}
						Productos.find({_id: {$in : idProductoCarrito}}, function (err,ProductosCarrito){
							for (var i = 0; i < carritoUsuario.length; i++) {
								idProductoCarrito.push(mongoose.Types.ObjectId(carritoUsuario[i].idProducto));
							}
							res.render('configuraTuPC',{
								home : "/user/home/" ,
								alias:req.user.alias,
								productosLista : arrayNombresProductos,
								productos: ProductosTienda,
								carrito: ProductosCarrito,
								tipos : tiposProductos,
								titulo:"Configura tu PC",
								modal:"modal",
								nameTarget:"#profileModal",
								entrarSalir: "Mi perfil",
								messageDangerRegistrar: req.flash('signupMessage'),
								messageSuccessRegistrar: req.flash('signupMessage'),
								messageDangerLogin: req.flash('loginMessage'),
								componentes: "/user/home/category/componentes",
								ram: "/user/home/category/ram",
								hdd: "/user/home/category/disco duro",
								cajas:"/user/home/category/cajas",
								fuentes:"/user/home/category/fuentes",
								targetas:"/user/home/category/targetas graficas",
								placaBase:"/user/home/category/placa base",
								procesadores:"/user/home/category/procesadores",
								configura: "/user/home/configura tu pc"
							});
						});
					});
				} else {
					res.render('configuraTuPC',{
						home : "/home/" ,
						alias:"",
						productosLista : arrayNombresProductos,
						productos: ProductosTienda,
						carrito: "",
						tipos : tiposProductos,
						titulo:"Configura tu PC",
						modal:"modal",
						nameTarget:"#myModal",
						entrarSalir: "Log In",
						messageDangerRegistrar: req.flash('signupMessage'),
						messageSuccessRegistrar: req.flash('signupMessage'),
						messageDangerLogin: req.flash('loginMessage'),
						componentes: "/home/category/componentes",
						ram: "/home/category/ram",
						hdd: "/home/category/disco duro",
						targetas:"/home/category/targetas graficas",
						cajas: "/home/category/cajas",
						fuentes:"/home/category/fuentes",
						placaBase:"/home/category/placa base",
						procesadores:"/home/category/procesadores",
						configura: "/home/configura tu pc"
					});
				}
			});
		});
	}
	miperfil = function (req,res){
		var arrayNombresProductos = [];
		if (idProductoCarrito == undefined) {
			var idProductoCarrito = [];
		}
		Carrito.find({idUsuario: req.user._id, finalizar:false}, function (err,carritoUsuario){
			for (var i = 0; i < carritoUsuario.length; i++) {
				idProductoCarrito.push(mongoose.Types.ObjectId(carritoUsuario[i].idProducto));
			}
			Productos.find({foto : {$ne : null}},function (err,ProductosTienda){
				for (var i = 0; i < ProductosTienda.length; i++ ){
					arrayNombresProductos.push(ProductosTienda[i].nombre);
				}
				Productos.find({_id: {$in : idProductoCarrito}}, function (err,ProductosCarrito){
					var payPalSeleccionado = "", visaSeleccionado = "";
					if (req.user.metodoPago == "payPal"){
						payPalSeleccionado = "checked";
						visaSeleccionado = "";
					} else {
						payPalSeleccionado = "";
						visaSeleccionado = "checked";
					}
					if (req.user.nombre == ""){
						req.user.nombre = undefined;
					}
					if (req.user.apellidos == ""){
						req.user.apellidos = undefined;
					}
					res.render('perfil',{
						carrito:ProductosCarrito,
						payPal:payPalSeleccionado,
						visa:visaSeleccionado,
						calle:req.user.direccionEnvio.calle,
						numero:req.user.direccionEnvio.numero,
						piso:req.user.direccionEnvio.piso,
						puerta: req.user.direccionEnvio.puerta,
						cp:req.user.direccionEnvio.cp,
						correo:req.user.correo,
						telefono:req.user.telefono,
						apellidos:req.user.apellidos,
						nombre: req.user.nombre,
						fotoPerfil: req.user.foto,
						alias: req.user.alias,
						productosLista : arrayNombresProductos,
						home : "/user/home",
						titulo:"Mi perfil",
						modal:"modal",
						nameTarget: "#profileModal",
						entrarSalir: "Mi perfil",
						messageDangerRegistrar: req.flash('signupMessage'),
						messageSuccessRegistrar: req.flash('signupMessage'),
						messageDangerLogin: req.flash('loginMessage'),
						componentes: "/user/home/category/componentes",
						ram: "/user/home/category/ram",
						hdd: "/user/home/category/disco duro",
						cajas:"/user/home/category/cajas",
						fuentes:"/user/home/category/fuentes",
						targetas:"/user/home/category/targetas graficas",
						placaBase:"/user/home/category/placa base",
						procesadores:"/user/home/category/procesadores",
						configura: "/user/home/configura tu pc"
					});
				});
			});
		});
	}
	actualitzarPerfil = function (req,res){
		var calle = req.body.calle,
			numero = req.body.numero,
			piso = req.body.piso,
			puerta = req.body.puerta,
			cp = req.body.cp,
			metodoPago = req.body.optradio,
			telefono = req.body.telefono,
			apellidos = req.body.apellidos,
			nombre = req.body.nombre;
		Usuarios.update({correo:req.user.correo},
						{	metodoPago: metodoPago,
							'direccionEnvio.calle':calle,
							'direccionEnvio.numero':numero,
							'direccionEnvio.piso':piso,
							'direccionEnvio.puerta':puerta,
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
	subirFotoProducto = function(req, res) {
		Productos.findOne({_id:req.body.fotoProducto},function (err,Producto){
		   	//El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
		   	var ruta = require('path');
		   	var fs = require('fs'), path = req.files.archivoSubir.path;
		   	var newPath = ruta.join(__dirname,'../public/images/fotosProductos/' + Producto.nombre + '.jpg');
		   	var is = fs.createReadStream(path);
		   	var os = fs.createWriteStream(newPath);
		   	is.pipe(os);
		   	is.on('end', function() {
		      //eliminamos el archivo temporal
		      fs.unlinkSync(path);
		   	});
		   	var foto = "/images/fotosProductos/" + Producto.nombre + '.jpg';
		   	Productos.update({_id:req.body.fotoProducto},{$set:{foto:foto}},function(err,result){
		   		console.log('Foto actualitzada en el documento del producto');
		   		res.redirect('back');
		   	});
		});
	}
	updateFotoProducto = function(req, res) {
		Productos.findOne({_id:req.body.fotoProductoUpdate},function (err,Producto){
		   	//El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
		   	var ruta = require('path');
		   	var fs = require('fs'), path = req.files.archivoActualizar.path;
		   	var newPath = ruta.join(__dirname,'../public/images/fotosProductos/' + Producto.nombre + '.jpg');
		   	var is = fs.createReadStream(path);
		   	var os = fs.createWriteStream(newPath);
		   	is.pipe(os);
		   	is.on('end', function() {
		   	   	//eliminamos el archivo temporal
		    	fs.unlinkSync(path);
		   	});
		   	var foto = "/images/fotosProductos/" + Producto.nombre + '.jpg';
		   	Productos.update({_id:req.body.fotoProductoUpdate},{$set:{foto:foto}},function(err,result){
		   		console.log('Foto actualitzada en el documento del producto');
		   		res.redirect('back');
		   	});
		});
	}
	logoutWeb = function(req, res) {
        req.logout();
        res.redirect('/home');
    };
    anadirProductoForm = function (req,res){
    	var arrayNombresProductos = [];
    	if (req.user.admin == true){
	    	Productos.find(function (err,ProductosTienda){
	    		for (var i = 0; i < ProductosTienda.length; i++ ){
	    			arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
	    		}
	    		Marcas.find(function (err,MarcasTienda){
		    		if(!err){
		    			res.render('formularioAdminAñadir',{
		    				small : "Añadir y Actualizar productos",
		    				formulario: "formProductos",
		    				titulo: "Añadir producto formulario",
		    				home : "/user/home",
		    				productos: ProductosTienda,
		    				productosLista : arrayNombresProductos,
		    				marcas: MarcasTienda,
		    				messageDanger: req.flash('danger'),
		    				messageSuccess: req.flash('success'),
		    				modal: "modal",
		    				carrito: "",
		    				foto : "",
		    				alias: req.user.alias,
		    				nameTarget:"#profileModal",
							entrarSalir: "Mi perfil",
							messageDangerRegistrar: req.flash('signupMessage'),
							messageSuccessRegistrar: req.flash('signupMessage'),
							messageDangerLogin: req.flash('loginMessage'),
							componentes: "/user/home/category/componentes",
							ram: "/user/home/category/ram",
							hdd: "/user/home/category/disco duro",
							cajas:"/user/home/category/cajas",
							fuentes:"/user/home/category/fuentes",
							targetas:"/user/home/category/targetas graficas",
							placaBase:"/user/home/category/placa base",
							procesadores:"/user/home/category/procesadores",
							configura: "/user/home/configura tu pc"
		    			});
		    		}
		    	});
	    	});
	    } else {
	    	res.redirect('/user/home');
	    }
    }
    anadirMarcaForm = function (req,res){
    	var arrayNombresProductos = [];
    	if (req.user.admin == true){
	    	Productos.find(function (err,ProductosTienda){
	    		for (var i = 0; i < ProductosTienda.length; i++ ){
	    			arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
	    		}
	    		Marcas.find(function (err,MarcasTienda){
		    		if(!err){
		    			res.render('formularioAdminAñadir',{
		    				small : "Añadir marcas con sus productos",
		    				formulario: "formMarca",
		    				titulo: "Añadir marca formulario",
		    				home : "/user/home",
		    				productos: ProductosTienda,
		    				productosLista : arrayNombresProductos,
		    				marcas: MarcasTienda,
		    				modal: "modal",
		    				carrito: "",
		    				messageSuccess: req.flash('info'),
		    				alias: req.user.alias,
		    				nameTarget:"#profileModal",
							entrarSalir: "Mi perfil",
							messageDangerRegistrar: req.flash('signupMessage'),
							messageSuccessRegistrar: req.flash('signupMessage'),
							messageDangerLogin: req.flash('loginMessage'),
							componentes: "/user/home/category/componentes",
							ram: "/user/home/category/ram",
							hdd: "/user/home/category/disco duro",
							cajas:"/user/home/category/cajas",
							fuentes:"/user/home/category/fuentes",
							targetas:"/user/home/category/targetas graficas",
							placaBase:"/user/home/category/placa base",
							procesadores:"/user/home/category/procesadores",
							configura: "/user/home/configura tu pc"
		    			});
		    		}
	    		});
	    	});
	    } else {
	    	res.redirect('/user/home');
	    }
    }
    listarUsuariosForm = function (req,res){
    	var arrayNombresProductos = [];
    	if (req.user.admin == true){
    		Productos.find(function (err,ProductosTienda){
		    	Usuarios.find(function (err,UsuariosTienda){
		    		for (var i = 0; i < ProductosTienda.length; i++ ){
		    			arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
		    		}
		    		if(!err){
		    			res.render('formularioAdminListar',{
		    				small : "Listar usuarios",
		    				formulario: "formUsuarios",
		    				titulo: "Lista de productos",
		    				home : "/user/home",
		    				usuarios: UsuariosTienda,
		    				productosLista : arrayNombresProductos,
		    				modal: "modal",
		    				carrito: "",
		    				alias: req.user.alias,
		    				nameTarget:"#profileModal",
							entrarSalir: "Mi perfil",
							messageDangerRegistrar: req.flash('signupMessage'),
							messageSuccessRegistrar: req.flash('signupMessage'),
							messageDangerLogin: req.flash('loginMessage'),
							componentes: "/user/home/category/componentes",
							ram: "/user/home/category/ram",
							hdd: "/user/home/category/disco duro",
							cajas:"/user/home/category/cajas",
							fuentes:"/user/home/category/fuentes",
							targetas:"/user/home/category/targetas graficas",
							placaBase:"/user/home/category/placa base",
							procesadores:"/user/home/category/procesadores",
							configura: "/user/home/configura tu pc"
		    			});
		    		}
	    		});
		    });
    	} else {
	    	res.redirect('/user/home');
	    }
    }
   	listarProductosForm = function (req,res){
   		var arrayNombresProductos = [];
   		if (req.user.admin == true){
	    	Productos.find(function (err,ProductosTienda){
	    		for (var i = 0; i < ProductosTienda.length; i++ ){
	    			arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
	    		}
	    		if(!err){
	    			res.render('formularioAdminListar',{
	    				small : "Listar productos",
	    				formulario: "formProductos",
	    				titulo: "Lista de productos",
	    				home : "/user/home",
	    				productos: ProductosTienda,
	    				productosLista : arrayNombresProductos,
	    				modal: "modal",
	    				carrito: "",
	    				alias: req.user.alias,
	    				nameTarget:"#profileModal",
						entrarSalir: "Mi perfil",
						messageDanger: req.flash('danger'),
						messageSuccess: req.flash('info'),
						messageDangerRegistrar: req.flash('signupMessage'),
						messageSuccessRegistrar: req.flash('signupMessage'),
						messageDangerLogin: req.flash('loginMessage'),
						componentes: "/user/home/category/componentes",
						ram: "/user/home/category/ram",
						hdd: "/user/home/category/disco duro",
						cajas:"/user/home/category/cajas",
						fuentes:"/user/home/category/fuentes",
						targetas:"/user/home/category/targetas graficas",
						placaBase:"/user/home/category/placa base",
						procesadores:"/user/home/category/procesadores",
						configura: "/user/home/configura tu pc"
	    			});
	    		}
    		});
	    } else {
	    	res.redirect('/user/home');
	    }
    }
    listarMarcasForm = function (req,res){
    	var arrayNombresProductos = [];
    	if (req.user.admin == true){
    		Productos.find(function (err,ProductosTienda){
    			for (var i = 0; i < ProductosTienda.length; i++ ){
	    			arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
	    		}
				Marcas.find(function (err,MarcasTienda){
					res.render('formularioAdminListarForm',{
						small : "Listar marcas con su cantidad productos",
						formulario: "formMarca",
						titulo: "Lista de marcas",
						home : "/user/home",
						productosMarcas: MarcasTienda,
						productosLista : arrayNombresProductos,
						productos: "",
						modal: "modal",
						carrito: "",
						alias: req.user.alias,
						nameTarget:"#profileModal",
						entrarSalir: "Mi perfil",
						messageDangerRegistrar: req.flash('signupMessage'),
						messageSuccessRegistrar: req.flash('signupMessage'),
						messageDangerLogin: req.flash('loginMessage'),
						componentes: "/user/home/category/componentes",
						ram: "/user/home/category/ram",
						hdd: "/user/home/category/disco duro",
						cajas:"/user/home/category/cajas",
						fuentes:"/user/home/category/fuentes",
						targetas:"/user/home/category/targetas graficas",
						placaBase:"/user/home/category/placa base",
						procesadores:"/user/home/category/procesadores",
						configura: "/user/home/configura tu pc"
					});
		    	});
			});
		} else {
	    	res.redirect('/user/home');
	    }
    }
    listarMarca = function (req,res){
    	var arrayNombresProductos = [];
    	if (req.user.admin == true){
	    	var arrayMarcasNombres = [];
	    	Productos.find(function (err,ProductosTienda){
	    		for (var i = 0; i < ProductosTienda.length; i++ ){
	    			arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
	    		}
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
								productosLista : arrayNombresProductos,
								modal: "modal",
								carrito: "",
								alias: req.user.alias,
								nameTarget:"#profileModal",
								entrarSalir: "Mi perfil",
								messageDangerRegistrar: req.flash('signupMessage'),
								messageSuccessRegistrar: req.flash('signupMessage'),
								messageDangerLogin: req.flash('loginMessage'),
								componentes: "/user/home/category/componentes",
								ram: "/user/home/category/ram",
								hdd: "/user/home/category/disco duro",
								cajas:"/user/home/category/cajas",
								fuentes:"/user/home/category/fuentes",
								targetas:"/user/home/category/targetas graficas",
								placaBase:"/user/home/category/placa base",
								procesadores:"/user/home/category/procesadores",
								configura: "/user/home/configura tu pc"
							});
						});
			    	});
			    });
		    });
	    } else {
	    	res.redirect('/user/home');
	    }
    }
    anadirProducto = function (req,res){
    	console.log("Añadiendo producto a la base de datos");
    	if (req.body.marca == "Escoje una marca"){
			req.flash('danger', 'Antes tienes que crear la marca');
		} else {
			req.flash('info', 'Producto creado con exito. Ahora asignale una imagen');
		}
		var caracteristicasArray = req.body.caracteristicas.split("\r\n");
        Productos.findOne({nombre:req.body.nombre},function (err,Producto){
        	if (!Producto){
        		var nombre = req.body.nombre,
	        		descripcion = req.body.descripcion,
	        		caracteristicas = caracteristicasArray,
	        		precio = req.body.precio,
	        		marca = req.body.marca,
					tipo  = req.body.tipo,
					valoracion = 0;
				Marcas.findOne({nombre: req.body.marca},function (err,Marca){
					if (Marca){
						var producto = new Productos ({
							nombre: req.body.nombre,
							descripcion: req.body.descripcion,
							caracteristicas : caracteristicasArray,
							precio: req.body.precio,
							marca : Marca._id,
							valoracion: 0,
							tipo : req.body.tipo,
							foto: null
						});
						producto.save({nombre: nombre, descripcion: descripcion, precio: precio,marca: marca, valoracion : valoracion, tipo : tipo, foto: "", caracteristicas : caracteristicas},function (err,ProductoAñadido){
							if (!err)
								res.redirect('back');
							Productos.findOne({nombre:ProductoAñadido.nombre},function (err,ProductoCreado){
								Marcas.update({_id:Marca._id},{$push : {idProducto : ProductoCreado._id}},function(err,result){
									console.log("añadido el nuevo producto a la marca");
								});
							});
						});
					} else {
						res.redirect('back');

					}
				});
        	}
    	});
    }
    actualizarProducto = function (req,res){
    	Productos.find({nombre: {$in : req.body.producto}},function (err,Producto){
			Marcas.findOne({nombre: req.body.marca},function (err,Marca){
				if (Marca){
					Productos.update({nombre: {$in : req.body.producto}},{$set:{marca: Marca._id}},{multi : true},function (err,ProductoAñadido){
						if (!err)
							console.log("Producto actualitzado");
							res.redirect('back');
					});
				}
	    	});
		});
    }
    anadirMarca = function (req,res){
    	console.log("Añadiendo producto a la base de datos");
        Marcas.findOne({nombre:req.body.marcaNombre},function (err,Marca){
        	if (!Marca){
        		var nombre = req.body.marcaNombre,
        			productos = req.body.producto;
        		if (productos == undefined){
        			productos = [];
        		}
	        	var marca = new Marcas ({
	        		idProducto : productos,
	        		nombre: req.body.marcaNombre        		
	        	});
        		marca.save({nombre: nombre, idProducto: productos},function (err,MarcaAñadida){
	        		if (!err)
	        			req.flash('info', 'Marca añadida con exito');
	        			res.redirect('back');
	        	});
        	} else {
        		res.redirect('back');
        	}
    	});
    }

    eliminarProducto = function (req,res){
    	console.log("Eliminando producto a la base de datos");
    	Productos.findOne({nombre:req.body.producto},function (err,ProductoId){
	    	Productos.remove({_id:ProductoId._id},function (err,Producto){
	    		if (!err)
	    			console.log("Producto eliminado en la colección productos");
	    	});
	    	Marcas.findOne({_id: ProductoId.marca},function (err, MarcaParaActualizar){
		    	Marcas.update({_id: MarcaParaActualizar._id},{$pull : {idProducto : ProductoId._id }},function (err,MarcaActualizada){
	    			if (!err)
	    				console.log("Referencia del producto eliminada en la colección marcas");
		    			res.redirect('back');
	    		});
		    });
	    });
    }
    
    // Funciones del producto

    fichaProducto = function(req, res){
    	var arrayNombresProductos = [],
            idProductos = [],
            cantidadProductos = [],
            nombreProductoficha = req.params.producto,
            comentarValorar = false,
            valoracionUsuario = 0;
        // Busco el producto de la ficha
        Productos.find(function (err,ProductosTienda){
	        for (var i = 0; i < ProductosTienda.length; i++ ){
				arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
			}
	        Productos.findOne({nombre: nombreProductoficha}, function(err, productoFicha){
	            if(!err){
	                console.log('Producto de la ficha encontrado');
	                // Compruebo que exista el usuario
	                if(req.user!=undefined){
	                    var idUsuario = req.user._id,
	                        idProducto = productoFicha._id;
                        /********************************************************************/
                        // Compruebo si el usuario ha valorado el producto de la ficha
                        productoFicha.valoracion.forEach(function(valoracion){
                            if(valoracion.usuario!=undefined && valoracion.usuario.equals(idUsuario)){
                                valoracionUsuario=valoracion.valor;

                            }
                        });
	                    // Compruebo que el usuario a comprado el producto de la ficha
	                    Carrito.find({idUsuario:idUsuario, idProducto:idProducto, finalizar:true},function (err,ProductoComprado){
	                        if(!err){
	                            // El usuario ha comprado el producto
	                            if(ProductoComprado!=undefined && ProductoComprado!=null && ProductoComprado!=""){
	                                console.log('El usuario ha comprado el producto de la ficha');
	                                comentarValorar=true;

	                            }else{
	                                console.log('Producto no encontrado');
	                            }
	                            // Busco los productos del carrito
	                            Carrito.find({idUsuario:idUsuario, finalizar:false},function (err,ProductosCarrito){
	                                if(!err){
	                                    ProductosCarrito.forEach(function(producto){
	                                        idProductos.push(producto.idProducto);
	                                        cantidadProductos.push(producto.cantidad);
	                                    });
	                                    var cantidades = cantidadProductos;
	                                    Productos.find({_id: {$in: idProductos}},function (err,ProductosPedido){
	                                        Usuarios.findOne({_id: idUsuario}, function(err,usuario){
	                                            if(!err){
	                                                console.log('Mostrando productos añadidos al pedido');
	                                                res.render('fichaProducto', {
	                                                    alias: req.user.alias,
	                                                    home: "/user/home",
	                                                    titulo: "AlKa - Ficha Producto",
														ram: "/user/home/category/ram",
						                                hdd: "/user/home/category/disco duro",
						                                cajas:"/user/home/category/cajas",
						                                fuentes:"/user/home/category/fuentes",
						                                targetas:"/user/home/category/targetas graficas",
						                                configura: "/user/home/configura tu pc",
	                                                    componentes: "/user/home/category/componentes",
	                                                    placaBase:"/user/home/category/placa base",
	                                                    procesadores:"/user/home/category/procesadores",
	                                                    productosLista : arrayNombresProductos,
	                                                    modal:"modal",
	                                                    nameTarget:"#profileModal",
	                                                    entrarSalir: "Mi perfil",
	                                                    messageDangerRegistrar: req.flash('signupMessage'),
	                                                    messageSuccessRegistrar: req.flash('signupMessage'),
														messageDangerLogin: req.flash('loginMessage'),
	                                                    cantidad: cantidades,
	                                                    carrito: ProductosPedido,
	                                                    usuario: usuario,
	                                                    productoFicha: productoFicha,
	                                                    comentarValorar: comentarValorar,
	                                                    registrado: true,
	                                                    valoracionUsuario: valoracionUsuario
	                                                });
	                                            }else{
	                                                console.log('Error al mostrar los productos añadidos al pedido. '+err);
	                                            }
	                                        });
	                                    });
	                                }else{
	                                    console.log('Error al seleccionar el id de los productos añadidos al carrito. '+err);
	                                }
	                            });
	                        }else{
	                            console.log('Error al buscar el producto comprado '+err);
	                        }
	                    });
	                // Si el usuario no existe renderizo otros datos
	                }else{
	                    console.log('El usuario no está registrado');
	                    console.log('Mostrando productos añadidos al pedido');
	                                        res.render('fichaProducto', {
	                                            alias: "",
	                                            home: "/home",
	                                            titulo: "AlKa - Ficha Producto",
	                                            componentes: "/home/category/componentes",
	                                            placaBase:"/home/category/placa base",
	                                            procesadores:"/home/category/procesadores",
	                                            ram: "/user/home/category/ram",
				                                hdd: "/user/home/category/disco duro",
				                                cajas:"/user/home/category/cajas",
				                                fuentes:"/user/home/category/fuentes",
				                                targetas:"/user/home/category/targetas graficas",
				                                configura: "/user/home/configura tu pc",
				                                productosLista : arrayNombresProductos,
	                                            modal:"modal",
	                                            nameTarget:"#myModal",
	                                            entrarSalir: "Log In",
	                                            messageDangerRegistrar: req.flash('signupMessage'),
	                                            messageSuccessRegistrar: req.flash('signupMessage'),
												messageDangerLogin: req.flash('loginMessage'),
	                                            carrito: "",
	                                            productoFicha: productoFicha,
	                                            comentarValorar: comentarValorar,
	                                            registrado: false,
                                                valoracionUsuario: valoracionUsuario
	                                        });
	                }
	            }else{
	                console.log('Error al buscar el producto de la ficha '+err);
	            }
	        });
		});
    };

    comentario = function(req, res){
        var comentario = req.body.comentario,
            idUsuario = req.user._id,
            idProducto = req.body.idProducto,
            setUpdate = "";
        // Buscamos los productos comprados por el usuario
        Carrito.find({idUsuario: idUsuario, idProducto: idProducto, finalizar: true},
            function(err, productosComprados){
                if(!err){
                    console.log('Buscando los productos comprados por el usuario');
                    // Busco la información correspondiente del usuario
                    Usuarios.findOne({_id: idUsuario}, function(err, usuario){
                        if(!err){
                            console.log('Usuario encontrado');
                            var aliasUsuario = usuario.alias,
                                fotoUsuario = usuario.foto;
                            // Añadimos el comentario introducido por el usuario
                            Productos.update({_id: idProducto}, {$push:
                                                                    {comentario:
                                                                        {
                                                                            alias: aliasUsuario,
                                                                            foto: fotoUsuario,
                                                                            opinion: comentario
                                                                        }
                                                                    }
                                                                },
                                             function(err, result){
                                                if(!err){
                                                    console.log('Comentario guardado');
                                                    res.redirect('back');
                                                }else{
                                                    console.log('Error al guardar el comentario '+err);
                                                }
                            });
                        }else{
                            console.log('Error al buscar los productos comprados por el usuario '+err);
                        }
                    });
                }else{
                    console.log('Error al buscar la información del usuario '+err);
                }
        });
    };

    valoracion = function(req, res){
        var valoracion = req.body.numeroValoracion,
            idUsuario = req.user._id,
            nombreProducto = req.params.producto,
            productoValorado = false;
        //
        Productos.findOne({nombre: nombreProducto},function(err, producto){
            producto.valoracion.forEach(function(valoracion){
                if(valoracion.usuario!=undefined && valoracion.usuario.equals(idUsuario)){
                    productoValorado=true;
                }
            });
            if(productoValorado){
                Productos.update({nombre: nombreProducto, 'valoracion.usuario': idUsuario},{$set: {'valoracion.$.valor': valoracion}},
                                        function(err,result){
                                            if(!err){
                                                console.log('Valoración del producto actualizada');
                                                res.redirect('back');
                                            }else{
                                                console.log('Error al actualizar la valoracion del producto '+err);
                                            }
                                        }
                );
            }else{
                Productos.update({nombre: nombreProducto},{$push: {valoracion: {usuario:idUsuario, valor:valoracion}}},
                                        function(err,result){
                                            if(!err){
                                                console.log('Valoración del producto guardada');
                                                res.redirect('back');
                                            }else{
                                                console.log('Error al guardar la valoracion del producto '+err);
                                            }
                                        }
                );
            }
        });
    };

    // Funciones del carrito
    
    // Función que añade un producto al carrito
    anadirProductoCarrito = function (req,res){
        var idUsuario = "",
            idProducto = req.body.id;
        
        Usuarios.findOne({correo:req.user.correo},function (err,usuario){
            idUsuario = usuario._id;
            Carrito.find({idProducto: idProducto, idUsuario: idUsuario, finalizar: false},
                          function(err,productoCarrito){
                if(!err){
                    console.log('Comprobando si el producto escogido ya está en el carrito de este usuario');
                    if(productoCarrito.length == 0){
                        var carrito = new Carrito ({
                            idProducto: idProducto,
                            idUsuario: idUsuario
                        });
                        carrito.save({idProducto:idProducto,idUsuario:idUsuario},function (err,carritoProductos){
                            res.redirect('back');
                        });   
                    }else{
                        console.log('Producto ya existente en el carrito de este usuario');
                        res.redirect('back');
                    }
                }else{
                    console.log('Error en la comprobación de la existencia del producto escogido '+err);
                }
            });
        });
    };  

	realizarPedido = function (req,res){
        var usuarioObjID = "";
        var idProductos = [];
        var cantidadProductos = [];
        var arrayNombresProductos = [];
        //
        Productos.find(function (err,ProductosTienda){
        	for (var i = 0; i < ProductosTienda.length; i++ ){
				arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
			}
	        Usuarios.findOne({correo:req.user.correo},function (err,usuario){
	        	usuarioObjID = usuario._id;
		        Carrito.find({idUsuario:usuarioObjID, finalizar:false},function (err,ProductosCarrito){
		            if(!err){
		                ProductosCarrito.forEach(function(producto){
		                    idProductos.push(producto.idProducto);
		                    cantidadProductos.push(producto.cantidad);
		                });
		                var cantidades = cantidadProductos;
		                Productos.find({_id: {$in: idProductos}},function (err,ProductosPedido){
		                    Usuarios.findOne({_id: usuarioObjID}, function(err,usuario){
		                        if(!err){
		                            console.log('Mostrando productos añadidos al pedido');
		                            res.render('pedido', {
		                                alias:req.user.alias,
		                                home: "/user/home",
		                                titulo: "AlKa - Pedido",
		                                componentes: "/user/home/category/componentes",
		                                ram: "/user/home/category/ram",
		                                hdd: "/user/home/category/disco duro",
		                                cajas:"/user/home/category/cajas",
		                                fuentes:"/user/home/category/fuentes",
		                                targetas:"/user/home/category/targetas graficas",
		                                placaBase:"/user/home/category/placa base",
		                                procesadores:"/user/home/category/procesadores",
		                                configura: "/user/home/configura tu pc",
		                                productosLista : arrayNombresProductos,
		                                modal:"modal",
		                                nameTarget:"#profileModal",
		                                entrarSalir: "Mi perfil",
		                                messageDangerRegistrar: req.flash('signupMessage'),
		                                messageSuccessRegistrar: req.flash('signupMessage'),
										messageDangerLogin: req.flash('loginMessage'),
		                                cantidad: cantidades,
		                                carrito: ProductosPedido,
		                                usuario: usuario,
		                                ClaseCesta: "col-lg-3 active",
		                                ClaseEnvioypago: "col-lg-3 disabled",
		                                ClaseResumen: "col-lg-3 disabled",
		                                ClaseFinalizar: "col-lg-3 disabled",
		                                expandedCesta: true,
		                                expandedEnvioypago: false,
		                                expandedResumen: false,
		                                expandedFinalizar: false,
		                                activeinCesta: "tab-pane fade in active",
		                                activeinEnvioypago: "tab-pane fade",
		                                activeinResumen: "tab-pane fade",
		                                activeinFinalizar: "tab-pane fade"
		                            });
		                        }else{
		                            console.log('Error al mostrar los productos añadidos al pedido. '+err);
		                        }
		                    });
		                });
		            }else{
		                console.log('Error al seleccionar el id de los productos añadidos al carrito. '+err);
		            }
				});
			});
		});
	};
    
    envioypago = function(req,res){
        // Declaración de variables a utilizar
        var idUsuario = req.user._id,
            idProductosCarrito = req.body.idProductoCarrito,
            cantidades = req.body.cantidades,
            cantidades2 = [],
            cantidadModificada = 0,
            aux = 0,
            arrayNombresProductos = [];
        
        // Elimino los productos del carrito que a eliminado el usuario en el pedido
        Carrito.remove({idProducto: {$nin: idProductosCarrito}},function(err,result){
            if(!err){
                // Guardo las cantidades guardadas en el carrito
                Carrito.find({idUsuario: idUsuario, finalizar: false},function(err, productosCarrito){
                    productosCarrito.forEach(function(producto){
                        cantidades2.push(producto.cantidad);
                    });
                });
                // Recorrido del carrito
                Carrito.find({idUsuario: idUsuario, finalizar: false},function(err, productosCarrito){
                    // Por cada producto del carrito..
                    productosCarrito.forEach(function(producto){
                        // Creo variable con cantidades cambiadas por el usuario
                        if (cantidades==undefined) {
                            cantidades=cantidades2;
                        }
                        cantidadModificada = cantidades[aux];
                        // Actualizo las cantidades
                        Carrito.update({idProducto: producto.idProducto, idUsuario: idUsuario, finalizar: false},
                                       { $set: {cantidad: cantidadModificada}},
                            function(err,result){
                                if(!err){
                                    console.log('Cantidad del producto del carrito actualizada');
                                }else{
                                    console.log('Error al actualizar la cantidad del producto del carrito '+err);
                                }
                        });
                        aux++;
                    });
                    // Busco la información de los productos según el id del usuario
                    Productos.find(function (err,ProductosTienda){
                        for (var i = 0; i < ProductosTienda.length; i++ ){
                            arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
                        }
                        Productos.find({_id: {$in: idProductosCarrito}},function (err,ProductosPedido){
                            if(!err){
                                console.log('Buscando productos añadidos al pedido envio y pago');
                                //
                                Usuarios.findOne({_id: idUsuario}, function(err,usuario){
                                    if(!err){
                                        console.log('Mostrando información de usuario');
                                        // Envío toda la información a la página con los cambios hechos
                                        res.render('pedido', {
                                            alias:req.user.alias,
                                            home: "/user/home",
                                            titulo: "AlKa - Pedido",
                                            componentes: "/user/home/category/componentes",
                                            ram: "/user/home/category/ram",
                                            hdd: "/user/home/category/disco duro",
                                            cajas:"/user/home/category/cajas",
                                            fuentes:"/user/home/category/fuentes",
                                            targetas:"/user/home/category/targetas graficas",
                                            placaBase:"/user/home/category/placa base",
                                            procesadores:"/user/home/category/procesadores",
                                            configura: "/user/home/configura tu pc",
                                            productosLista : arrayNombresProductos,
                                            modal:"modal",
                                            nameTarget:"#profileModal",
                                            entrarSalir: "Mi perfil",
                                            messageDangerRegistrar: req.flash('signupMessage'),
	                                		messageSuccessRegistrar: req.flash('signupMessage'),
											messageDangerLogin: req.flash('loginMessage'),
                                            cantidad: cantidades,
                                            carrito: ProductosPedido,
                                            usuario: usuario,
                                            ClaseCesta: "col-lg-3",
                                            ClaseEnvioypago: "col-lg-3 active",
                                            ClaseResumen: "col-lg-3 disabled",
                                            ClaseFinalizar: "col-lg-3 disabled",
                                            expandedCesta: false,
                                            expandedEnvioypago: true,
                                            expandedResumen: false,
                                            expandedFinalizar: false,
                                            activeinCesta: "tab-pane fade",
                                            activeinEnvioypago: "tab-pane fade in active",
                                            activeinResumen: "tab-pane fade",
                                            activeinFinalizar: "tab-pane fade"
                                        });
                                    }else{
                                        console.log('Error al buscar el usuario');
                                    }
                                });
                            }else{
                                console.log('Error al mostrar los productos añadidos al pedido. '+err);
                            }
                        });
                    });
                });
            }else{
                console.log('Error al Eliminar los productos del carrito que a eliminado el usuario en el pedido'+err);
            }
        });
    };
    
    actualizarDatosPersonales = function(req,res){
        var idUsuario = req.user._id,
            nombre = req.body.nombre,
            apellidos = req.body.apellidos,
            telefono = req.body.telefono;
        var updateObject = {};
        
        // Actualizamos el nombre del usuario
        if(nombre!=null && nombre!=''){
            updateObject.nombre = nombre;
        }
        // Actualizamos los apellidos del usuario
        if(apellidos!=null && apellidos!=''){
            updateObject.apellidos = apellidos;
        }
        // Actualizamos el teléfono del usuario
        if(telefono!=null && telefono!=''){
            updateObject.telefono = telefono;
        }
        Usuarios.update({_id: idUsuario}, {$set:updateObject}, function(err, result){
            if(!err){
                console.log('Usuario actualizado');
                res.redirect('back');
            }else{
                console.log('Error al actualizar el usuario '+err);
            }
        });
    };
    
    actualizarDireccionEnvio = function(req, res){
        var idUsuario = req.user._id,
            calleEnvio=req.body.calleEnvio,
            numeroEnvio=req.body.numeroEnvio,
            pisoEnvio=req.body.pisoEnvio,
            puertaEnvio=req.body.puertaEnvio,
            cpEnvio=req.body.cpEnvio;
            
        // Comprobamos que no falte ningún campo de la dirección de envío
        if(calleEnvio!=null & numeroEnvio!=null & pisoEnvio!=null 
           & puertaEnvio!=null & cpEnvio!=null){
            // Actualización de los datos de usuario y de facturación
            Usuarios.update({_id: idUsuario}, 
                            {   'direccionEnvio.calle': calleEnvio,
                                'direccionEnvio.numero': numeroEnvio,
                                'direccionEnvio.piso': pisoEnvio,
                                'direccionEnvio.puerta': puertaEnvio,
                                'direccionEnvio.cp': cpEnvio
                            },
                            function(err, result){
                                if(!err){
                                    console.log('Dirección de envío guardada');
                                    res.redirect('back');
                                }else{
                                    console.log('Error al guardar la dirección de envío '+err);
                                }        
            });
        }
    };
    
    actualizarDireccionFacturacion = function(req, res){
        var idUsuario = req.user._id,
            calleFacturacion=req.body.calleFacturacion,
            numeroFacturacion=req.body.numeroFacturacion,
            pisoFacturacion=req.body.pisoFacturacion,
            puertaFacturacion=req.body.puertaFacturacion,
            cpFacturacion=req.body.cpFacturacion;
        
        // Búsqueda de coincidéncias en las direcciones de facturación de este usuario
        Usuarios.findOne({_id: idUsuario,
                          direccionFacturacion: {$elemMatch :{
                              calle: calleFacturacion,
                              numero: numeroFacturacion,
                              piso: pisoFacturacion,
                              puerta: puertaFacturacion,
                              cp: cpFacturacion
                          }}}, function(err,usuario){
            if(!err){
                if(usuario==null){
                // Actualización de los datos de usuario y de facturación
                Usuarios.update({_id: idUsuario}, 
                                { $push: { direccionFacturacion: {
                                    calle: calleFacturacion,
                                    numero: numeroFacturacion,
                                    piso: pisoFacturacion,
                                    puerta: puertaFacturacion,
                                    cp: cpFacturacion
                                        }
                                    }
                                },
                                function(err, result){
                                    if(!err){
                                        console.log('Dirección de facturación guardada');
                                        res.redirect('back');
                                    }else{
                                        console.log('Error al guardar la dirección de facturación '+err);
                                    }        
                                });
                }
            }else{
                console.log('Error al buscar coincidencias en las direcciones de facturación de este usuario '+err);
            }
        });
    };
    
    actualizarMetodoPago = function(req, res){
        var idUsuario = req.user._id,
            metodoPago = req.body.metodoPago,
            numeroCuenta = req.body.cuentaVisa,
            cuentaPaypal = req.body.cuentaPaypal;        
        
        // Si selecciona un método de pago diferente al ya predeterminado, lo actualizamos en la BBDD
        Usuarios.findOne({_id: idUsuario}, function(err, usuario){
            if(!err){
                var metodo = usuario.metodoPago;
                if(metodo!=metodoPago){
                    if(metodoPago=='visa'){
                        Usuarios.update({_id: idUsuario},
                                        {metodoPago: metodoPago, numeroCuenta: numeroCuenta},
                                        function(err, result){
                            if(!err){
                                console.log('Método de pago actualizado');
                                res.redirect('back');
                            }else{
                                console.log('Error al actualizar el método de pago '+err);
                            }
                        });
                    }else if(metodoPago=='paypal'){
                        Usuarios.update({_id: idUsuario},
                                        {metodoPago: metodoPago, cuentaPaypal: cuentaPaypal},
                                        function(err, result){
                            if(!err){
                                console.log('Método de pago actualizado');
                                res.redirect('back');
                            }else{
                                console.log('Error al actualizar el método de pago '+err);
                            }
                        });
                    }
                }
            }else{
                console.log('Error al buscar el usuario '+err);
            }
        });
    };
    
    guardarPedido = function(req,res){
        // Declaración de variables a utilizar
        var idUsuario = req.user._id,
            idProductos = [],
            cantidadProductos = [],
            arrayNombresProductos = [];
        
        // Actualizando el pedido del carrito como finalizado
        Carrito.update({idUsuario: idUsuario, finalizar: false},
                        { 
                            $set: {finalizar: true}, 
                            $currentDate: {fechaCreacionCarrito: true}
                        },
                        { multi: true },
                        function(err, result){
                            if(!err){
                                console.log('Actualizando el pedido del carrito como finalizado');
                            }else{
                                console.log('Error al actualizar el pedido como finalizado '+err);
                            }
        });
        Productos.find(function (err,ProductosTienda){
        	for (var i = 0; i < ProductosTienda.length; i++ ){
				arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
			}
	        // Buscando los productos del carrito de este usuario
	        Carrito.find({idUsuario: idUsuario, finalizar: true},function(err, productosCarrito){
	            if (!err) {
	                productosCarrito.forEach(function(producto){
	                    idProductos.push(producto.idProducto);
	                    cantidadProductos.push(producto.cantidad);
	                });
	                var cantidades = cantidadProductos;
	                // Busco la información de los productos según el id del usuario
	                Productos.find({_id: {$in: idProductos}},function (err,ProductosPedido){
	                    if(!err){
	                        console.log('buscando productos añadidos al pedido envio y pago');
	                        // Mostrando información de usuario
	                        Usuarios.findOne({_id: idUsuario}, function(err,usuario){
	                            if(!err){
	                                console.log('Mostrando información usuario');
	                                // Envío toda la información a la página con los cambios hechos
	                                res.render('pedido', {
	                                    alias:req.user.alias,
	                                    home: "/user/home",
	                                    titulo: "AlKa - Pedido",
	                                    ram: "/user/home/category/ram",
	                                    hdd: "/user/home/category/disco duro",
	                                    cajas:"/user/home/category/cajas",
	                                    fuentes:"/user/home/category/fuentes",
	                                    targetas:"/user/home/category/targetas graficas",
	                                    componentes: "/user/home/category/componentes",
	                                    placaBase:"/user/home/category/placa base",
	                                    procesadores:"/user/home/category/procesadores",
	                                    configura: "/user/home/configura tu pc",
	                                    productosLista : arrayNombresProductos,
	                                    modal:"modal",
	                                    nameTarget:"#profileModal",
	                                    entrarSalir: "Mi perfil",
	                                    messageDangerRegistrar: req.flash('signupMessage'),
	                                    messageSuccessRegistrar: req.flash('signupMessage'),
										messageDangerLogin: req.flash('loginMessage'),
	                                    cantidad: cantidades,
	                                    carrito: ProductosPedido,
	                                    usuario: usuario,
	                                    ClaseCesta: "col-lg-3",
	                                    ClaseEnvioypago: "col-lg-3",
	                                    ClaseResumen: "col-lg-3",
	                                    ClaseFinalizar: "col-lg-3 active",
	                                    expandedCesta: false,
	                                    expandedEnvioypago: false,
	                                    expandedResumen: false,
	                                    expandedFinalizar: true,
	                                    activeinCesta: "tab-pane fade",
	                                    activeinEnvioypago: "tab-pane fade",
	                                    activeinResumen: "tab-pane fade",
	                                    activeinFinalizar: "tab-pane fade in active"
	                                });
	                            }else{
	                                console.log('Error al buscar el usuario');
	                            }
	                        });
	                    }else{
	                        console.log('Error al mostrar los productos añadidos al pedido. '+err);
	                    }
	                });
	            } else {
	                console.log('Error al buscar los productos '+err);
	            }
	        });
	    }); 
    };

    quitarProductoCarrito = function (req,res){
    	Carrito.remove({idProducto: req.body.idProductoCarrito,idUsuario:req.user._id,finalizar:false}, function (err,result){
    		console.log("Eliminando producto del carrito");
			res.redirect('back');
		});
    };
    
    misPedidos = function(req, res){
         var idUsuario = req.user._id,
             idProductos = [],
             cantidadProductos = [],
             arrayNombresProductos = [],
             fechas = [],
             auxFecha = true;
        //
        Productos.find(function (err,ProductosTienda){
	        for (var i = 0; i < ProductosTienda.length; i++ ){
				arrayNombresProductos.push([ProductosTienda[i].nombre + "¬" + ProductosTienda[i].foto]);
			}
            // Buscando los productos del carrito de este usuario
	        Carrito.find({idUsuario: idUsuario, finalizar: true},function(err, productosCarrito){
	            if (!err) {
	                productosCarrito.forEach(function(producto){
	                    idProductos.push(producto.idProducto);
	                    cantidadProductos.push(producto.cantidad);
                        fechas.forEach(function(fecha){
                            if(fecha!=undefined && fecha==producto.fechaCreacionCarrito){
                                auxFecha = false;
                            }
                        });
                        if(auxFecha){
                            fechas.push(producto.fechaCreacionCarrito);
                        }
	                });
	                var cantidades = cantidadProductos;
	                // Busco la información de los productos según el id del usuario
	                Productos.find({_id: {$in: idProductos}},function (err,ProductosPedido){
	                    if(!err){
	                        console.log('buscando productos añadidos al pedido envio y pago');
	                        // Mostrando información de usuario
	                        Usuarios.findOne({_id: idUsuario}, function(err,usuario){
	                            if(!err){
	                                console.log('Mostrando información usuario');
	                                // Envío toda la información a la página con los cambios hechos
	                                res.render('misPedidos', {
	                                    alias:req.user.alias,
	                                    home: "/user/home",
	                                    titulo: "AlKa - Mis pedidos",
	                                    ram: "/user/home/category/ram",
	                                    hdd: "/user/home/category/disco duro",
	                                    cajas:"/user/home/category/cajas",
	                                    fuentes:"/user/home/category/fuentes",
	                                    targetas:"/user/home/category/targetas graficas",
	                                    componentes: "/user/home/category/componentes",
	                                    placaBase:"/user/home/category/placa base",
	                                    procesadores:"/user/home/category/procesadores",
	                                    configura: "/user/home/configura tu pc",
	                                    productosLista : arrayNombresProductos,
	                                    modal:"modal",
	                                    nameTarget:"#profileModal",
	                                    entrarSalir: "Mi perfil",
	                                    messageDangerRegistrar: req.flash('signupMessage'),
	                                    messageSuccessRegistrar: req.flash('signupMessage'),
										messageDangerLogin: req.flash('loginMessage'),
	                                    cantidad: cantidades,
	                                    carrito: ProductosPedido,
	                                    usuario: usuario,
                                        fechas: fechas
	                                });
	                            }else{
	                                console.log('Error al buscar el usuario');
	                            }
	                        });
	                    }else{
	                        console.log('Error al mostrar los productos añadidos al pedido. '+err);
	                    }
	                });
	            } else {
	                console.log('Error al buscar los productos '+err);
	            }
	        });
        });
    };

    app.get('/',indexWeb);
	app.get('/home',indexWeb);
	app.get('/user/home',isLoggedIn,indexWebLogin);
	app.all('/home/configura%20tu%20pc',configuraTuPC);
	app.all('/user/home/configura%20tu%20pc',isLoggedIn,configuraTuPC);
	app.get('/user/home/listarProductosForm',isLoggedIn,listarProductosForm);
	app.get('/user/home/listarUsuariosForm',isLoggedIn,listarUsuariosForm);
	app.get('/user/home/listarMarcasForm',isLoggedIn,listarMarcasForm);
	app.post('/user/home/listarMarcaEscojida',isLoggedIn,listarMarca);
	app.get('/user/home/anadirProductoForm',isLoggedIn,anadirProductoForm);
	app.get('/user/home/anadirMarcaForm',isLoggedIn,anadirMarcaForm);
	app.post('/user/home/anadirProducto',isLoggedIn,anadirProducto);
	app.post('/user/home/actualizarProducto',isLoggedIn,actualizarProducto);
	app.post('/user/home/anadirMarca',isLoggedIn,anadirMarca);
	app.post('/user/home/eliminarProducto',isLoggedIn,eliminarProducto);
	app.all('/home/category/componentes',todosProductosWeb);
	app.all('/user/home/category/componentes',isLoggedIn,todosProductosWebLogin);
	app.all('/home/category/:producto',productosWeb);
	app.all('/user/home/category/:producto',isLoggedIn,productosWebLogin);
	app.get('/user/home/logout',isLoggedIn,logoutWeb);
	app.get('/user/home/miperfil',isLoggedIn,miperfil);
	app.post('/user/home/user/home/miperfil/actualizarDatos',isLoggedIn,actualitzarPerfil);
	app.post('/user/home/miperfil/upload',isLoggedIn,subirFoto);
	app.post('/user/home/producto/upload',isLoggedIn,subirFotoProducto);
	app.post('/user/home/producto/update',isLoggedIn,updateFotoProducto)
	app.post('/home/login',passport.authenticate('local-login',{ successRedirect : '/user/home', failureRedirect : '/home', failureFlash : true }));
	app.post('/home/register',passport.authenticate('local-register',{ successRedirect : '/home', failureRedirect : '/home', failureFlash : true }));
    app.get('/user/home/pedido',realizarPedido);
    app.post('/user/home/anadeProductoCarrito', isLoggedIn, anadirProductoCarrito);
    app.post('/user/home/quitarProductoCarrito', isLoggedIn, quitarProductoCarrito);
    app.get('/user/home/pedido',isLoggedIn,realizarPedido);
    app.all('/user/home/pedido/envioypago',isLoggedIn,envioypago);
    app.all('/user/home/pedido/envioypago/actualizarDatos',isLoggedIn,actualizarDatosPersonales);
    app.all('/user/home/pedido/envioypago/actualizarDireccionEnvio',isLoggedIn,actualizarDireccionEnvio);
    app.all('/user/home/pedido/envioypago/actualizarDireccionFacturacion',isLoggedIn,actualizarDireccionFacturacion);
    app.all('/user/home/pedido/envioypago/actualizarMetodoPago',isLoggedIn,actualizarMetodoPago);
    app.all('/user/home/pedido/finalizar',isLoggedIn,guardarPedido);
    app.all('/home/:producto',fichaProducto);
    app.post('/user/home/:producto/comentario',isLoggedIn,comentario);
    app.post('/user/home/:producto/valoracion',isLoggedIn,valoracion);
    app.get('/user/home/mispedidos',isLoggedIn,misPedidos);

};
function isLoggedIn(req, res, next) {
    // si esta autenticado en la sesion, sigue adelante 
    if (req.isAuthenticated())
    	return next();
    // sino lo redirigimos a la pagina de inicio.
    res.redirect('/home');
};
