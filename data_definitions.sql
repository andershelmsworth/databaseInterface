-- Project Group 31 Step 4 Draft - Kimberly Kramschuster and Andrew Helmsworth 
-- a) Data Definition Queries:
-- Reset database
DROP TABLE IF EXISTS `Job_cost`;
DROP TABLE IF EXISTS `Phase_crew`;
DROP TABLE IF EXISTS `Equip_crew`;
DROP TABLE IF EXISTS `Phases`;
DROP TABLE IF EXISTS `Crews`;
DROP TABLE IF EXISTS `Equipment`;
DROP TABLE IF EXISTS `Jobs`;
DROP TABLE IF EXISTS `Companies`;

-- 1. Creates Companies Table

CREATE TABLE `Companies`(

`company_id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

`company_name` VARCHAR(100) NOT NULL,

`budget` DECIMAL(20, 10),

`total_expenses` DECIMAL(20, 10),

`total_revenue` DECIMAL(20, 10),

`hq_location` VARCHAR(200)

);


-- 2. Creates Jobs Table

CREATE TABLE `Jobs`(

`job_id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

`job_name` VARCHAR(200),

`company_id` INTEGER,

`location` VARCHAR(100),

FOREIGN KEY(`company_id`) REFERENCES `Companies`(`company_id`) ON DELETE CASCADE
);


-- 3. Creates Phases Table

CREATE TABLE `Phases`(

`phase_id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

`phase_name` VARCHAR(100),

`job_id` INTEGER, 

FOREIGN KEY(`job_id`) REFERENCES `Jobs`(`job_id`) ON DELETE CASCADE

);


-- 4. Creates Crews Table

CREATE TABLE `Crews`(

`crew_id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

`crew_name` VARCHAR(100)

);


-- 5. Creates Equipment Table

CREATE TABLE `Equipment`(

`equip_id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

`equip_name` VARCHAR(100),

`equip_type` VARCHAR(100),

`equip_weight` INTEGER,

`equip_fuel_type` VARCHAR(100),

`equip_purchase_date` DATETIME

);

-- 6. Creates Phase_crew Table

CREATE TABLE `Phase_crew`(

`relation_id`  INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

`phase_id` INTEGER,

`crew_id` INTEGER,

FOREIGN KEY(`phase_id`) REFERENCES Phases(`phase_id`) ON DELETE CASCADE,

FOREIGN KEY(`crew_id`) REFERENCES Crews(`crew_id`) ON DELETE CASCADE

);


-- 7. Creates Equip_crew Table

CREATE TABLE `Equip_crew`(

`relation_id`  INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

`equip_id` INTEGER,

`crew_id` INTEGER,

FOREIGN KEY(`equip_id`) REFERENCES Equipment(`equip_id`) ON DELETE CASCADE,

FOREIGN KEY(`crew_id`) REFERENCES Crews(`crew_id`) ON DELETE CASCADE

);


-- 8. Creates Job_cost Table

CREATE TABLE `Job_cost`(
`job_cost_id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
`date_time` DATETIME NOT NULL,
`equip_id` INTEGER NULL,

`job_id` INTEGER NULL,

`crew_id` INTEGER NULL,

`phase_id` INTEGER NULL,

`cost_type` VARCHAR(2) NOT NULL,

`hours` INTEGER NOT NULL,

`rate` DECIMAL(20, 10) NOT NULL,

FOREIGN KEY(`equip_id`) REFERENCES Equipment(`equip_id`) ON DELETE CASCADE,

FOREIGN KEY(`job_id`) REFERENCES Jobs(`job_id`) ON DELETE CASCADE,

FOREIGN KEY(`crew_id`) REFERENCES Crews(`crew_id`) ON DELETE CASCADE,

FOREIGN KEY(`phase_id`) REFERENCES Phases(`phase_id`) ON DELETE CASCADE

);

-- b) Sample Data:
-- INSERT STATEMENTS

-- 1. Inserts into Companies Table
INSERT INTO `Companies` (`company_name`, `budget`,`total_expenses`,`total_revenue`,`hq_location`) 
VALUES ('Bob''s Construction, Inc.',5345347.78,3113812.39,2231535.39,'Windsor'),
('Bob''s Framing, Inc.',4248986.55,2373573.90,1875412.65,'Windsor'),
('BC Northwest',4456328.79,2373967.58,2082361.21,'Seattle'),
('Bob''s Construction NE',1130198.33,489890.44,640307.89,'Boston'),
('Center City Foundation, LLC',7549032.94,294689.78,460213.22,'Seattle');


