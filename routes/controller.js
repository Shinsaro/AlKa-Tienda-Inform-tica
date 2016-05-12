var Productos = require('../model/productos.js');
var Usuarios = require('../model/usuarios.js');
var Carrito = require('../model/carrito.js');
var Factura = require('../model/factura.js');
var mongoose = require('mongoose');

module.exports = function(app,passport){
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
			procesadores:"/user/home/category/procesadores",
            carrito: ""
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
    
    
    // Funciones del carrito
    
    // Función que añade un producto al carrito
    anadirProductoCarrito = function (req,res){
        var idUsuario = "",
            idProducto = req.body.id;
        
        Usuarios.findOne({correo:req.user.correo},function (err,usuario){
            idUsuario = usuario._id;
            Carrito.find({idProducto: idProducto, idUsuario: idUsuario},
                          function(err,productoCarrito){
                if(!err){
                    console.log('Comprobando si el producto escogido ya está en el carrito de este usuario');
                    if(productoCarrito.length == 0){
                        var carrito = new Carrito ({
                            idProducto: idProducto,
                            idUsuario: idUsuario
                        });
                        carrito.save({idProducto:idProducto,idUsuario:idUsuario},
                                     function (err,carritoProductos){
                            console.log(carritoProductos);
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
        var usuarioObjID = req.user._id;
        var idProductos = [];
        var cantidadProductos = [];
        Carrito.find({idUsuario:usuarioObjID},function (err,ProductosCarrito){
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
                                titulo: "pedido",
                                placaBase:"/user/home/category/placa base",
                                procesadores:"/user/home/category/procesadores",
                                modal:"modal",
                                nameTarget:"#profileModal",
                                entrarSalir: "Mi perfil",
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
	};
    
    envioypago = function(req,res){
        // Declaración de variables a utilizar
        var idUsuario = req.user._id;
        var idProductosCarrito = [];
        var cantidades = req.body.cantidades;
        var cantidades2 = [];
        var cantidadModificada = 0
        var aux = 0;
        
        // Guardo las cantidades guardadas en el carrito
        Carrito.find({idUsuario: idUsuario},function(err, productosCarrito){
            productosCarrito.forEach(function(producto){
                cantidades2.push(producto.cantidad);
            });
        });
        
        // Recorrido del carrito
        Carrito.find({idUsuario: idUsuario},function(err, productosCarrito){
            // Por cada producto del carrito..
            productosCarrito.forEach(function(producto){
                // Guardo en un array los id
                idProductosCarrito.push(producto.idProducto);
                // Creo variable con cantidades cambiadas por el ususario
                if (cantidades==undefined) {
                    cantidades=cantidades2;
                }
                cantidadModificada = cantidades[aux];
                // Actualizo las cantidades
                Carrito.update({idProducto: producto.idProducto},
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
            // Busco la información de los productos según el id del ususario
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
                                titulo: "pedido",
                                placaBase:"/user/home/category/placa base",
                                procesadores:"/user/home/category/procesadores",
                                modal:"modal",
                                nameTarget:"#profileModal",
                                entrarSalir: "Mi perfil",
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
    
    guardarFactura = function(req,res){
        // Declaración de variables a utilizar
        var idUsuario = req.user._id,
            idProductosCarrito = [],
            cantidades = [];
        
        // Guardo la factura
        Factura.update({}
        
        );
        
        // Buscando los productos del carrito de este usuario
        Carrito.find({idUsuario: idUsuario},function(err, productosCarrito){
            productosCarrito.forEach(function(producto){
                idProductosCarrito.push(producto.idProducto);
                cantidades.push(producto.cantidad);
            });
            // Busco la información de los productos según el id del ususario
            Productos.find({_id: {$in: idProductosCarrito}},function (err,ProductosPedido){
                if(!err){
                    console.log('buscando productos añadidos al pedido envio y pago');
                    //
                    Usuarios.findOne({_id: idUsuario}, function(err,usuario){
                        if(!err){
                            console.log('Mostrando información usuario');
                            // Envío toda la información a la página con los cambios hechos
                            res.render('pedido', {
                                alias:req.user.alias,
                                home: "/user/home",
                                titulo: "pedido",
                                placaBase:"/user/home/category/placa base",
                                procesadores:"/user/home/category/procesadores",
                                modal:"modal",
                                nameTarget:"#profileModal",
                                entrarSalir: "Mi perfil",
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
        }); 
    };
    
       

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
    app.post('/anadeProductoCarrito', isLoggedIn, anadirProductoCarrito);
    app.get('/user/home/pedido',isLoggedIn,realizarPedido);
    app.all('/user/home/pedido/envioypago',isLoggedIn,envioypago);
    app.all('/user/home/pedido/envioypago/actualizarDatos',isLoggedIn,actualizarDatosPersonales);
    app.all('/user/home/pedido/envioypago/actualizarDireccionEnvio',isLoggedIn,actualizarDireccionEnvio);
    app.all('/user/home/pedido/envioypago/actualizarDireccionFacturacion',isLoggedIn,actualizarDireccionFacturacion);
    app.all('/user/home/pedido/envioypago/actualizarMetodoPago',isLoggedIn,actualizarMetodoPago);
    app.get('/user/home/pedido/guardarFactura',isLoggedIn,guardarFactura);


};
function isLoggedIn(req, res, next) {
    // si esta autenticado en la sesion, sigue adelante 
    if (req.isAuthenticated())
    	return next();
    // sino lo redirigimos a la pagina de inicio.
    res.redirect('/home');
}