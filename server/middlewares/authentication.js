const {verificarUser, obtenerRol} = require('../modulos/funciones')

async function userLoginReg(req,res,next){

    const verificado = await verificarUser(req)

    if(verificado){

        return res.redirect('/')

    }else{

        next();

    }

};

async function adminPass(req,res){

    const rol = await obtenerRol(req);

    if(rol === 'Admin'){

        return res.redirect('/admin')

    }else{

        return next()

    }

}

async function userNotPass(req,res){

    const rol = await obtenerRol(req);

    if(rol !== 'Admin'){

        return res.redirect('/')

    }else{

        return next()

    }

}

module.exports = {

    userLoginReg, adminPass, userNotPass

}