import { Router } from "express";
import { check } from "express-validator";
import { existsInvestigator, existsAsesor } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validate-fields";
import fileUpload from "../middlewares/file-multer";
import {
  postInvestigation,
  getInvestigations,
  putInvestigations,
  putDetalleInvestigacion,
} from "../controllers/investigation";

const router = Router();

router.post(
  "/",
  fileUpload,
  [
    check("id_investigador", "El id del investigador es obligatorio").custom(
      existsInvestigator
    ),
    check("titulo", "Se requiere un titulo").not().isEmpty(),
    check("id_asesor", "El id del asesor es obligatorio").custom(existsAsesor),
    validateFields,
  ],
  postInvestigation
);

router.get("/", getInvestigations);

router.put("/", fileUpload, putInvestigations);
router.put("/detalle", putDetalleInvestigacion);
export default router;
/* 
    url_archivo,
    titulo,
    descripcion,
    fecha_inicio,
  */
