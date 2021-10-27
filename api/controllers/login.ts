import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
const pool = require("../mysql/database");

export const login = async (req: Request, res: Response) => {
  const { dni, clave } = req.body;
  if (!dni || !clave) {
    return res.status(409).json({ msg: "faltan datos" });
  }

  const usuario = await pool.query(`SELECT *FROM usuario where dni=${dni}`);
  console.log(usuario);
  const validPassword = bcryptjs.compareSync(clave, usuario[0].clave);
  if (!validPassword) {
    return res.status(400).json({
      msg: "Usuario /password no son correctos - password",
    });
  }

  const { id_persona } = usuario[0];
  const persona = await pool.query(
    `SELECT *FROM persona where id_persona="${id_persona}"`
  );
  res.json(persona);
};
