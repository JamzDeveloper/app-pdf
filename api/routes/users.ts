import { Router } from "express";
import { check } from "express-validator";
import { getUsers, postUser } from "../controllers/users";
import { existsPerson, existsRole } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.get("/", getUsers);
//router.get("/:id");/*
router.post(
  "/",
  [
    check("tipo_cuenta").custom(existsRole),
    check("nombre", "se requiere un nombre").not().isEmpty(),
    check("apellido", "se requiere un apellido").not().isEmpty(),
    check("dni", "se requiere un dni").isLength({ min: 8 }),
    check("dni").custom(existsPerson),
    check("telefono", "se requiere numero de telefono").isLength({ min: 9 }),
    check("correo", "se requiere un email").isEmail(),
    check("clave", "se requiere una contraseña").isLength({ min: 6 }),
    validateFields,
  ],
  postUser
);
/*router.delete("/");
router.put("/");
*/
export default router;
