use pct;

create view data_investigadores as 
select *
 from investigador as inv inner join persona as  pers
on inv.id_persona=pers.id_persona;

inv.id_investigador,inv.id_persona,inv.carrera,inv.facultad,pers.nombre,pers.apellido,pers.dni,pers.telefono,pers.direccion,pers.correo,pers.foto,pers.fecha_nacimiento
create view data_asesor as 
select * from asesor inner join persona 
on asesor.id_persona=persona.id_persona;

select * from persona;
insert persona values(null,"larry","zelada",'76847593',"917204652","alto peru","josemontenegro@gmail.com","ndaunedaede",2000-05-04);

select * from investigador;
insert investigador values(null,4,"informatica","ciencias fisicas y matematicas");

insert asesor(null, )