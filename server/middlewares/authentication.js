const {verificarUser, obtenerRol} = require('../modulos/funciones');


async function userLoginReg(req,res,next){

    const verificado = await verificarUser(req)

    if(verificado){

        return res.redirect('/')

    }else{

        next();

    }

};

async function adminPass(req,res,next){

    const rol = await obtenerRol(req);

    if(rol !== 'Admin'){

        return res.status(403).send('Error 403 Forbidden')

    }else{

        return next()

    }

}

async function SoloUser(req,res,next){

    const user = await verificarUser(req);

    if(!user){

        return res.redirect('/login')

    }else{

        return next()

    }

}



module.exports = {

    userLoginReg, adminPass, SoloUser,

}