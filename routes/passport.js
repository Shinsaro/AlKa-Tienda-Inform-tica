// load all the things we need
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../model/usuarios');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // =======================Passport Session Setup ===========================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, {_id : user.id, alias: user.alias, contrasena:user.contrasena, correo: user.correo});
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // ============================LOCAL SIGNUP ================================
    // =========================================================================
    
    passport.use('local-register', new LocalStrategy({
        usernameField : 'alias',
        passwordField : 'contrasena',
        passReqToCallback : true 
    },
    function(req, alias, contrasena, done) {
        var correo = req.body.correo;
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'correo' :  correo }, function(err, user) {
                // si hay errores retornara los errores.
                if (err)
                    return done(err);
                // miramos si existe un usuario con ese correo.
                if (user) {
                    return done(null, false, req.flash('signupMessageFail', 'El correo ya esta en uso.'));
                } else {
                    // si no hay un usuario con ese correo lo crea
                    req.flash('signupMessageOk', 'Registrado correctamente ahora puedes loguearte.');
                    var usuarioNuevo = new User(req.body);
                    usuarioNuevo.foto = "/images/fotosPerfilUsuarios/default.png";
                    usuarioNuevo.correo = correo;
                    usuarioNuevo.contrasena = usuarioNuevo.generateHash(contrasena);
                    usuarioNuevo.alias = alias;
                    usuarioNuevo.admin = false;
                    // hacemos un save en mongodb
                    usuarioNuevo.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, usuarioNuevo);
                    });
                }
            });
        });
    }));

    // =========================================================================
    // ============================LOCAL LOGIN =================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
        usernameField : 'alias',
        passwordField : 'contrasena',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, alias, contrasena, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'alias' :  alias }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Usuario no encontrado.'));
            // if the user is found but the password is wrong
            if (!user.validPassword(contrasena))
                return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
            // all is well, return successful user
            return done(null, user);
        });
    }));
};