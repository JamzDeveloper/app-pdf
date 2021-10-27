import { Request, Response } from "express";
const pool = require("../mysql/database");

export const getLogin = async (req: Request, res: Response) => {
  const { dni, clave } = req.query;
  const usuario = await pool.query(`SELECT *FROM usuario where dni=${dni} AND clave="${clave}"`);
  const { id_persona } = usuario[0];
  const persona = await pool.query(
    `SELECT *FROM persona where id_persona="${id_persona}"`
  );
  res.json(persona);
};


