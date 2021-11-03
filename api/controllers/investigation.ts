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
    if (!req.file) {
      return res.status(400).json({
        msg: "Solo se aceptan archivos pdf",
      });
    }
    url_archivo = req.body.document;
    //console.log("url_archivo:", url_archivo);
    await fs.readFileSync(
      path.join(__dirname, "../documents/" + req.file?.filename)
    );
    // console.log(__dirname, "../documents/" + req.file?.filename);

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

export const getInvestigations = async (req: Request, res: Response) => {
  const { id_investigador, id_asesor, id_admin } = req.query;
  try {
    if (id_investigador) {
      const investigacion = await pool.query(
        `select inv.id_investigacion,inv.url_archivo,inv.titulo,inv.descripcion,inv.fecha_inicio,dtinv.estado,dtinv.avance,ase.id_asesor,per.nombre,per.apellido,per.foto,ase.profesion,
        per.correo from investigacion inv 
        inner join detalle_investigacion as dtinv on 
            inv.id_investigacion=dtinv.id_investigacion
            inner join asesor as ase on dtinv.id_asesor= ase.id_asesor
            inner join persona as per on ase.id_persona=per.id_persona
             where id_investigador = ${id_investigador} `
      );
      res.json({ investigacion });
    }
    if (id_asesor) {
      const investigacion = await pool.query(
        `select  inv.id_investigacion,inv.url_archivo,inv.titulo,inv.descripcion,inv.fecha_inicio,dtinv.estado,dtinv.avance,itg.id_investigador,
        per.nombre,per.apellido,per.foto,itg.carrera,itg.facultad,
            per.correo from investigacion inv 
        inner join detalle_investigacion as dtinv on 
            inv.id_investigacion = dtinv.id_investigacion
            inner join investigador as itg on itg.id_investigador=  inv.id_investigador
            inner join persona as per on itg.id_persona=per.id_persona
            where id_asesor = ${id_asesor}`
      );
      res.json({ investigacion });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Error al listar investigaciones" });
  }
};
