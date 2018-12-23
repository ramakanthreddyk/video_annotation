-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2018 at 01:23 PM
-- Server version: 10.1.30-MariaDB
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
  `vote` int(11) NOT NULL,
  `asset_annotation_start_time` datetime DEFAULT NULL,
  `asset_annotation_end_time` datetime DEFAULT NULL,
  `annotation_id` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `annotation`
--

INSERT INTO `annotation` (`asset_id`, `user_id`, `key_type_id`, `start_time`, `end_time`, `title`, `description`, `vote`, `asset_annotation_start_time`, `asset_annotation_end_time`, `annotation_id`) VALUES
(2, 1, 0, '50.095826', '83.476032', 'Test', 'user is walking', 1, '2018-12-01 14:00:50', '2018-12-01 14:01:23', '1545160930845'),
(1, 1, 0, '105.566625', '134.506606', 'Test', 'user is walking', 0, '2018-12-01 14:01:45', '2018-12-01 14:02:14', '1545161082474'),
(1, 1, 0, '301.298893', '346.049855', 'Test', 'user is walking', 0, '2018-12-01 14:05:01', '2018-12-01 14:05:46', '1545161242127'),
(2, 4, 0, '25.463454', '75.344108', 'Test', 'user is walking', 1, '2018-12-01 14:00:25', '2018-12-01 14:01:15', '1545245616434'),
(1, 4, 0, '106.673327', '158.289453', 'Test', 'user is walking', 0, '2018-12-01 14:01:46', '2018-12-01 14:02:38', '1545566890088'),
(1, 4, 0, '316.593685', '351.229268', 'Test', 'user is walking', 0, '2018-12-01 14:05:16', '2018-12-01 14:05:51', '1545566896173'),
(1, 4, 0, '206.543709', '239.317032', 'Test', 'user is walking', 0, '2018-12-01 14:03:26', '2018-12-01 14:03:59', '1545567085546'),
(1, 4, 0, '271.390448', '409.552859', 'Test', 'user is walking', 0, '2018-12-01 14:04:31', '2018-12-01 14:06:49', '1545567091417');

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
  `asset_from` datetime DEFAULT NULL,
  `asset_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`asset_name`, `asset_id`, `asset_type_id`, `asset_object`, `asset_from`, `asset_to`) VALUES
('asset01', 1, '1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '2018-12-01 14:00:00', '2018-12-01 14:29:00'),
('asset02', 2, '1', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '2018-12-01 14:00:00', '2018-12-01 14:09:56');

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
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Ramakanth', 'Reddy', 'ram@gmail.com', 'rk12345'),
(2, 'SAI', 'BHARGAVI', 'Beesu@gmail.com', '123456'),
(4, 'SAI', 'BHARGAVI', 'bee@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQ1NiI.K5cHe9i9zgVvF56PzM15Yq9h7i9pR-hxYm58VCgmdtE');

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
  MODIFY `timeline_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
