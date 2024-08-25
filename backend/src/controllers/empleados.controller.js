import { ListarEmpleadosRepo } from '../repo/repo';
import { getConnection } from "../database/connection";
import sql from 'mssql';

export const getEmpleados = async (req, res) => {
    try {
        const empleados = await ListarEmpleadosRepo();
        res.status(200).json(
            {empleados});
    } catch (error) {
        res.status(500).json({msg: 'Internal Server Error'});
    }
}

export const createNewEmpleado = async (req, res) => {
    try {
        const {nombre, salario} = req.body;
        if(nombre == null || salario == null){
            return res.status(400).json({msg: 'Bad Request. Please fill all fields'});
        }

        console.log(nombre, salario);
        
    
        const pool = await getConnection();
        const result = await pool.request()
        .input('inNombre', sql.VarChar, nombre)
        .input('inSalario', sql.Money, salario)
        .output('OutResultCode', sql.Int,0)
        .execute('dbo.InsertarEmpleado');
        
        console.log(result.output.OutResultCode);
        if(result.output.OutResultCode == 0){
            res.status(200).json({msg: 'Empleado creado correctamente'});
        } else {
            res.status(400).json({msg: 'Error al crear el empleado'});
        }
    } catch (error) {
        console.log(error);
        console.error('Error al llamar al stored procedure');
        res.status(500).json({msg: 'Internal Server Error'});
    }
};
