import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alerta } from './ShowAlert'

function App() {
  const api = 'http://localhost:5000/api'
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState('');
  const [salario, setSalario] = useState('');
  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState(1);
  const nameVal = /^[a-zA-Z\s]+$/;
  const salaryVal = /^\d+(\.\d{1,2})?$/;

  useEffect( () => {
    getEmpleados();
  }, [])

  const getEmpleados = async () => {
    await axios.get(`${api}/ListarEmpleados`)
    .then((response) => {
      console.log(response.data);
      setEmpleados(response.data);
    })
  }

  const openModal = (op) => {
    setOperation(op)
    if(op === 1){
      setTitle('Registrar Empleado');
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }

  const validar = () => {
    var parametros;
    var url;
    if(nombre.trim() === ''){
      show_alerta('Escribe el nombre del empleado', 'warning');
    }
    else if(salario === ''){
      show_alerta('Escribe el precio del empleado', 'warning');
    }
    else{
      if(operation === 1){
        if (!nameVal.test(nombre)) {
            show_alerta('El nombre debe ser solo letras','warning');
            return;
        }
        if (!salaryVal.test(salario)) {
            show_alerta('El salario debe ser solo numeros','warning');
            return;
        }
        parametros = {Nombre: nombre.trim(), Salario: salario.trim()};
        url = `${api}/InsertarEmpleado`
        InsertarEmpleado(parametros, url);
      }
    }
  }

  const InsertarEmpleado = async (parametros, url) => {
    await axios.post(
      url,
      {
        Nombre: parametros.Nombre,
        Salario: parametros.Salario
      },
      {
          headers: {
              'Content-Type': 'application/json'
          }
      }
    ).then(function(respuesta){
      console.log(respuesta.statusText);
      var tipo;
      var msj = respuesta.data.msg;
      if(respuesta.statusText === 'OK'){
          tipo = 'success';
          show_alerta(msj, tipo);
          getEmpleados();
          document.getElementById('btnCerrar').click();
      } 
    }).catch(function(error){
      var msj = error.response.data.msg;
      if(error.response.status === 400){
          show_alerta(msj,'warning');
      }
      else if(error.response.status === 401){
          show_alerta(msj,'warning');
      }
      else{
          show_alerta(msj,'error');
          console.log(error);
      }
    })
  }

  return (
    <>
      <div className='App'>
        <center>
          <h1>Lista de Empleados</h1>
        </center>
        <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
              <div className='d-grid mx-auto'>
                <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEmpleados'>
                  <i className='fa-solid fa-circle-plus'></i> Añadir
                </button>
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
              <div className='table-responsive'>
                <table className='table table-bordered'>
                  <thead>
                    <tr><th>ID</th><th>Nombre</th><th>Salario</th></tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {empleados.map( (empleado,id) => (
                      <tr key={empleado.id}>
                        <td>{empleado.id}</td>
                        <td>{empleado.Nombre}</td>
                        <td>₡{new Intl.NumberFormat('es-cr').format(empleado.Salario)}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div id='modalEmpleados' className='modal fade' aria-hidden='true'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <label className='h5'>{title}</label>
                <button type='button' className='btn-close' id='btnCerrar' data-bs-dismiss='modal' aria-label='Close'></button>
              </div>
              <div className='modal-body'>
                <input type='hidden' id='id'></input>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                  <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
                  onChange={(e) => setNombre(e.target.value)}></input>
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-money-bills'></i></span>
                  <input type='text' id='salario' className='form-control' placeholder='Salario' value={salario}
                  onChange={(e) => setSalario(e.target.value)}></input>
                </div>
                <div className='d-grid col-6 mx-auto'>
                  <button onClick={() => validar()} className='btn btn-success'>
                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                  </button>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
