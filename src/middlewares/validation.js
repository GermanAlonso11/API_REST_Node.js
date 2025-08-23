//Validar la creacion de un rol
exports.validateRole = (req, res, next) => {
    const {name} = req.body;

    if (!name) {
        return res.status(400).json({error: 'El nombre del rol es obligatorio'})
    }

    //Validar cantidad de caracteres del nombre del rol
    if (name.length <2 || name.length >50) {
        return res.status(400).json({
            error: 'El nombre del rol debe tener entre 2 y 50 caracteres'
        });
    }
    next();
};

//Validar la actualizacion de un rol
exports.validateRoleUpdate = (req, res, next) => {
    const {name} = req.body;

    if(name && (name.length <2 || name.length > 50)){
        return res.status(400).json({
            error: 'El nombre del rol debe tener entre 2 y 50 caracteres'
        });
    }
    next();
};

//Validar el nombre de usuario
exports.validateUserName = (req, res, next) => {
    const {name} = req.body;

    if (!name) {
        return res.status(400).json({error: 'El nombre de usuario es obligatorio'})
    }

    //Validar cantidad de caracteres del nombre de usuario
    if (name.length <2 || name.length >50) {
        return res.status(400).json({
            error: 'El nombre de usuario debe tener entre 2 y 50 caracteres'
        });
    }
    next();
};
