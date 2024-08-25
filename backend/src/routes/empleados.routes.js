import { Router } from "express";
import { createNewEmpleado, getEmpleados } from "../controllers/empleados.controller";

const router = Router();

router.get('/empleados', getEmpleados);

router.post('/empleados', createNewEmpleado);


export default router;