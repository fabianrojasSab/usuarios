const express = require("express"); // npm i express
const router = express.Router();
const User = require("../userModel"); // importa el modelo para la base de datos

// ruta que al cargar la imagen guarda la informacion en la base de datos
router.route("/").post((req, res) =>{

    const newUsers = req.body;
    User.insertMany(newUsers);
    res.json('received')
})

// realiza la consulta a la base de datos para obtener todos los usuarios
router.route("/users").get ( async  (req, res) =>{
    const users = await User.find();
    res.json(users);
    
})

// crear los usuarios
router.route("/create").post((req, res) =>{

    const newUser = new User({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        address:{city:req.body.addressCity},
        company:{name:req.body.companyName}
    });
    newUser.save();
    res.json('received')
})

//elimina los usuarios
router.route("/delete/").delete ( async  (req, res) =>{
    const users = await User.deleteOne(req.params);
    console.log(users);
    res.json(users);
    
})

//modifica los usuarios en la base de datos
router.route("/put/").put ( async  (req, res) =>{
    const newUser = ({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        address:{city:req.body.addressCity},
        company:{name:req.body.companyName}
    });
    console.log(req.body.id);
    const users = await User.findOneAndUpdate({id:req.body.id}, newUser);
    console.log(users);
    res.json(users);
    
})

module.exports = router;