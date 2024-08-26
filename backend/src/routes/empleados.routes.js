import { Router } from "express";
import { createNewEmpleado, getEmpleados } from "../controllers/empleados.controller";

const router = Router();

router.get('/ListarEmpleados', getEmpleados);

router.post('/InsertarEmpleado', createNewEmpleado);


export default router;