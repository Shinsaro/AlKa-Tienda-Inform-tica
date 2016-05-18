$(function(){
    // Validación del formulario de registro de ussuario
	$('#formRegister').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            alias: {
                validators: {
                    notEmpty: {
                        message: 'El nombre no puede estar vacio.'
                    }
                }
            },
            correo: {
                validators: {
                    notEmpty: {
                        message: 'El correo no lo puedes dejar vacio.'
                    },
                    emailAddress: {
                        message: 'El correo no es valido.'
                    }
                }
            },
            contrasena: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña no puede estar vacia.'
                    }
                }
            },
            contrasena2: {
                validators: {
                    identical: {
                        field: "contrasena",
                        message: 'La contraseña no es igual.'   
                    },
                    notEmpty: {
                        message: 'La contraseña no puede estar vacia.'
                    }
                }
            }
        }
    });
    // Validación del formulario de acceso a una cuenta de usuario
	$('#formLogin').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            alias: {
                row: '.col-xs-8',
                validators: {
                    notEmpty: {
                        message: 'El nombre no puede estar vacio.'
                    }
                }
            },
            contrasena: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña no puede estar vacia.'
                    }
                }
            }
        }
    });
    // Validación de actualización de datos
    $('#formDatosPersonales').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'El nombre no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^([a-zA-Z]+( )?)+$',
                        message: 'El formato del nombre no es correcto.'
                    }
                }
            },
            apellidos: {
                validators: {
                    notEmpty: {
                        message: 'Los apellidos no pueden estar vacíos.'
                    },
                    regexp: {
                        regexp: '^([a-zA-Z]+( )?)+$',
                        message: 'El formato de los apellidos no es correcto.'
                    }
                }
            },
            telefono: {
                validators: {
                    notEmpty: {
                        message: 'El teléfono no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[69][0-9]{8}$',
                        message: 'El formato del teléfono no es correcto.'
                    }
                }
            }
        }
    });
    // Validación de la dirección de envío
    $('#formDireccionEnvio').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            calleEnvio: {
                validators: {
                    notEmpty: {
                        message: 'La calle no puede estar vacía.'
                    },
                    regexp: {
                        regexp: '^([a-zA-Z]+( )?)+$',
                        message: 'El formato de la calle no es correcto.'
                    }
                }
            },
            numeroEnvio: {
                validators: {
                    notEmpty: {
                        message: 'El número no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[0-9]+(( )?-( )?[0-9]+)?$',
                        message: 'El formato del número no es correcto.'
                    }
                }
            },
            pisoEnvio: {
                validators: {
                    notEmpty: {
                        message: 'El piso no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[0-9]+$',
                        message: 'El formato del piso no es correcto.'
                    }
                }
            },
            puertaEnvio: {
                validators: {
                    notEmpty: {
                        message: 'La puerta no puede estar vacía.'
                    },
                    regexp: {
                        regexp: '^[0-9]+$',
                        message: 'El formato de la puerta no es correcto.'
                    }
                }
            },
            cpEnvio: {
                validators: {
                    notEmpty: {
                        message: 'El código postal no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[0-9]{5}$',
                        message: 'El formato del código postal no es correcto.'
                    }
                }
            }
        }
    });
    // Validación de la dirección de facturacion
    $('#formDireccionFacturacion').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            calleFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'La calle no puede estar vacía.'
                    },
                    regexp: {
                        regexp: '^([a-zA-Z]+( )?)+$',
                        message: 'El formato de la calle no es correcto.'
                    }
                }
            },
            numeroFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'El número no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[0-9]+(( )?-( )?[0-9]+)?$',
                        message: 'El formato del número no es correcto.'
                    }
                }
            },
            pisoFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'El piso no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[0-9]+$',
                        message: 'El formato del piso no es correcto.'
                    }
                }
            },
            puertaFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'La puerta no puede estar vacía.'
                    },
                    regexp: {
                        regexp: '^[0-9]+$',
                        message: 'El formato de la puerta no es correcto.'
                    }
                }
            },
            cpFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'El código postal no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[0-9]{5}$',
                        message: 'El formato del código postal no es correcto.'
                    }
                }
            }
        }
    });
    // Validación del método de pago
    $('#formMetodoPago').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            cuentaPaypal: {
                validators: {
                    notEmpty: {
                        message: 'La cuenta de PayPal no puede estar vacía.'
                    },
                    emailAddress: {
                        message: 'El formato de la cuenta no es correcto.'
                    }
                }
            },
            cuentaVisa: {
                validators: {
                    notEmpty: {
                        message: 'El número de cuenta no puede estar vacío.'
                    },
                    regexp: {
                        regexp: '^[0-9]{4}(-[0-9]{4}){3}$',
                        message: 'El formato de la cuenta no es correcto.'
                    }
                }
            }
        }
    });
});
