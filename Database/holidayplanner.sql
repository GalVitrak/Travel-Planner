-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2023 at 08:40 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `holidayplanner`
--
CREATE DATABASE IF NOT EXISTS `holidayplanner` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `holidayplanner`;

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `destinationId` int(11) NOT NULL,
  `destinationName` varchar(20) NOT NULL,
  `description` varchar(250) NOT NULL,
  `imageName` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`destinationId`, `destinationName`, `description`, `imageName`) VALUES
(2, 'Paris', 'Paris, the city of Love. With a lot of baguettes and croissants (and sometimes snails) Fall in love in the beautiful destination.', 'c9088cdf-beba-4286-909f-33699ea55295.jpg'),
(8, 'Iceland', 'In 1973 a United States Navy DC plane ran out of fuel and crashed on the black beach at Sólheimasandur, in the South Coast of Iceland.', '8ff020d6-87d0-48b8-9541-c4c10f910a83.jpg'),
(23, 'Berlin', 'Berlin is the capital and largest city of Germany by both area and population.\r\nVisit the great museums & sights and then relax in a café, stroll through the shops and discover the most wonderful city', 'f76929b6-6c2d-4397-a6dc-53845f7b8bb6.jpg'),
(24, 'The Moon', 'The Moon is Earth\'s only natural satellite. It is the fifth largest satellite in the Solar System and the largest and most massive relative to its parent planet.', '8abe7f13-faa0-4d82-9d65-9bcd54b759b0.jpg'),
(25, 'Prague', 'Prague is the equal of Paris in terms of beauty. Its history goes back a millennium. And the beer? The best in Europe.', '4f28929c-2b92-4d7f-99c9-7c3898536176.jpg'),
(26, 'Warsaw', 'Warsaw is a mixture of relaxing green spaces, historic sites and vivid modernity. Discover the charming Old Town, Wilanów Palace and amazing Lazienki Park.', 'c2235b79-8d76-4d23-bc38-685e27ae26da.jpg'),
(27, 'Bucharest', 'Bucharest – and Romania in general – have something of a complicated reputation. After years of political upheaval – not to mention association with a certain vampire.', '822511b4-7e0d-4158-a436-8eac86042566.jpg'),
(28, 'Tel Aviv', '“Tel Aviv Nonstop City” is more than just a slogan. With the city’s beautiful beaches, diverse cultural scene, top-notch cuisine, and vibrant nightlife, there’s always something to see and do here.', 'ff4e45c8-333f-4449-99dc-1fde93760726.jpg'),
(29, 'Barcelona', 'Barcelona has become one of the most visited tourist destination of Spain. And has a history among the oldest in Europe.\r\nBarcelona also has an impressive variety of nightlife', '70117263-0b51-4b58-93b6-06b62dcbbe41.jpg'),
(32, 'Holon', 'A kid\'s city with no parking spaces.', '69a95d6d-0f89-4d66-8faa-0767ab1559f5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationId`, `userId`) VALUES
(22, 27),
(26, 27),
(12, 38),
(9, 38),
(6, 38),
(12, 39),
(26, 39),
(22, 39),
(9, 39),
(12, 40),
(22, 40),
(6, 40),
(12, 41),
(23, 41),
(11, 41),
(26, 41),
(12, 42),
(23, 42),
(6, 42),
(28, 27),
(29, 27),
(31, 27),
(28, 43),
(29, 43),
(31, 43),
(26, 43),
(32, 38),
(31, 38),
(27, 38),
(23, 38),
(12, 27);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `userName` varchar(15) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `role`) VALUES
(27, 'Gal', 'Vitrak', 'TommyChicknez', '29e34c8cbee847821a4a4fd4a753642795458f5fa28e26d9413eabe8109f9e01088cefb5416d647cec0b54cd02fbd03324e48aaae28a25c8b8518053e4a2a230', 'Admin'),
(38, 'Tal', 'Hafzadi', 'iZlatWow', 'd492030ca6e8f25df4a409701b6a7eb51df4480f71c83a1c46f5e0b14da11e59ab1342eb4e27b1eb4f5ad0600b7a888364b64ae5266c5282db3dc15ca1240161', 'User'),
(39, 'Omri', 'Birenbaum', 'not-purple', 'e2029bde88ec08a0af886a428948976ae697a6ca5ba1fc1b6dc2518b05cb16def65cc56e7355a9c9a16f2f68dda06a30df6555e8e5a6e60527e2672c832593f0', 'User'),
(40, 'Or', 'Saban', 'orSaban', 'f806ec1c3b399f670b514c8e6ae0ec60aee8166af23bc951f60fa76085f3b307190d50498420415e18c93cb715057c24ecd0202a43d2ed0c2be82f1da3b61065', 'User'),
(41, 'Hoshech', 'Saban', 'hoshechSaban', '2d65321d08af152d4e1138a8033d764a563c2a1f6708a4271e24f39bbbe982d151c046e9ad0e60af84fe3ef4feb8ee6e3184b21ec88d93eb5c8ad61e13b13b68', 'User'),
(42, 'Shlomo', 'Arzi', 'Shlomo', 'eb1c482985be234942dcae1b425212413d9b46d513d1d6d5bf90cf8b35d87b256270bf46e9d3f42442bb4d8af775441229a52402cebeea4c4585f59fb6dd2bdf', 'User'),
(43, 'Chen', 'Magen', 'chenz', '39c0cbfa4ed6479f92b7e58981b5d6f762de2f883e25ef73423c2a8832c4b3aefc96ecf6ebfb22cd2b5bf1504b5ba9e00db2fe8612110a708eb23b885e0e4e40', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destinationId` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destinationId`, `startDate`, `endDate`, `price`) VALUES
(6, 2, '2023-02-09 20:50:00', '2023-03-11 20:45:00', 888),
(9, 8, '2023-02-01 13:53:00', '2023-02-24 13:53:00', 6500),
(11, 8, '2023-02-05 10:00:00', '2023-03-09 13:45:00', 7999),
(12, 2, '2023-01-27 19:45:00', '2023-02-02 10:00:00', 560),
(22, 25, '2023-02-07 20:30:00', '2023-02-15 03:15:00', 350),
(23, 29, '2023-01-31 02:00:00', '2023-01-31 15:30:00', 399),
(26, 23, '2023-01-31 12:00:00', '2023-02-07 03:50:00', 400),
(27, 26, '2023-02-14 21:15:00', '2023-02-19 00:30:00', 600),
(28, 24, '2023-01-31 06:50:00', '2023-02-02 00:00:00', 9998),
(29, 24, '2023-02-20 06:45:00', '2023-02-22 00:00:00', 9999),
(30, 8, '2023-03-05 12:00:00', '2023-03-26 18:45:00', 6799),
(31, 24, '2023-03-29 07:00:00', '2023-03-31 21:25:00', 9999),
(32, 29, '2023-01-28 21:25:00', '2023-02-01 20:25:00', 350);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`destinationId`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`),
  ADD KEY `destinationId` (`destinationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `destinationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE;

--
-- Constraints for table `vacations`
--
ALTER TABLE `vacations`
  ADD CONSTRAINT `vacations_ibfk_1` FOREIGN KEY (`destinationId`) REFERENCES `destinations` (`destinationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
