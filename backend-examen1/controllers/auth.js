const login = async( req, res = response) =>{

    const {email, password} = req.body;

    try{
        //Verificacion de correo
        const usuarioDB = await usuario.findOne({email});

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Correo no es valido'
            });
        }
    
    //verificacion de contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña invalida!!!'
        });
    }

    res.json({
        ok: true,
        msg: 'Credenciales son correctas!!!'
    })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Eror con el login'
        })
    }

}

module.exports = {
    login
}