-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.30 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table test.color
CREATE TABLE IF NOT EXISTS `color` (
  `name` char(50) NOT NULL,
  `rgba` char(50) NOT NULL,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table test.color: ~0 rows (approximately)
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` (`name`, `rgba`) VALUES
	('black', '#ccc'),
	('light', '#fafafa'),
	('red', '#b91400');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;

-- Dumping structure for table test.image
CREATE TABLE IF NOT EXISTS `image` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `path` char(50) NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1` (`product_id`),
  CONSTRAINT `FK1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table test.image: ~0 rows (approximately)
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` (`id`, `name`, `path`, `product_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, '01', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 1, '2022-05-27 10:26:24', '2022-05-27 10:26:24', NULL),
	(2, '02', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 1, '2022-05-27 10:27:05', '2022-05-27 10:27:05', NULL),
	(3, '03', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 1, '2022-05-27 10:27:27', '2022-05-27 10:27:27', NULL),
	(5, '04', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 1, '2022-05-27 10:27:45', '2022-05-27 10:27:45', NULL),
	(6, 'test', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 2, '2022-05-27 10:28:40', '2022-05-27 10:28:40', NULL),
	(8, 'dong-hp-2', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 2, '2022-05-27 10:29:05', '2022-05-27 10:29:05', NULL),
	(9, 'dong-ho-3-1', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 3, '2022-05-27 10:33:45', '2022-05-27 10:33:45', NULL),
	(10, '05', 'http://macshop.giaodienwebmau.com.vn/wp-content/up', 3, '2022-05-27 10:34:09', '2022-05-27 10:34:09', NULL);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;

-- Dumping structure for table test.order
CREATE TABLE IF NOT EXISTS `order` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `firstname` char(50) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` char(50) CHARACTER SET utf8 DEFAULT NULL,
  `phone` char(50) DEFAULT NULL,
  `address` char(50) CHARACTER SET utf8 DEFAULT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `total_cost` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_order_product` (`product_id`),
  CONSTRAINT `FK_order_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table test.order: ~0 rows (approximately)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table test.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 NOT NULL COMMENT 'tên',
  `descripion` mediumtext CHARACTER SET utf8 COMMENT 'mô tả',
  `price` bigint(20) unsigned NOT NULL,
  `discount` int(11) DEFAULT '0' COMMENT 'giảm giá',
  `brand` char(50) CHARACTER SET utf8 NOT NULL COMMENT 'tên hãng',
  `origin` char(50) CHARACTER SET utf8 DEFAULT NULL COMMENT 'nguồn gốc',
  `series` char(50) CHARACTER SET utf8 DEFAULT NULL COMMENT 'dòng máy',
  `size` char(255) CHARACTER SET utf8 NOT NULL,
  `protect` int(11) NOT NULL DEFAULT '0' COMMENT 'chống xước',
  `rate` int(6) DEFAULT '0' COMMENT 'đánh giá',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  `createdBy` bigint(20) unsigned NOT NULL,
  `updatedBy` bigint(20) unsigned NOT NULL,
  `deletedBy` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table test.product: ~2 rows (approximately)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `name`, `descripion`, `price`, `discount`, `brand`, `origin`, `series`, `size`, `protect`, `rate`, `createdAt`, `updatedAt`, `deletedAt`, `createdBy`, `updatedBy`, `deletedBy`) VALUES
	(1, 'Dây da Apple Watch Hermès Double Tour – Hàng phụ kiện', 'Dây da Apple Watch Hermès Double Tour là phụ kiện phù hợp cho những ai yêu thích phong cách lịch lãm, sang trọng mà vẫn không đánh mất sự trẻ trung và hiện đại. Với chất liệu da êm ái kết hợp với kiểu dây đôi cá tính, trẻ trung nhưng vẫn không làm mất đi vẻ sang trọng vốn có của dây da và Apple Watch. Dây da Apple Watch Hermès Double Tour tỉ mỉ, tinh tế trong từng đường chỉ. Dây màu nâu da bò được tạo điểm nhấn bởi đường chỉ trắng, càng làm nổi bật cho chiếc đồng hồ của bạn. Khoá cài kiểu sáng trẻ trung, bóng loáng với các nấc cài giúp bạn có thể dễ dàng điều chỉnh kích cỡ dây cho phù hợp và thoải mái nhất với cổ tay của bạn. Nếu bạn muốn một phong cách thời trang quý ông phong cách lịch lãm nhưng vẫn không muốn bị mất đi sự năng động cá tính của mình thì Dây da Double Tour là một lựa chọn lý tưởng cho bạn.', 750000, 20, 'Apple', 'Mỹ', 'Đồng hồ điện', '(38, 40), (42, 44)', 0, 0, '2022-05-27 10:11:40', '2022-05-27 10:23:36', NULL, 0, 0, 0),
	(2, 'Dây da Apple Watch Hermès Double Tour – Hàng phụ kiện', 'Dây da Apple Watch Hermès Double Tour là phụ kiện phù hợp cho những ai yêu thích phong cách lịch lãm, sang trọng mà vẫn không đánh mất sự trẻ trung và hiện đại. Với chất liệu da êm ái kết hợp với kiểu dây đôi cá tính, trẻ trung nhưng vẫn không làm mất đi vẻ sang trọng vốn có của dây da và Apple Watch. Dây da Apple Watch Hermès Double Tour tỉ mỉ, tinh tế trong từng đường chỉ. Dây màu nâu da bò được tạo điểm nhấn bởi đường chỉ trắng, càng làm nổi bật cho chiếc đồng hồ của bạn. Khoá cài kiểu sáng trẻ trung, bóng loáng với các nấc cài giúp bạn có thể dễ dàng điều chỉnh kích cỡ dây cho phù hợp và thoải mái nhất với cổ tay của bạn. Nếu bạn muốn một phong cách thời trang quý ông phong cách lịch lãm nhưng vẫn không muốn bị mất đi sự năng động cá tính của mình thì Dây da Double Tour là một lựa chọn lý tưởng cho bạn.', 600000, 0, 'Apple', 'Mỹ', 'Đồng hồ điện', '(38, 40), (42, 44)', 0, 0, '2022-05-27 10:18:25', '2022-05-27 10:23:34', NULL, 0, 0, 0),
	(3, 'Dây thép không gỉ Hoco WB07', 'Dây Apple watch – Dây thép không gỉ sang trọng và lịch lãm', 750000, 7, 'Hoco', 'Trung Quốc', 'Đồng hồ điện', '', 0, 0, '2022-05-27 10:30:44', '2022-05-27 10:31:51', NULL, 0, 0, 0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table test.product_color
CREATE TABLE IF NOT EXISTS `product_color` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `color` char(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__product` (`product_id`),
  KEY `FK_product_color_color` (`color`),
  CONSTRAINT `FK__product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_product_color_color` FOREIGN KEY (`color`) REFERENCES `color` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table test.product_color: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` (`id`, `product_id`, `color`) VALUES
	(1, 1, 'red'),
	(2, 1, 'black'),
	(3, 2, 'red'),
	(4, 2, 'black'),
	(5, 3, 'light'),
	(6, 3, 'black');
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;

-- Dumping structure for table test.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `firstname` varchar(50) CHARACTER SET utf8 NOT NULL,
  `lastname` varchar(50) CHARACTER SET utf8 NOT NULL,
  `isAdmin` int(11) NOT NULL DEFAULT '0',
  `lastLogin` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `privateKey` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table test.user: ~1 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `phone`, `address`, `firstname`, `lastname`, `isAdmin`, `lastLogin`, `privateKey`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'adminn', 'adminn', 'adminn@gmail.com', '0345637621', 'Hà Nội, Việt Nam', 'Công Nghệ', 'Web', 1, '2022-05-26 20:33:23', 1677, '2022-05-26 20:33:23', '2022-05-27 10:03:16', 0),
	(2, 'thangthang1', '123456', 'thangyt00@gmail.com', '0372621293', 'Ninh Bình, Việt Nam', 'Thắng', 'Đặng Xuân', 0, '2022-05-27 09:15:58', 0, '2022-05-27 09:15:58', '2022-05-27 09:15:58', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
