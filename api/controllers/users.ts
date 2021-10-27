import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const pool = require("../mysql/database");
export const getUsers = async (req: Request, res: Response) => {
  try {
    const investigators = await pool.query(`select *
          from investigador as inv inner join persona as  pers
         on inv.id_persona=pers.id_persona;
         `);

    const advisors = await pool.query(`select * from asesor inner join persona 
    on asesor.id_persona=persona.id_persona;
    `);

    const admin = await pool.query(` select * from usuario  as us
    inner join tipo_cuenta  as tc
    on us.id_tipocuenta = tc.id_tipocuenta
    inner join persona as p
    on us.id_persona = p.id_persona where tc.nombre= "ADMIN";`);

    res.json({
      investigadores: investigators,
      asesores: advisors,
      administradores: admin,
    });
  } catch (e) {
    res.status(500).json({
      msg: "error en la peticion",
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido,
    dni,
    telefono,
    direccion,
    correo,
    foto,
    fecha_nacimiento,
    clave,
    tipo_cuenta,
    profesion,
    carrera,
    facultad,
  } = req.body;

  try {
    // cifrado de contraseña
    const salt = bcrypt.genSaltSync(10);
    // console.log(salt);
    const hash = bcrypt.hashSync(clave, salt);
    const newUser = {
      nombre,
      apellido,
      dni,
      telefono,
      direccion,
      correo,
      foto,
      fecha_nacimiento,
    };

    if (tipo_cuenta.toUpperCase() === "ASESOR") {
      if (!profesion) {
        return res.status(409).json({ msg: "profesión no especificada" });
      }
      const dataUser = await pool.query("INSERT INTO persona set ?", [newUser]);
      const tipoCuentaAsesor = await pool.query(
        `select * from tipo_cuenta where nombre="ASESOR"`
      );
      console.log(tipoCuentaAsesor);

      // console.log("tipo de cuenta:", tipoCuentaPasajero[0].id_tipo_cuenta);
      // console.log("hash:", hash);

      const newCuentaAsesor = {
        id_persona: dataUser.insertId,
        id_tipocuenta: tipoCuentaAsesor[0].id_tipocuenta,
        dni,
        clave: hash,
      };

      const cuenta = await pool.query("INSERT INTO usuario set?", [
        newCuentaAsesor,
      ]);
      // console.log("Cuenta:", cuenta);
      const newAsesor = {
        id_persona: dataUser.insertId,
        profesion,
      };

      await pool.query("INSERT INTO asesor set ?", [newAsesor]);
      // console.log("Pasajero:", pasajero);

      res.json({ message: "Usuario creado", data: dataUser });
    }

    if (tipo_cuenta.toUpperCase() === "INVESTIGADOR") {
      if (!facultad || !carrera) {
        return res.status(400).json({
          msg: "se requiere datos del investigador",
        });
      }
      // console.log("llego a chofer", placa, soat, modelo, color);
      const dataUser = await pool.query("INSERT INTO persona set ?", [newUser]);

      const tipoCuentaInvestigador = await pool.query(
        `select * from tipo_cuenta where nombre="INVESTIGADOR"`
      );

      const newCuentaInvestigador = {
        id_persona: dataUser.insertId,
        id_tipocuenta: tipoCuentaInvestigador[0].id_tipocuenta,
        dni,
        clave: hash,
      };

      await pool.query("INSERT INTO usuario set?", [newCuentaInvestigador]);

      // console.log("Cuenta:", cuenta);

      const newInvestigador = {
        id_persona: dataUser.insertId,
        facultad,
        carrera,
      };

      await pool.query("INSERT INTO investigador set ?", [newInvestigador]);
      // console.log("Chofer:", chofer);
      res.json({ message: "Usuario creado", data: dataUser });
    }
    if (tipo_cuenta.toUpperCase() === "ADMIN") {
      const dataUser = await pool.query("INSERT INTO persona set ?", [newUser]);
      const tipoCuentaAdmin = await pool.query(
        `select * from tipo_cuenta where nombre="ADMIN"`
      );
      const newCuentaAdmin = {
        id_persona: dataUser.insertId,
        id_tipocuenta: tipoCuentaAdmin[0].id_tipocuenta,
        dni,
        clave: hash,
      };

      await pool.query("INSERT INTO usuario set?", [newCuentaAdmin]);

      res.json({ message: "Usuario creado", data: dataUser });
    }
  } catch (err) {
    res.status(400).json({
      msg: "problemas en el resgistro de usuario",
    });
    console.log(err);
  }
};
export const getInvestigators = async (req: Request, res: Response) => {
  try {
    const investigators = await pool.query(`select *
          from investigador as inv inner join persona as  pers
         on inv.id_persona=pers.id_persona;
         `);

    res.json({
      investigadores: investigators,
    });
  } catch (e) {
    res.status(500).json({
      msg: "error en la peticion",
    });
  }
};
export const getAdvisors = async (req: Request, res: Response) => {
  try {
    const advisors = await pool.query(`select * from asesor inner join persona 
    on asesor.id_persona=persona.id_persona;
    `);

    res.json({
      asesores: advisors,
    });
  } catch (e) {
    res.status(500).json({
      msg: "error en la peticion",
    });
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await pool.query(` select * from usuario  as us
    inner join tipo_cuenta  as tc
    on us.id_tipocuenta = tc.id_tipocuenta
    inner join persona as p
    on us.id_persona = p.id_persona where tc.nombre= "ADMIN";`);
    res.json({
      administradores: admin,
    });
  } catch (e) {
    res.status(500).json({
      msg: "error en la peticion",
    });
  }
};
