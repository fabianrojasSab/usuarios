const mongoose = require("mongoose"); //npm i mongoose


// se crea el schema para el diseño que tendran los datos
const userSchema  = new mongoose.Schema({
    id:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:false,
    },
    email:{
        type:String,
        require:true,
    },
    address:{
        street:{type:String, require:false},
        suite:{type:String, require:false},
        city:{type:String, require:true},
        zipcode:{type:String, require:false}
    },
    company:{
        name:String
    }
});
const User = new mongoose.model('User', userSchema )

module.exports = User;