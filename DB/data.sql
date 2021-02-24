show databases;
use ingresocovid;
show tables;
describe ingresos;
describe registrounico;
describe ocupacionsede;

alter table registrounico add area varchar(45);
alter table registrounico add cargo varchar(45);

truncate table ocupacionsede;

insert into ingresos values (default, '36.4', 1, '1024594365', curdate(), curTime(), null, null);
select curTime();
select * from ingresos;
select idingresos from ingresos where fechaIngreso = CURDATE() and registroUnico_CedulaUsuario = 1024594365;
truncate table ingresos;
update ingresos set horaSalida = curTime(), fechaSalida = curdate() where idingresos = 1;