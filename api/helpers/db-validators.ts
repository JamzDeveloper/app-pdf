const pool = require("../mysql/database");

export const existsPerson = async (dni: string) => {
  const dataPerson = await pool.query("SELECT * FROM persona WHERE dni = ?", [
    dni,
  ]);
  if (dataPerson?.length > 0) {
    throw new Error("La persona ya existe");
  }
};

export const existsRole = async (tipo_usuario: string) => {
  tipo_usuario = tipo_usuario.toUpperCase();
  const dataRoles = await pool.query(
    "SELECT * FROM tipo_cuenta WHERE nombre = ?",
    [tipo_usuario]
  );
  if (dataRoles?.length === 0) {
    throw new Error("El Rol no existe");
  }
};
