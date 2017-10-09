-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: passinglight
-- ------------------------------------------------------
-- Server version	5.6.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `readers`
--

DROP TABLE IF EXISTS `readers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `readers` (
  `readerid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `firstname` varchar(64) DEFAULT NULL,
  `lastname` varchar(64) DEFAULT NULL,
  `middlename` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `role` varchar(16) DEFAULT NULL,
  `finishquestion` varchar(8) DEFAULT NULL,
  `church` varchar(64) DEFAULT NULL,
  `groups` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phonenumber` varchar(64) DEFAULT NULL,
  `memo` varchar(64) DEFAULT NULL,
  `gender` varchar(64) DEFAULT NULL,
  `birth` varchar(64) DEFAULT NULL,
  `createdAt` varchar(64) DEFAULT NULL,
  `updatedAt` varchar(64) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`readerid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `readerid_UNIQUE` (`readerid`)
) ENGINE=InnoDB AUTO_INCREMENT=61035 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `readers`
--

LOCK TABLES `readers` WRITE;
/*!40000 ALTER TABLE `readers` DISABLE KEYS */;
INSERT INTO `readers` VALUES (61001,'pp','pp','pp','pp','pp','initiator','finished','pp','pp','midingpiaoling@gmail.com','123456','I am glad to pass this book','F','1988-8-8',NULL,'1497722113426',14),(61002,'p2p',NULL,NULL,NULL,'p2','initiator','finished',NULL,NULL,'midingpiaoling@gmail.com',NULL,'sdfdsf',NULL,NULL,NULL,'1503849588556',1),(61004,'admin','Cindy','Lee','','qqqqqq','admin',NULL,'cc','cc','midingpiaoling@gmail.com','99999999','','F','1988-8-8','1497150507679','1497559664005',6),(61005,'p22p3',NULL,NULL,NULL,'p22','initiator',NULL,NULL,NULL,'midingpiaoling@gmail.com',NULL,NULL,NULL,NULL,'1497150556958',NULL,0),(61006,'ee',NULL,NULL,NULL,'eeeeee',NULL,'finished',NULL,NULL,'midingpiaoling@gmail.com',NULL,NULL,NULL,NULL,'1497418490437',NULL,0),(61007,'ww',NULL,NULL,NULL,'wwwwww','initiator','finished',NULL,NULL,'midingpiaoling@gmail.com',NULL,NULL,NULL,NULL,'1497418785148',NULL,0),(61028,'nn',NULL,NULL,NULL,'nnnnnn',NULL,'finished',NULL,NULL,'midingpiaoling@gmail.com',NULL,NULL,NULL,NULL,'1497421719549',NULL,0),(61029,'mm1','Cindy','Linh','','mmmmmm',NULL,'finished','pcch','dd','midingpiaoling@gmail.com','123456789',NULL,NULL,NULL,'1497421755810','1504478937755',2),(61031,'tester1','tester1','tester1','','tester1',NULL,'finished','hh','hh','midingpiaoling@gmail.com','12345','',NULL,NULL,'1497721679061','1497721720459',1),(61032,'tester2','tester2','tester2','','tester2',NULL,'finished','',NULL,'midingpiaoling@gmail.com','','',NULL,NULL,'1497722663716','1497722706503',1),(61033,'aaaa',NULL,NULL,NULL,'111111',NULL,'finished',NULL,NULL,'midingpiaoling@gmail.com',NULL,NULL,NULL,NULL,'1503860278702',NULL,0),(61034,'dd',NULL,NULL,NULL,'dddddd',NULL,'finished',NULL,NULL,'midingpiaoling@gmail.com',NULL,NULL,NULL,NULL,'1503861810667',NULL,0);
/*!40000 ALTER TABLE `readers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-07  1:48:06
