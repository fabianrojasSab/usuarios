const express = require ("express");
const app  = express();
const cors  = require ("cors"); // npm i cors
const mongoose = require ("mongoose");

// se crean las contrantes para la conexion a la base de datos
  const user = 'fabian';
  const password = 'Mrrobot';
  const dbname = 'user';
  const uri =  `mongodb+srv://${user}:${password}@cluster0.yfbyd.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// se realiza la conexion a la base de datos con monogoose
  mongoose.connect(uri)
      .then(() => console.log('base de datos conectada'))
      .catch(e => console.log(e));

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/userRoute"));

app.listen(3001, function(){
    console.log("express server is runin on port 3001")
})

//iniciar el servidor con node index.js en la ruta usuarios\server