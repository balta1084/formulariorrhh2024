const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config()


async function encrypt(pass){

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(pass,salt)

    return hashpassword

};

async function comparar(pass, passEncrypt){

    const verificar = await bcryptjs.compare(pass, passEncrypt)

    return verificar

}

module.exports = {

    encrypt, comparar

}