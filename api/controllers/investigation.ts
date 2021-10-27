import { Request, Response } from "express";
import path from "path";
import fs from "fs";
const pool = require("../mysql/database");

export const postInvestigation = async (req: Request, res: Response) => {
  let {
    id_investigador,
    url_archivo,
    titulo,
    descripcion,
    fecha_inicio,
    id_asesor,
  } = req.body;
  // console.log("documento:", req.body.document);
  // console.log(req.file?.mimetype);
  // console.log(req.file?.originalname);
  // console.log(req.file?.filename);
  try {
    url_archivo = req.body.document;
    console.log("url_archivo:", url_archivo);
    await fs.readFileSync(
      path.join(__dirname, "../documents/" + req.file?.filename)
    );
    console.log(__dirname, "../documents/" + req.file?.filename);

    const newInvestigation = {
      id_investigador,
      url_archivo,
      titulo,
      descripcion,
      fecha_inicio,
    };
    const investigacion = await pool.query("INSERT INTO investigacion set ?", [
      newInvestigation,
    ]);
    console.log("jamz", investigacion.insertId);
    const newDetalleInvestigation = {
      id_investigacion: investigacion.insertId,
      id_asesor,
      estado: "Por revisar",
      avance: "0",
    };
    const detalleInvestigation = await pool.query(
      "INSERT INTO detalle_investigacion set ?",
      [newDetalleInvestigation]
    );

    res.json({ investigacion, detalleInvestigation });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Error al crear investigacion" });
  }
};
