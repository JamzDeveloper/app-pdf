import { Request, Response } from "express";
const pool = require("../mysql/database");
export const postComments = async (req: Request, res: Response) => {
  console.log(req);
  const { id_investigacion, id_persona, comentario, fecha } = req.body;
  if (!comentario) {
    return res.status(400).json({
      msg: "El comentario es necesario",
    });
  }
  const newComment = {
    id_investigacion,
    id_persona,
    comentario,
    fecha,
  };
  try {
    const comment = await pool.query("INSERT INTO comentario SET ?", [
      newComment,
    ]);
    res.json({ msg: "Comentario guardado", comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
export const getComments = async (req: Request, res: Response) => {
  const { id_investigacion } = req.query;

  try {
    const comments =
      await pool.query(`SELECT c.id_comentario,c.id_investigacion,c.id_persona,c.comentario, c.fecha, p.nombre, p.apellido,p.dni,p.correo,p.foto  FROM comentario C
inner JOIN persona P on c.id_persona= p.id_persona
 where id_investigacion=${id_investigacion}  order BY(c.fecha) DESC`);
    if (comments.length > 0) {
      return res.json(comments);
    }
    res.json({ msg: "No hay comentarios" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
