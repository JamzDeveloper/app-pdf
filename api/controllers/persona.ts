import { Request, Response } from "express";
const pool = require("../mysql/database");

export const getPersons = async (req: Request, res: Response) => {
  const usuario = await pool.query(`SELECT *FROM persona`);
  res.json(usuario);
};
