
/// Michael Fabian Rojas 
// 17/01/2022
// 3132172728

//iniciar el servidor con node index.js en la ruta usuarios\server

import {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//npm i --save @fortawesome/fontawesome-svg-core
//npm install --save @fortawesome/free-solid-svg-icons
//npm install --save @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Gravatar from 'react-gravatar';
import { Modal } from 'react-bootstrap';
import axios from "axios"; // npm i axios
import './App.css';

function App() {
  
  //constante con la URL de la API
  const url = 'https://jsonplaceholder.typicode.com/users/'
  
  //controlador para el formulario de insertar
  const [showModalInsert, setShowModalInsert] = useState(false);
  const handleCloseModalInsert = () => setShowModalInsert(false);
  const handleShowModalInsert = () => setShowModalInsert(true);

  //controlador para el formulario de eliminar
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);

 
  const [users, setUsers] = useState([]);
  const [formValue, setFormValue] = useState({
    id: '',
    name: '',
    email: '',
    addressCity: '',
    companyName: '',
    tipoModal: ''
  });

//************************************************************** */
//funcion que al cargar la pagina realiza la peticion a la API y la envia
// a servidor para ser guardada en la base de datos
  useEffect( () => {
   
    axios.get(url).then( async response=>{
    axios.post('http://localhost:3001/', response.data)
    console.log(response.data) 
    await peticionGet();
  }).catch(error=>{
    console.log(error.message);
  });
}, [])


//////////////////////////peticiones ////////////////////////////////
// peticion al servidor para traer los usuarios
  const peticionGet=()=>{
    axios.get("http://localhost:3001/users").then(response=>{
      setUsers(response.data);
      
    }).catch(error=>{
      console.log(error.message);
    })
  }

// peticion al servidor el cual envia los datos para crear el nuevo usuario
  const peticionPost= ()=>{
    const newUser = {
      id: users.length+1,
      name: formValue.name,
      email: formValue.email,
      addressCity: formValue.addressCity,
      companyName: formValue.companyName
    }
    axios.post('http://localhost:3001/create', newUser);
    peticionGet();
  }

// peticion al servidor el cual envia los datos para modificar el  usuario  
  const peticionPut=()=>{
    const newUser = {
      id: formValue.id,
      name: formValue.name,
      email: formValue.email,
      addressCity: formValue.addressCity,
      companyName: formValue.companyName
    }
    console.log(newUser);
    axios.put('http://localhost:3001/put', newUser).then(response=>{
      peticionGet();
    })
  }

// peticion al servidor para eliminar el usurio
  const peticionDelete=()=>{
    const id = formValue.id
    console.log(id);
    axios.delete('http://localhost:3001/delete/', id).then(response=>{
      handleCloseModalDelete()
      peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }


////////////////////////  funciones /////////////////////////////////

// funcion utilizada para guardar la informacion del formulario para insertar nuevo usuario
  const selectUser =(user)=>{
    setFormValue({
      id: user.id,
      name: user.name,
      email: user.email,
      addressCity: user.address.city,
      companyName: user.company.name
    })
    console.log(formValue);
  }

// funcion para capturar la informacion del formulario
  const handleChange = async e=>{
      const { name, value } = e.target;
      await setFormValue((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
    });
  }
  
 ////////////////// frontend //////////////////////////
  return (
    <div className="App">
   
      <br /><br /><br />
      <button className="btn btn-success" onClick={()=>{setFormValue({formValue: null, tipoModal: 'insertar'}); handleShowModalInsert()}}>Agregar Usuario</button>
      <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th>Nombre de la compañia</th>
            <th>Avatar</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {!users ? 'Cargando...':
           users.map((user, index) =>{
            return(
              <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address.city}</td>
            <td>{user.company.name}</td>
            <td><Gravatar email= {user.name + "@example.com" } /></td>
            <td>
                  <button className="btn btn-primary" onClick={()=>{handleShowModalInsert(); selectUser(user)}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{handleShowModalDelete(); selectUser(user)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
            </tr>
            )
          })}
        </tbody>
      </table>

      <Modal show={showModalInsert} onHide={handleCloseModalInsert}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input className="form-control" type="text" name="id" id="id"   onChange={handleChange} value={formValue.id?formValue.id: users.length+1} />
            <br />
            <label htmlFor="nombre">Nombre</label>
            <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={formValue?formValue.name: ''}/>
            <br />
            <label htmlFor="email">Email</label>
            <input className="form-control" type="text" name="email" id="email" onChange={handleChange} value={formValue?formValue.email: ''} />
            <br />
            <label htmlFor="ciudad">Ciudad</label>
            <input className="form-control" type="text" name="addressCity" id="addressCity" onChange={handleChange} value={formValue?formValue.addressCity: ''} />
            <br />
            <label htmlFor="nombre de compañia">Nombre de compañia</label>
            <input className="form-control" type="text" name="companyName" id="companyName" onChange={handleChange} value={formValue?formValue.companyName: ''}/>
            <br />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={()=>{peticionPost(); handleCloseModalInsert()}}>Insertar</button>
          <button className="btn btn-primary" onClick={()=>{peticionPut(); handleCloseModalInsert()}}> Actualizar</button>
          <button className="btn btn-danger" onClick={handleCloseModalInsert}>Cancelar</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
        <Modal.Body>
        Estás seguro que deseas eliminar a la empresa
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={peticionDelete}>Si</button>
          <button className="btn btn-danger" onClick={handleCloseModalDelete}>No</button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default App;
