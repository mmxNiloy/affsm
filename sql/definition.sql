DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Forms;
DROP TABLE IF EXISTS Departments;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Provosts;
DROP TABLE IF EXISTS ExamController;
DROP TABLE IF EXISTS AdmitCards;

create table Departments(
	department_id varchar(32) primary key,
    email varchar(256) unique,
    password varchar(64),
    department_title varchar(256)
);

create table Provosts(
	provost_id integer primary key,
    email varchar(256) unique,
    password varchar(64),
    hall_name varchar(256)
);

create table Students (
	student_id integer primary key check(student_id > 10000000 and student_id < 99999999),
    last_name varchar(128),
    first_name varchar(128),
    email varchar(256) unique,
    session integer,
    semester integer,
    password varchar(32),
    phone varchar(16),
    department_id varchar(32) not null,
    
    key department_id_idx (department_id)
);

create table Approvals(
	form_id integer primary key,
	department_approval boolean,
    accounts_approval boolean,
    bank_approval boolean,
    exam_controller_approval boolean
);

create table Forms(
	form_id integer auto_increment primary key,
	student_id integer,
    department_id varchar(32),
    semester integer not null,
    provost_id integer not null,
    
    key student_id_idx (student_id),
    key department_id_idx (department_id)
);

create table Accounts(
	employee_id integer primary key,
    email varchar(256) unique,
    password varchar(64)
);

create table ExamControllers(
	employee_id integer primary key,
    email varchar(256) unique,
    password varchar(64)
);