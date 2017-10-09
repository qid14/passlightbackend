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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `bookid` bigint(20) NOT NULL AUTO_INCREMENT,
  `bookname` varchar(45) NOT NULL,
  `author` varchar(45) DEFAULT NULL,
  `version` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookid`)
) ENGINE=InnoDB AUTO_INCREMENT=100118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (100001,'Bible','','','',''),(100004,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100006,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100007,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100008,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100009,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100010,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100011,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100012,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100013,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100014,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100015,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100016,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100017,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100018,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100019,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100020,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100021,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100022,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100023,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100024,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100025,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100026,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100027,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100028,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100029,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100030,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100031,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100032,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100033,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100034,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100035,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100036,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100037,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100038,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100039,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100040,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100041,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100042,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100043,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100044,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100045,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100046,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100047,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100048,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100049,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100050,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100051,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100052,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100053,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100054,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100055,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100056,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100057,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100058,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100059,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100060,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100061,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100062,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100063,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100064,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100065,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100066,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100067,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100068,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100069,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100070,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100071,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100072,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100073,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100074,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100075,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100076,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100077,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100078,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100079,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100080,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100081,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100082,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100083,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100084,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100085,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100086,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100087,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100088,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100089,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100090,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100091,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100092,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100093,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100094,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100095,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100096,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100097,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100098,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100099,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100100,'Queen of the Dark Chamber','Chritina Tsai','1953','10.00','Plano'),(100102,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100103,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100104,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100105,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100106,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100107,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100108,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100109,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100110,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100111,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100112,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100113,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100114,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100115,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100116,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano'),(100117,'Queen of the Dark Chamber','Christiana Tsai','Kindle Edition','2.99','Plano');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
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
