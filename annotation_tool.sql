-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 12, 2018 at 02:41 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

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
  `vote` int(11) NOT NULL,
  `asset_annotation_start_time` datetime DEFAULT NULL,
  `asset_annotation_end_time` datetime DEFAULT NULL,
  `annotation_id` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `annotation`
--

INSERT INTO `annotation` (`asset_id`, `user_id`, `key_type_id`, `start_time`, `end_time`, `title`, `description`, `vote`, `asset_annotation_start_time`, `asset_annotation_end_time`, `annotation_id`) VALUES
(1, 1, 0, '90.091138', '149.293886', 'Test12', 'run run run', 0, '2018-12-01 14:01:30', '2018-12-01 14:02:29', '1544376175514'),
(1, 1, 0, '290.876182', '365.596669', 'Test', 'user is walking', 0, '2018-12-01 14:04:50', '2018-12-01 14:06:05', '1544376264525'),
(1, 1, 0, '509.700466', '581.752364', 'Test', 'user is running', 0, '2018-12-01 14:08:29', '2018-12-01 14:09:41', '1544376269954'),
(1, 1, 0, '106.743553', '210.818517', 'Test', 'user is walking', 0, '2018-12-01 14:01:46', '2018-12-01 14:03:30', '1544376301744'),
(1, 1, 0, '525.894739', '528.3159', 'Test', 'user is walking', 0, '2018-12-01 14:08:45', '2018-12-01 14:08:48', '1544442638287'),
(1, 1, 0, '93.062698', '97.045472', 'Test', 'user is walking', 0, '2018-12-01 14:01:33', '2018-12-01 14:01:37', '1544443520226'),
(1, 1, 0, '301.307968', '307.475006', 'Test', 'user is walking', 0, '2018-12-01 14:05:01', '2018-12-01 14:05:07', '1544443789921'),
(2, 1, 0, '90.822541', '112.343487', 'Test', 'user is walking', 0, '2018-12-01 14:01:30', '2018-12-01 14:01:52', '1544444095985'),
(2, 1, 0, '104.172559', '106.548684', 'Test', 'user is running', 0, '2018-12-01 14:01:44', '2018-12-01 14:01:46', '1544444125208');

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
(1, 1),
(1, 2);

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
(2, 'run', 'user is running', 'r');

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `asset_name` varchar(255) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `asset_type_id` varchar(255) NOT NULL,
  `asset_object` varchar(255) NOT NULL,
  `asset_timestamp_from` datetime DEFAULT NULL,
  `asset_timestamp_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`asset_name`, `asset_id`, `asset_type_id`, `asset_object`, `asset_timestamp_from`, `asset_timestamp_to`) VALUES
('January', 1, '1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '2018-12-01 14:00:00', '2018-12-01 14:29:00'),
('January', 2, '1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '2018-12-01 14:00:00', '2018-12-01 14:09:56');

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
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `asset_type`
--

CREATE TABLE `asset_type` (
  `asset_type_id` int(11) NOT NULL,
  `asse_format` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `timeline`
--

CREATE TABLE `timeline` (
  `timeline_id` int(11) NOT NULL,
  `timeline_name` varchar(255) NOT NULL,
  `timeline_timestamp_from` datetime DEFAULT NULL,
  `timeline_timestamp_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timeline`
--

INSERT INTO `timeline` (`timeline_id`, `timeline_name`, `timeline_timestamp_from`, `timeline_timestamp_to`) VALUES
(1, 'Year_2018', '2018-12-01 14:00:00', '2018-12-01 15:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Ramakanth', 'Reddy', 'ram@gmail.com', 'rk12345');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `annotation_key_table`
--
ALTER TABLE `annotation_key_table`
  MODIFY `key_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `asset_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `asset_type`
--
ALTER TABLE `asset_type`
  MODIFY `asset_type_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `timeline`
--
ALTER TABLE `timeline`
  MODIFY `timeline_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
