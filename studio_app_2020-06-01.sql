# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.37)
# Database: studio_app
# Generation Time: 2020-06-01 20:16:23 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums`;

CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `user_id`)
VALUES
	(10,'Coding memes',6),
	(11,'Coding jokes',6),
	(12,'Places to visit',1);

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table albums_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums_photos`;

CREATE TABLE `albums_photos` (
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `albums_photos` WRITE;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;

INSERT INTO `albums_photos` (`album_id`, `photo_id`)
VALUES
	(10,36),
	(10,37),
	(10,38),
	(10,39),
	(10,41),
	(10,40),
	(11,43),
	(11,44),
	(11,42),
	(12,45),
	(12,46),
	(12,47),
	(12,51),
	(12,52);

/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(36,'First step in learning programming','https://pbs.twimg.com/media/Dlb-mxlU0AE9_sA.jpg',NULL,6),
	(37,'Error','https://pics.me.me/got-a-new-error-progress-smemegenerator-net-coding-memes-51672926.png','Got a new error',6),
	(38,'Stackoverflow','https://i.redd.it/2rf9uooambm21.jpg',NULL,6),
	(39,'Debugging','https://i.pinimg.com/originals/66/9d/eb/669deb643bb3956aa66eea0f42c66d2a.png',NULL,6),
	(40,'stackoverflow','https://i.redd.it/s2n41qn1wuu11.jpg',NULL,6),
	(41,'HTML','https://www.testbytes.net/wp-content/uploads/2019/06/Untitled-20.png',NULL,6),
	(42,'address','https://i.imgur.com/u4yglBJ.jpg',NULL,6),
	(43,'dt','https://www.explore-group.com/storage/images/DONALDTRUMP.jpg',NULL,6),
	(44,'Hello world','https://i.pinimg.com/originals/c5/a5/33/c5a5336a5ae9b2a2a7ca83906c319ae1.jpg',NULL,6),
	(45,'Taj mahal','https://images.financialexpress.com/2019/12/mahal.jpg?w=1200&h=800&imflag=true',NULL,1),
	(46,'Aya Sofia','https://i.redd.it/hx5qbku99niz.jpg',NULL,1),
	(47,'elpetra','https://thumbs.werkaandemuur.nl/1/ab05ec9135a7e737df813e585c62c0ac/817x600/thumbnail/fit.jpg',NULL,1),
	(51,'pyramids','https://lp-cms-production.imgix.net/news/2019/01/shutterstockRF_1037036482.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4',NULL,1),
	(52,'Abisko','https://stfturist.imgix.net/app/uploads/2017/11/norrsken-stf-abisko-1.jpg?auto=format%2Cenhance',NULL,1);

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(1,'samer.mnr@gmail.com','$2b$10$3cEzFOTWcjw1PHathDMuR.EIB9NAkpxOtr7GybUxhGnLYdXjJ5vg2','samer','Munawwar'),
	(6,'jn@badcameraphotography.com','$2b$10$YWVkRAxQUebaG5hceUeXAuXHrxAxrCHLa0UEiHjTSxEyCJ9yss/mO','Johan','Nordström');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
