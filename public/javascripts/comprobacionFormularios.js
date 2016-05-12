$(function(){
    //
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
    //
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
    //
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
                        regexp: /^[a-z\s]+$/i,
                        message: 'El nombre no tiene un formato correcto.'
                    }
                }
            },
            apellidos: {
                validators: {
                    notEmpty: {
                        message: 'Los apellidos no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[a-z\s]+$/i,
                        message: 'Los paellidos no tienen un formato correcto.'
                    }
                }
            },
            telefono: {
                validators: {
                    notEmpty: {
                        message: 'El teléfono no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[69][0-9]{8}$/,
                        message: 'El teléfono no tiene un formato correcto.'
                    }
                }
            }
        }
    });
    //
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
                        regexp: /^[a-z\s]+$/i,
                        message: 'La calle no tiene un formato correcto.'
                    }
                }
            },
            numeroEnvio: {
                validators: {
                    notEmpty: {
                        message: 'El número no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[0-9]+(( )?-( )?[0-9]+)?$/,
                        message: 'El número no tiene un formato correcto.'
                    }
                }
            },
            pisoEnvio: {
                validators: {
                    notEmpty: {
                        message: 'El piso no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'El piso no tiene un formato correcto.'
                    }
                }
            },
            puertaEnvio: {
                validators: {
                    notEmpty: {
                        message: 'La puerta no puede estar vacía.'
                    },
                    regexp: {
                        regexp: /^[0-9]+/,
                        message: 'La puerta no tiene un formato correcto.'
                    }
                }
            },
            cpEnvio: {
                validators: {
                    notEmpty: {
                        message: 'El código postal no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[0-9]{5}$/,
                        message: 'El código postal no tiene un formato correcto.'
                    }
                }
            }
        }
    });
    //
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
                        regexp: /^[a-z\s]+$/i,
                        message: 'La calle no tiene un formato correcto.'
                    }
                }
            },
            numeroFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'El número no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[0-9]+(( )?-( )?[0-9]+)?$/,
                        message: 'El número no tiene un formato correcto.'
                    }
                }
            },
            pisoFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'El piso no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'El piso no tiene un formato correcto.'
                    }
                }
            },
            puertaFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'La puerta no puede estar vacía.'
                    },
                    regexp: {
                        regexp: /^[0-9]+/,
                        message: 'La puerta no tiene un formato correcto.'
                    }
                }
            },
            cpFacturacion: {
                validators: {
                    notEmpty: {
                        message: 'El código postal no puede estar vacío.'
                    },
                    regexp: {
                        regexp: /^[0-9]{5}$/,
                        message: 'El código postal no tiene un formato correcto.'
                    }
                }
            }
        }
    });
    //
	$('#formMetodoPago').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            cuentaVisa: {
                validators: {
                    notEmpty: {
                        message: 'La cuenta de la visa no puede estar vacía.'
                    },
                    regexp: {
                        regexp: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                        message: 'La cuenta de la visa no tiene un formato correcto.'
                    }
                }
            },
            cuentaPaypal: {
                validators: {
                    notEmpty: {
                        message: 'La cuenta de paypal no puede estar vacía.'
                    },
                    emailAddress: {
                        message: 'La cuenta de paypal no es válida.'
                    }
                }
            }
        }
    });
    //
	$('#formCesta').bootstrapValidator({
        framework: 'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            cantidades: {
                validators: {
                    notEmpty: {
                        message: 'La cantidad no puede estar vacía.'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'La cantidad no tiene un formato correcto.'
                    }
                }
            }
        }
    });
});