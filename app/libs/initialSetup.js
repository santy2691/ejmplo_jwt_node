const Role = require('../models/Role');

const createRole = async () => {

    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;
    
        await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: "moderador"}).save(),
            new Role({name: 'admin'}).save()
        ])

        console.log("se crearon los roles");
    } catch (error) {
        console.log(error);
    
    }

}

module.exports = createRole