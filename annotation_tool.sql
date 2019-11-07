-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: videoannotation.csgu2ca8zuyp.us-east-2.rds.amazonaws.com:3306
-- Generation Time: Nov 07, 2019 at 10:36 PM
-- Server version: 5.7.22
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `annotation_tool`
--

-- --------------------------------------------------------

--
-- Table structure for table `annotation`
--

CREATE TABLE `annotation` (
  `asset_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `key_type_id` int(11) NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `asset_annotation_start_time` datetime DEFAULT NULL,
  `asset_annotation_end_time` datetime DEFAULT NULL,
  `annotation_id` varchar(25) NOT NULL,
  `vote_up` int(11) NOT NULL,
  `vote_down` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `annotation`
--

INSERT INTO `annotation` (`asset_id`, `user_id`, `key_type_id`, `start_time`, `end_time`, `title`, `description`, `asset_annotation_start_time`, `asset_annotation_end_time`, `annotation_id`, `vote_up`, `vote_down`) VALUES
(1, 1, 1, '3.971586', '75.519457', 'what to do with it', 'say he is walking', '2018-12-01 14:00:03', '2018-12-01 14:01:15', '1546587858860', 14, 8),
(1, 1, 2, '92.688856', '106.438533', 'Test', 'user is running', '2018-12-01 14:01:32', '2018-12-01 14:01:46', '1546587938861', 3, 7),
(1, 1, 1, '122.086646', '123.193733', 'Test', 'user is walking', '2018-12-01 14:02:02', '2018-12-01 14:02:03', '1546592255318', 0, 0),
(1, 1, 1, '142.989402', '164.704067', 'Test', 'user is walking', '2018-12-01 14:02:22', '2018-12-01 14:02:44', '1546592260717', 6, 6),
(1, 5, 1, '65.791623', '119.247318', 'annotation', 'he is walking', '2018-12-01 14:01:05', '2018-12-01 14:01:59', '1546775918126', 5, 1),
(1, 5, 1, '205.598824', '234.38266', 'annotation_2', 'user is walking', '2018-12-01 14:03:25', '2018-12-01 14:03:54', '1546775927693', 2, 2),
(2, 5, 1, '81.958286', '106.242223', 'Test', 'user is walking', '2018-12-01 14:01:21', '2018-12-01 14:01:46', '1546779913889', 0, 3),
(2, 5, 1, '157.845588', '186.817777', 'Test', 'user is walking', '2018-12-01 14:02:37', '2018-12-01 14:03:06', '1546779924973', 1, 0),
(1, 5, 1, '349.298208', '376.456576', 'Test', 'user is walking', '2018-12-01 14:05:49', '2018-12-01 14:06:16', '1546780177741', 0, 0),
(1, 4, 1, '48.429945', '169.504808', 'Test', 'user is walking', '2018-12-01 14:00:48', '2018-12-01 14:02:49', '1549223351387', 4, 1),
(1, 4, 2, '248.20347', '311.767773', 'Test', 'user is running', '2018-12-01 14:04:08', '2018-12-01 14:05:11', '1549223354072', 2, 5),
(1, 4, 1, '426.788893', '412.276413', 'Test', 'user is walking', '2018-12-01 14:07:06', '2018-12-01 14:06:52', '1549223365605', 0, 0),
(1, 5, 1, '89.605899', '91.253379', 'Test', 'user is walking', '2018-12-01 14:01:29', '2018-12-01 14:01:31', '1549275060314', 0, 0),
(1, 5, 1, '95.891291', '147.854643', 'Test', 'user is walking', '2018-12-01 14:01:35', '2018-12-01 14:02:27', '1549275093250', 0, 0),
(1, 5, 1, '162.1662', '178.326004', 'Test', 'user is walking', '2018-12-01 14:02:42', '2018-12-01 14:02:58', '1549275101426', 0, 0),
(1, 5, 1, '431.226113', '439.133408', 'sample', 'user is walking', '2018-12-01 14:07:11', '2018-12-01 14:07:19', '1549275125894', 0, 0),
(1, 5, 1, '4.94401', '36.310187', 'Test', 'user is walking', '2018-12-01 14:00:04', '2018-12-01 14:00:36', '1549275796772', 0, 0),
(1, 5, 1, '48.019091', '54.117205', 'Test', 'user is walking', '2018-12-01 14:00:48', '2018-12-01 14:00:54', '1549275814569', 0, 0),
(1, 5, 1, '514.189811', '529.513348', 'Test', 'user is walking', '2018-12-01 14:08:34', '2018-12-01 14:08:49', '1549279922782', 0, 0),
(1, 5, 1, '0', '0', 'Test', 'user is walking', '2018-12-01 14:00:00', '2018-12-01 14:00:00', '1549280006110', 0, 0),
(1, 5, 1, '5', '5', 'Test', 'user is walking', '2018-12-01 14:00:05', '2018-12-01 14:00:05', '1549280018747', 0, 0),
(1, 5, 1, '5', '5', 'Test', 'user is walking', '2018-12-01 14:00:05', '2018-12-01 14:00:05', '1549280033270', 0, 0),
(1, 6, 2, '127.927154', '132.014119', 'Test', 'user is running', '2018-12-01 14:02:07', '2018-12-01 14:02:12', '1565210549812', 19, 10),
(1, 6, 2, '135.706498', '137.936475', 'Test', 'user is running', '2018-12-01 14:02:15', '2018-12-01 14:02:17', '1565210555771', 0, 0),
(1, 9, 2, '4.658311', '6.907815', 'Test', 'user is running', '2018-12-01 14:00:04', '2018-12-01 14:00:06', '1568470204420', 0, 0),
(1, 9, 1, '115.031327', '119.246511', 'Test', 'user is walking', '2018-12-01 14:01:55', '2018-12-01 14:01:59', '1568470213073', 0, 0),
(1, 9, 2, '121.474929', '142.82422', 'Test', 'user is running', '2018-12-01 14:02:01', '2018-12-01 14:02:22', '1568470236652', 0, 0),
(1, 9, 1, '238.678082', '245.232327', 'Test', 'user is walking', '2018-12-01 14:03:58', '2018-12-01 14:04:05', '1568470340549', 0, 0),
(1, 9, 1, '249.674234', '251.216239', 'Test', 'user is walking', '2018-12-01 14:04:09', '2018-12-01 14:04:11', '1568470534538', 0, 0),
(1, 9, 1, '253.470905', '275.568911', 'Test', 'user is walking', '2018-12-01 14:04:13', '2018-12-01 14:04:35', '1568470558886', 0, 0),
(2, 9, 2, '31.587091', '83.64118', 'Test', 'user is running', '2018-12-01 14:00:32', '2018-12-01 14:01:24', '1568549013961', 0, 0),
(2, 10, 2, '193.709635', '218.262903', 'bunny', 'bunny is running', '2018-12-01 14:03:14', '2018-12-01 14:03:38', '1568550437591', 0, 0),
(2, 10, 2, '113.222026', '118.933736', 'Test', 'user is running', '2018-12-01 14:01:53', '2018-12-01 14:01:59', '1568552625184', 0, 0),
(2, 10, 2, '307.194759', '308.839557', 'Test', 'user is running', '2018-12-01 14:05:07', '2018-12-01 14:05:09', '1568553500225', 0, 0),
(2, 10, 1, '318.890236', '322.471835', 'Test', 'user is walking', '2018-12-01 14:05:19', '2018-12-01 14:05:22', '1568553508962', 0, 0),
(2, 7, 1, '31.872666', '77.405048', 'Test', 'user is walking', '2018-12-01 14:00:32', '2018-12-01 14:01:17', '1569271256339', 0, 0),
(2, 7, 2, '135.585396', '178.631594', 'Test', 'user is running', '2018-12-01 14:02:16', '2018-12-01 14:02:59', '1569271261153', 0, 0),
(2, 7, 1, '244.729045', '307.557006', 'Test', 'user is walking', '2018-12-01 14:04:05', '2018-12-01 14:05:08', '1569271321440', 0, 0),
(2, 7, 1, '478.725697', '509.575283', 'Test', 'user is walking', '2018-12-01 14:07:59', '2018-12-01 14:08:30', '1569271327064', 0, 0),
(1, 9, 1, '93.880971', '193.365214', 'Test', 'user is walking', '2018-12-01 14:01:34', '2018-12-01 14:03:13', '1569309979078', 0, 0),
(1, 2, 2, '23.930325', '117.462071', 'Test', 'user is running', '2018-12-01 14:00:24', '2018-12-01 14:01:57', '1569336946691', 0, 0),
(1, 2, 1, '321.778328', '375.470448', 'Test', 'user is walking', '2018-12-01 14:05:22', '2018-12-01 14:06:15', '1569336949904', 0, 0),
(1, 2, 2, '435.828813', '500.627264', 'Test', 'user is running', '2018-12-01 14:07:16', '2018-12-01 14:08:21', '1569336952694', 0, 0),
(1, 2, 2, '49.702185', '90.453707', 'Test', 'user is running', '2018-12-01 14:00:50', '2018-12-01 14:01:30', '1569336971298', 0, 0),
(1, 10, 1, '104.808316', '176.344152', 'Test', 'user is walking', '2018-12-01 14:01:45', '2018-12-01 14:02:56', '1569353800390', 0, 0),
(2, 7, 1, '160.390296', '169.239995', 'Test', 'user is walking', '2018-12-01 14:02:40', '2018-12-01 14:02:49', '1569667932211', 0, 0),
(3, 7, 1, '12.570302', '16.372064', 'Test', 'user is walking', '2018-12-01 14:00:13', '2018-12-01 14:00:16', '1569684838952', 0, 0),
(3, 7, 1, '35.32901', '36.67539', 'Test', 'user is walking', '2018-12-01 14:00:35', '2018-12-01 14:00:37', '1569684861323', 0, 0),
(2, 17, 1, '65.599389', '73.074736', 'Test', 'user is walking', '2018-12-01 14:01:06', '2018-12-01 14:01:13', '1569794278156', 3, 2),
(1, 18, 1, '75.616286', '203.800577', 'Test', 'user is walking', '2018-12-01 14:01:16', '2018-12-01 14:03:24', '1569844068497', 7, 1),
(2, 0, 1, '4.616838', '78.922794', 'Test', 'user is walking', '2018-12-01 14:00:05', '2018-12-01 14:01:19', '1570113065375', 0, 0),
(2, 0, 2, '122.36353', '178.631594', 'Test', 'user is running', '2018-12-01 14:02:02', '2018-12-01 14:02:59', '1570113183316', 2, 0),
(2, 0, 1, '490.253031', '492.868603', 'Test', 'user is walking', '2018-12-01 14:08:10', '2018-12-01 14:08:13', '1570113413084', 0, 0),
(2, 0, 1, '411.618345', '483.627725', 'Test', 'user is walking', '2018-12-01 14:06:52', '2018-12-01 14:08:04', '1570113701658', 0, 0),
(1, 20, 1, '97.673207', '168.026031', 'Test', 'user is walking', '2018-12-01 14:01:38', '2018-12-01 14:02:48', '1570138045036', 0, 0),
(4, 20, 1, '13.457674', '18.42823', 'Test', 'user is walking', '2018-12-01 14:00:13', '2018-12-01 14:00:18', '1570138057489', 2, 0),
(4, 20, 1, '35.590607', '43.567', 'Test', 'user is walking', '2018-12-01 14:00:36', '2018-12-01 14:00:44', '1570138060872', 0, 2),
(2, 19, 1, '69.145304', '83.161113', 'Test', 'user is walking', '2018-12-01 14:01:09', '2018-12-01 14:01:23', '1570608996304', 0, 0),
(2, 17, 1, '73.041177', '115.194306', 'Test', 'user is walking', '2018-12-01 14:01:13', '2018-12-01 14:01:55', '1570648493634', 0, 0),
(2, 19, 2, '155.070039', '209.163864', 'Test', 'user is running', '2018-12-01 14:02:35', '2018-12-01 14:03:29', '1570902234606', 0, 0),
(2, 19, 1, '279.373371', '334.853421', 'Test', 'user is walking', '2018-12-01 14:04:39', '2018-12-01 14:05:35', '1570902239963', 0, 0),
(2, 19, 2, '409.497887', '449.579283', 'Test', 'user is running', '2018-12-01 14:06:49', '2018-12-01 14:07:30', '1570902245330', 0, 0),
(2, 19, 1, '486.636792', '517.699141', 'Test', 'user is walking', '2018-12-01 14:08:07', '2018-12-01 14:08:38', '1570902250112', 0, 0),
(2, 17, 2, '171.05886', '196.027238', 'Test', 'user is running', '2018-12-01 14:02:51', '2018-12-01 14:03:16', '1571775696077', 0, 0),
(2, 17, 2, '234.804557', '259.522469', 'Test', 'user is running', '2018-12-01 14:03:55', '2018-12-01 14:04:20', '1571775703286', 0, 0),
(1, 19, 2, '108.77882', '128.484236', 'Test', 'user is running', '2018-12-01 14:01:49', '2018-12-01 14:02:08', '1573074584191', 0, 0),
(4, 24, 1, '14.206735', '20.439709', 'Test', 'user is walking', '2018-12-01 14:00:14', '2018-12-01 14:00:20', '1573133808752', 2, 0),
(4, 24, 3, '38.825389', '45.044159', 'Test', 'user is sitting', '2018-12-01 14:00:39', '2018-12-01 14:00:45', '1573133829821', 1, 0),
(4, 24, 1, '74.449606', '75.846787', 'Test', 'user is walking', '2018-12-01 14:01:14', '2018-12-01 14:01:16', '1573133851942', 0, 0),
(4, 24, 3, '85.078385', '89.843177', 'Test', 'user is sitting', '2018-12-01 14:01:25', '2018-12-01 14:01:30', '1573133860864', 0, 0),
(4, 24, 4, '39.9215', '62.268058', 'Earth', 'Object is moving', '2018-12-01 14:00:40', '2018-12-01 14:01:02', '1573134080466', 1, 0),
(4, 27, 1, '91.260776', '95.021899', 'Grandpa', 'he is walking', '2018-12-01 14:01:31', '2018-12-01 14:01:35', '1573146792638', 1, 0),
(4, 27, 2, '96.220009', '135.414296', 'Grandpa & son', 'Both are running', '2018-12-01 14:01:36', '2018-12-01 14:02:15', '1573146833028', 5, 0),
(4, 27, 1, '229.590987', '245.661493', 'Grandpa', 'he is walking', '2018-12-01 14:03:50', '2018-12-01 14:04:06', '1573146875824', 3, 1),
(4, 27, 1, '250.798658', '309.507154', 'Grandpa', 'he is walking', '2018-12-01 14:04:11', '2018-12-01 14:05:10', '1573146907045', 3, 2),
(4, 27, 1, '397.655052', '410.11743', 'Grandpa', 'he is walking', '2018-12-01 14:06:38', '2018-12-01 14:06:50', '1573146924130', 1, 4),
(4, 27, 3, '46.929992', '64.17688', 'young boy', 'young boy is sitting', '2018-12-01 14:00:47', '2018-12-01 14:01:04', '1573146989792', 3, 2),
(4, 27, 6, '20.76959', '28.55816', 'Grandpa', 'Grandpa is talking', '2018-12-01 14:00:21', '2018-12-01 14:00:29', '1573147089846', 5, 0),
(4, 27, 6, '31.016679', '36.726503', 'Grandpa', 'Grandpa is talking', '2018-12-01 14:00:31', '2018-12-01 14:00:37', '1573147098021', 4, 1),
(4, 27, 6, '38.30107', '70.957557', 'Grandpa', 'Grandpa is talking', '2018-12-01 14:00:38', '2018-12-01 14:01:11', '1573147132252', 5, 1),
(4, 27, 5, '254.411317', '290.476486', 'Grandpa', 'Grandpa is jumping', '2018-12-01 14:04:14', '2018-12-01 14:04:50', '1573147207679', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `annotation_key_map`
--

CREATE TABLE `annotation_key_map` (
  `timeline_id` int(11) NOT NULL,
  `key_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `annotation_key_map`
--

INSERT INTO `annotation_key_map` (`timeline_id`, `key_type_id`) VALUES
(3, 1),
(3, 2),
(3, 3),
(1, 1),
(2, 2),
(1, 2),
(1, 3),
(3, 4),
(2, 1),
(2, 3),
(2, 4),
(3, 5),
(3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `annotation_key_table`
--

CREATE TABLE `annotation_key_table` (
  `key_type_id` int(11) NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `key_description` varchar(255) NOT NULL,
  `key_shortcut` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `annotation_key_table`
--

INSERT INTO `annotation_key_table` (`key_type_id`, `key_name`, `key_description`, `key_shortcut`) VALUES
(1, 'walk', 'user is walking', 'w'),
(2, 'run', 'user is running', 'r'),
(3, 'sit', 'user is sitting', 's'),
(4, 'Move', 'User is moving', 'm'),
(5, 'jump', 'user is jumping', 'j'),
(6, 'talk', 'user is talking', 't');

-- --------------------------------------------------------

--
-- Table structure for table `annotator_jobs`
--

CREATE TABLE `annotator_jobs` (
  `annotator_id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `annotator_jobs`
--

INSERT INTO `annotator_jobs` (`annotator_id`, `asset_id`) VALUES
(17, 2),
(17, 3),
(18, 1),
(18, 4),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(18, 2),
(19, 2),
(19, 3),
(20, 1),
(20, 4),
(17, 1),
(19, 1),
(24, 3),
(24, 4),
(24, 1),
(24, 2),
(27, 4);

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `asset_name` varchar(255) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `asset_type_id` varchar(255) NOT NULL,
  `asset_object` varchar(255) NOT NULL,
  `asset_from` datetime DEFAULT NULL,
  `asset_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`asset_name`, `asset_id`, `asset_type_id`, `asset_object`, `asset_from`, `asset_to`) VALUES
('asset01', 1, '1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '2018-12-01 14:00:00', '2018-12-01 14:29:00'),
('asset02', 2, '1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '2018-12-01 14:00:00', '2018-12-01 14:09:56'),
('asset03', 3, '2', 'http://static.videogular.com/assets/videos/videogular.webm', '2018-12-01 14:00:00', '2019-01-01 14:29:00'),
('asset04', 4, '1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '2018-12-01 14:00:00', '2019-01-01 14:29:00');

-- --------------------------------------------------------

--
-- Table structure for table `asset_timeline_cross_table`
--

CREATE TABLE `asset_timeline_cross_table` (
  `timeline_id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset_timeline_cross_table`
--

INSERT INTO `asset_timeline_cross_table` (`timeline_id`, `asset_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `asset_type`
--

CREATE TABLE `asset_type` (
  `asset_type_id` int(11) NOT NULL,
  `asset_format` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `evaluator_jobs`
--

CREATE TABLE `evaluator_jobs` (
  `evaluator_id` int(11) NOT NULL,
  `annotator_id` int(11) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `timeline_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `evaluator_jobs`
--

INSERT INTO `evaluator_jobs` (`evaluator_id`, `annotator_id`, `asset_id`, `timeline_id`) VALUES
(18, 17, 2, '1'),
(18, 17, 3, '2'),
(18, 20, 4, '3'),
(21, 17, 2, '1'),
(21, 17, 3, '2'),
(21, 20, 4, '3'),
(22, 17, 2, '1'),
(22, 17, 3, '2'),
(22, 20, 4, '3'),
(23, 17, 2, '1'),
(23, 17, 3, '2'),
(23, 20, 4, '3'),
(25, 24, 3, '2'),
(25, 24, 4, '3'),
(25, 24, 2, '1'),
(28, 27, 4, '3'),
(29, 27, 4, '3'),
(30, 27, 4, '3'),
(31, 27, 4, '3'),
(32, 27, 4, '3');

-- --------------------------------------------------------

--
-- Table structure for table `timeline`
--

CREATE TABLE `timeline` (
  `timeline_id` int(11) NOT NULL,
  `timeline_name` varchar(255) NOT NULL,
  `timeline_from` datetime DEFAULT NULL,
  `timeline_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timeline`
--

INSERT INTO `timeline` (`timeline_id`, `timeline_name`, `timeline_from`, `timeline_to`) VALUES
(1, 'timeline01', '2018-12-01 14:00:00', '2018-12-01 15:00:00'),
(2, 'timeline02', '2018-11-01 08:00:00', '2018-11-01 15:00:00'),
(3, 'timeline03', '2017-10-01 08:00:00', '2018-10-01 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `user_type`) VALUES
(7, 'Super Admin', 'Admin', 'admin@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'SuperAdmin'),
(17, 'test', 'name', 'annotator@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Annotator'),
(18, 'sai', 'beesu', 'sai@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(19, 'annotator', '01', 'annotator01@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Annotator'),
(20, 'annotator', '02', 'annotator02@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Annotator'),
(21, 'evaluator', '01', 'evaluator01@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(22, 'evaluator', '02', 'evaluator02@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(23, 'evaluator', '03', 'evaluator03@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(24, 'Ramakanth Reddy', 'Kowdampalli', 'ramakanth_annotator@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Annotator'),
(25, 'Abhinav', 'Ratnam', 'abhinav_evaluator@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(26, 'evaluator', '04', 'evaluator04@yahoo.co.in', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(27, 'annotator', 'test', 'annotator_test@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Annotator'),
(28, 'evaluator_01', 'test', 'evaluator_01_test@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(29, 'evaluator_02', 'test', 'evaluator_02_test@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(30, 'evaluator_03', 'test', 'evaluator_03_test@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(31, 'evaluator_04', 'test', 'evaluator_04_test@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator'),
(32, 'evaluator_05', 'test', 'evaluator_05_test@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE', 'Evaluator');

-- --------------------------------------------------------

--
-- Table structure for table `userUploadAssets`
--

CREATE TABLE `userUploadAssets` (
  `filePath` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userUploadAssets`
--

INSERT INTO `userUploadAssets` (`filePath`) VALUES
('https://useruploadvideos.s3.eu-central-1.amazonaws.com/19f96eda-67b3-4dee-9278-9ef303a0ab31.MP4'),
('https://useruploadvideos.s3.eu-central-1.amazonaws.com/b9ba7a75-8c6c-4d87-b19a-7333e733d24b.MP4'),
('https://useruploadvideos.s3.eu-central-1.amazonaws.com/c7e11094-7146-4d15-b863-9fe1b2280879 (1).mp4'),
('https://useruploadvideos.s3.eu-central-1.amazonaws.com/eb0cc2d2-5d93-4051-af8d-84a9ff096ea9.mp4'),
('https://useruploadvideos.s3.eu-central-1.amazonaws.com/scrollToView.mp4'),
('https://useruploadvideos.s3.eu-central-1.amazonaws.com/videogular.mp4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `annotation_key_table`
--
ALTER TABLE `annotation_key_table`
  ADD PRIMARY KEY (`key_type_id`);

--
-- Indexes for table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`asset_id`);

--
-- Indexes for table `asset_type`
--
ALTER TABLE `asset_type`
  ADD PRIMARY KEY (`asset_type_id`);

--
-- Indexes for table `timeline`
--
ALTER TABLE `timeline`
  ADD PRIMARY KEY (`timeline_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `userUploadAssets`
--
ALTER TABLE `userUploadAssets`
  ADD PRIMARY KEY (`filePath`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `annotation_key_table`
--
ALTER TABLE `annotation_key_table`
  MODIFY `key_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `asset_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `asset_type`
--
ALTER TABLE `asset_type`
  MODIFY `asset_type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `timeline`
--
ALTER TABLE `timeline`
  MODIFY `timeline_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
