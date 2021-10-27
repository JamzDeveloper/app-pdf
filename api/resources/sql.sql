create database pct;
 use pct;
CREATE TABLE persona(
	id_persona INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(60) NOT NULL ,
    apellido VARCHAR(60) NOT NULL,
    dni CHAR(9) NOT NULL,
    telefono CHAR(9) NOT NULL,
    direccion VARCHAR(45),
    correo VARCHAR(45),
    foto VARCHAR(200),
    fecha_nacimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE investigador(
	id_investigador INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_persona INTEGER NOT NULL,
    carrera VARCHAR(60) NOT NULL,
    facultad VARCHAR(60) NOT NULL,
    CONSTRAINT fk_investigador_persona FOREIGN KEY(id_persona) REFERENCES persona(id_persona)
);

CREATE TABLE asesor(
	id_asesor INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_persona INTEGER NOT NULL,
    profesion VARCHAR(60) ,
    CONSTRAINT fk_asesor_persona FOREIGN KEY(id_persona) REFERENCES persona(id_persona)
);

CREATE TABLE archivo (
  id_archivo INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  archivo_binario blob NOT NULL,
  archivo_nombre VARCHAR(255) NOT NULL DEFAULT '',
  archivo_peso VARCHAR(15) NOT NULL DEFAULT '',
  archivo_tipo VARCHAR(25) NOT NULL DEFAULT ''
);

CREATE TABLE investigacion(
  id_investigacion INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  id_investigador INTEGER NOT NULL,
  id_archivo INTEGER NOT NULL,
  titulo VARCHAR(60) NOT NULL,
  descripcion VARCHAR(250) NOT NULL,
  fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_investigacion_investigador FOREIGN KEY(id_investigador) REFERENCES investigador(id_investigador),
  CONSTRAINT fk_investigacion_archivo FOREIGN KEY(id_archivo) REFERENCES archivo(id_archivo)

);

CREATE TABLE comentario(
	id_comentario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    id_investigacion INTEGER NOT NULL,
    id_persona INTEGER NOT NULL,
    comentario VARCHAR(250),
    CONSTRAINT fk_comentario_investigacion FOREIGN KEY(id_investigacion) REFERENCES investigacion(id_investigacion),
    CONSTRAINT fk_comentario_persona FOREIGN KEY(id_persona) REFERENCES persona(id_persona)
);

CREATE TABLE detalle_investigacion(
    id_investigacion INTEGER NOT NULL,
    id_asesor INTEGER NOT NULL,
    estado VARCHAR(45),
	avance INT,
    CONSTRAINT fk_detalle_asesor FOREIGN KEY(id_asesor) REFERENCES asesor(id_asesor),
    CONSTRAINT fk_detalle_investigacion FOREIGN KEY(id_investigacion) REFERENCES investigacion(id_investigacion)
);


CREATE TABLE tipo_cuenta(
    id_tipocuenta INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    nombre VARCHAR(65) NOT NULL
);

CREATE TABLE usuario(
    id_cuenta  INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    id_persona INTEGER NOT NULL,
    id_tipocuenta INTEGER NOT NULL, 
    dni VARCHAR(60) NOT NULL,
    clave VARCHAR(60) NOT NULL,
    CONSTRAINT fk_usuario_tipo FOREIGN KEY(id_tipocuenta) REFERENCES tipo_cuenta(id_tipocuenta),
    CONSTRAINT fk_usuario_persona FOREIGN KEY(id_persona) REFERENCES persona(id_persona)
);
create view data_investigadores as 
select *
 from investigador as inv inner join persona as  pers
on inv.id_persona=pers.id_persona;

#inv.id_investigador,inv.id_persona,inv.carrera,inv.facultad,pers.nombre,pers.apellido,pers.dni,pers.telefono,pers.direccion,pers.correo,pers.foto,pers.fecha_nacimiento
create view data_asesor as 
select * from asesor inner join persona 
on asesor.id_persona=persona.id_persona;


select * from usuario  as us
inner join tipo_cuenta  as tc
on us.id_tipocuenta = tc.id_tipocuenta
inner join persona as p
on us.id_persona = p.id_persona where tc.nombre= "ADMIN";

select * from persona;
insert persona values(null,"larry","zelada",'76847593',"917204652","alto peru","josemontenegro@gmail.com","ndaunedaede",2000-05-04);
insert persona values(null,"abel","mestanza",'76847593',"917204652","alto peru","josemontenegro@gmail.com","ndaunedaede",2000-05-04);
insert persona values(null,"pedro","gabrieñ",'76847593',"917204652","alto peru","josemontenegro@gmail.com","ndaunedaede",2000-05-04);
insert persona values(null,"jose","mmontenegro",'76847593',"917204652","alto peru","josemontenegro@gmail.com","ndaunedaede",2000-05-04);
insert persona values(null,"frapo","espino",'76847593',"917204652","alto peru","josemontenegro@gmail.com","ndaunedaede",2000-05-04);
insert persona values(null,"jian","mestanza",'76847593',"917204652","alto peru","josemontenegro@gmail.com","ndaunedaede",2000-05-04);
select * from investigador;
insert asesor values (null, 2,"informatica");

insert asesor values (null, 3,"diseño y animacion en 3d");

select * from asesor;
insert investigador values(null,1,"informatica","ciencias fisicas y matematicas");
insert investigador values(null,4,"informatica","ciencias fisicas y matematicas");


insert tipo_cuenta values (null,"ASESOR");
insert tipo_cuenta values(null,"INVESTIGADOR");
insert tipo_cuenta values (null,"ADMIN");

select* from tipo_cuenta;

insert usuario  values(null,5,3,"76847593","dnaendiaedea");
insert usuario  values(null,4,3,"76847593","dnaendiaedea");

select * from usuario;


SELECT 	* from investigacion;

select * from investigador;
select * from asesor;