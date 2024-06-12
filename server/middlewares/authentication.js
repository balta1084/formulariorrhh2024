const {verificarUser} = require('../modulos/funciones')

async function userLoginReg(req,res,next){

    const verificado = await verificarUser(req)

    if(verificado){

        return res.redirect('/')

    }else{

        next();

    }

};


module.exports = {

    userLoginReg

}