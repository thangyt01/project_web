
-- Host: localhost    Database: business
-- ------------------------------------------------------

DROP TABLE IF EXISTS `biz_listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `biz_listings` (
  `id_info` int NOT NULL,
  `id_category` int NOT NULL,
  PRIMARY KEY (`id_info`,`id_category`),
  KEY `id_category` (`id_category`),
  CONSTRAINT `biz_listings_ibfk_1` FOREIGN KEY (`id_info`) REFERENCES `info` (`id`),
  CONSTRAINT `biz_listings_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_listings`
--

LOCK TABLES `biz_listings` WRITE;
/*!40000 ALTER TABLE `biz_listings` DISABLE KEYS */;
INSERT INTO `biz_listings` VALUES (1,1),(3,1),(2,9),(4,9),(5,9);
/*!40000 ALTER TABLE `biz_listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Automotive Parts and Suppliers'),(2,'Seafood Stores and Restaurants'),(3,'Health and Beauty'),(4,'Schools and Colleges'),(9,'technical');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info`
--

DROP TABLE IF EXISTS `info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_biz` varchar(50) DEFAULT NULL,
  `adress_biz` varchar(50) DEFAULT NULL,
  `city_biz` varchar(50) DEFAULT NULL,
  `telephone_biz` varchar(50) DEFAULT NULL,
  `url_biz` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info`
--

LOCK TABLES `info` WRITE;
/*!40000 ALTER TABLE `info` DISABLE KEYS */;
INSERT INTO `info` VALUES (1,'HUST Corp','1 Dai co viet','Ha Noi','0987361812','hust.edu.vn'),(2,'VC Corp','85 Vu Trong Phung','Ha Noi','0912354123','vccorp.com'),(3,'PiGroup','Ngo goc de','Hanoi','0987361811','pigroup.tk'),(4,'VNG','Quan 1','TPHCM','0123456789','vng.com'),(5,'Viettel','Hoa lac','Hanoi','0999123553','viettel.com');
/*!40000 ALTER TABLE `info` ENABLE KEYS */;
UNLOCK TABLES;
