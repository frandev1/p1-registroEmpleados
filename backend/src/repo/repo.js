import { getConnection } from "../database/connection";
import sql from 'mssql';

export const ListarEmpleadosRepo = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .output('OutResultCode', sql.Int)
        .execute('dbo.ListarEmpleados');
        console.log(result.recordset);
        return result.recordset;
    } catch (error) {
       console.log(error);
       console.error('Error al llamar al stored procedure');
       return false;
    }
};
