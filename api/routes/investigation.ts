import { Router } from "express";
import { check } from "express-validator";
import { existsPerson, existsRole } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validate-fields";
import fileUpload from "../middlewares/file-multer"
import { postInvestigation } from "../controllers/investigation";

const router = Router();

router.post("/",fileUpload,postInvestigation);

export default router;
/* id_investigador,
    url_archivo,
    titulo,
    descripcion,
    fecha_inicio,
    id_asesor,*/