-- 2. Inserts into Jobs Table
INSERT INTO `Jobs` (`job_name`, `company_id`, `location`)
VALUES ('P.S. 304',1,'Windsor County'),
('Cheshire Granny Unit',1,'Windsor County'),
('Providence Hospital',1,'Windsor County'),
('Addison Avenue Bank',2,'Windsor County'),
('First Street Coffee',2,'Windsor County'),
('Jan''s Bakery',2,'Windsor County'),
('Pike Place Addition',3,'King County'),
('West Ballard Park',3,'King County'),
('Safeco Field Concession',3,'King County'),
('Jim''s Pub',3,'Suffolk County'),
('Enfield Tennis Academy',4,'Suffolk County'),
('Enfield Marine #5',4,'Suffolk County'),
('Bay Street Lodge',4,'Suffolk County'),
('11th Avenue Outlet',5,'King County'),
('54th St. Outlet',5,'King County');


-- 3. Inserts into Phases Table
INSERT INTO `Phases` (`phase_name`, `job_id`)
VALUES ('03 - Concrete',1),
('04 - Masonry',1),
('05 - Metals',2),
('06 - Woods, Plastics, and Composites',2),
('09 - Finishes',3),
('13 - Special Construction',3),
('22 - Plumbing',4),
('23 - HVAC',5),
('26 - Electrical',7),
('31 - Earthwork',6),
('33 - Utilities',8);

-- 4. Inserts into Crews Table
INSERT INTO `Crews` (`crew_name`) 
VALUES ('3-person trenching'),
('5-person general'),
('Electical & Utilities team'),
('7-person finishing'),
('Industrial Foundations team'),
('6-person framing');

-- 5. Inserts into Equipment Table
INSERT INTO `Equipment` (`equip_name`, `equip_type`, `equip_weight`, `equip_fuel_type`, `equip_purchase_date`)
VALUES ('Grader','Rental',22000,'Diesel','2020-05-20 12:30:00'),
('Cement Mixer','Owned',25000,'Diesel','2010-03-11 13:34:01'),
('Earthmover','Rental',27850,'Diesel','2012-03-17 10:05:02'),
('Backhoe','Rental',32350,'Diesel','2008-11-22 9:30:00'),
('Jackhammer','Owned',55,NULL,'2018-10-02 14:11:01'),
('Nail Gun','Owned',35,NULL,'2019-01-12 15:30:00'),
('Utility Truck','Rental',12500,'Unleaded','2019-02-08 13:00:00');

-- 6. Inserts into Phase_crew Table
INSERT INTO `Phase_crew` (`phase_id`, `crew_id`)
VALUES (2,6),
(1,1),
(5,1),
(9,2),
(4,1),
(2,6),
(11,5),
(9,2),
(2,4),
(2,4),
(1,2),
(8,3),
(9,4);

-- 7. Inserts into Equip_crew Table
INSERT INTO `Equip_crew` (`equip_id`, `crew_id`)
VALUES (3,5),
(1,6),
(1,4),
(4,2),
(6,1),
(6,6),
(4,6),
(3,4),
(5,1),
(2,3),
(2,3),
(1,2),
(4,5);

-- 8. Inserts into Job_cost Table
INSERT INTO `Job_cost` (`date_time`, `equip_id`, `job_id`, `crew_id`, `phase_id`, `cost_type`, `hours`, `rate`)
VALUES ('2016-04-17 08:36:37',5,11,6,6,'LS',22,50),
('2012-09-28 22:51:56',2,12,4,10,'C+',26,40),
('2013-06-07 21:03:01',3,9,2,2,'LS',33,184),
('2012-07-21 08:04:24',3,2,2,8,'LS',27,159),
('2018-04-15 15:12:23',4,2,5,9,'C+',11,123),
('2018-07-26 07:33:03',6,15,6,10,'LS',31,126),
('2016-01-03 23:12:51',3,4,5,2,'C+',7,130),
('2018-12-17 20:39:47',1,15,2,1,'LS',33,156),
('2020-08-13 18:29:42',2,11,5,9,'LS',19,16),
('2016-06-09 05:20:54',7,15,4,2,'C+',28,43),
('2013-04-03 02:08:09',1,6,4,3,'C+',38,129),
('2020-03-09 16:25:07',6,9,3,2,'LS',30,58),
('2014-05-04 04:33:26',3,7,3,10,'LS',22,78),
('2018-07-24 22:30:22',7,6,3,11,'LS',22,158),
('2012-01-14 05:24:25',1,13,4,8,'C+',18,34),
('2018-08-05 18:20:20',2,10,6,8,'LS',32,120),
('2016-12-05 14:07:45',1,13,4,9,'C+',29,114),
('2015-09-02 17:12:39',6,4,5,9,'LS',9,65),
('2020-05-25 10:03:18',3,15,6,10,'C+',40,35),
('2020-12-20 03:05:39',4,8,4,2,'C+',37,161),
('2016-01-28 22:55:41',3,13,1,9,'LS',21,24),
('2013-09-10 09:51:08',6,11,4,10,'LS',1,141),
('2012-12-22 23:30:10',2,6,1,7,'LS',2,45),
('2019-09-22 04:58:05',5,6,5,1,'C+',5,21);
