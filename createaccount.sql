-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Aug 02, 2024 at 03:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `createaccount`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phonenumber` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `phonenumber`, `email`, `dob`, `gender`, `password`) VALUES
(1, 'Guru', '8200297639', 'gurupatel279@gmail.com', '2004-05-20', 'Male', '123'),
(15, 'Aman', '6354635821', 'amanap1108@gmail.com', '2024-07-05', 'Male', 'aman123');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'admin', '$2a$12$TseHxaEo74Ch2B/Qa1K87evMQvdCXkuy9swZAH.TfTaDa8wNcJzYW', 'gurupatel279@gmail.com', '2024-07-23 15:07:09');

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_events`
--

CREATE TABLE `enrolled_events` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `event_id` varchar(36) NOT NULL,
  `enrollment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrolled_events`
--

INSERT INTO `enrolled_events` (`id`, `user_email`, `event_id`, `enrollment_date`) VALUES
(2, 'gurupatel279@gmail.com', '222c38c4-ba5f-490a-834f-17507f347533', '2024-07-24'),
(3, 'gurupatel279@gmail.com', '928dcc2d-856e-495d-8219-48397b138018', '2024-07-24'),
(7, 'gurupatel279@gmail.com', '71a12567-2a22-4aa0-8c5c-b0d035c37088', '2024-07-28'),
(11, 'gurupatel279@gmail.com', 'f7d8e9b2-a1c4-4b9e-b3c6-d2f6c8e7f3d8', '2024-07-28'),
(12, 'gurupatel279@gmail.com', '0cd8129f-b175-436f-9723-7da65529d973', '2024-07-30');

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_hackathons`
--

CREATE TABLE `enrolled_hackathons` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `hackathon_id` varchar(36) NOT NULL,
  `enrollment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrolled_hackathons`
--

INSERT INTO `enrolled_hackathons` (`id`, `user_email`, `hackathon_id`, `enrollment_date`) VALUES
(1, 'gurupatel279@gmail.com', '6bf4e657-02fb-4315-99ad-5a6b845a4d5a', '2024-07-24'),
(2, 'gurupatel279@gmail.com', '1071427b-dcc7-4cd2-ba35-a019c81ed237', '2024-07-24'),
(3, 'gurupatel279@gmail.com', 'c0e3980f-308b-48b4-8fd3-943234b43a98', '2024-07-30'),
(4, 'gurupatel279@gmail.com', 'c4a19f8e-d43b-41d0-b0c1-476e529c8bb4', '2024-07-30');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` varchar(36) NOT NULL,
  `deadlineDate` date DEFAULT NULL,
  `eventName` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `month` varchar(20) DEFAULT NULL,
  `day` varchar(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `startingTime` varchar(20) DEFAULT NULL,
  `endingTime` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `age` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `status` enum('active','past') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `deadlineDate`, `eventName`, `logo`, `location`, `month`, `day`, `img`, `startingTime`, `endingTime`, `description`, `age`, `country`, `status`) VALUES
('0cd8129f-b175-436f-9723-7da65529d973', '2024-10-25', 'CodeFest 2024', '/images/uploads/1722333891214.avif', 'Virtual', 'May', 'Saturday', '/images/uploads/1722333891216.avif', '10:00 AM', '6:00 PM', 'Join us for a day of coding challenges and innovation!', 'all ages', 'Global', 'active'),
('183ad85e-5b83-4219-827c-fd58a575b634', '2024-11-17', 'Business Conference', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Penticton, Canada', 'july', 'thursday', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '9:15 AM', '9:46 PM', 'Network and learn from industry leaders at our Business Conference.', 'adults', 'Canada', 'active'),
('222c38c4-ba5f-490a-834f-17507f347533', '2024-12-31', 'New Year Extravaganza', '/images/uploads/1721834836576.jpg', 'Times Square, New York', 'September', 'tuesday', '/images/uploads/1721834836633.jpg', '8:00 PM', '2:00 AM', 'Celebrate the New Year with us at Times Square with live music, fireworks, and more!', '21+', 'USA', 'active'),
('375e9172-49bf-47b2-82ff-ddc99f073fe9', '2024-09-24', 'Outdoor Adventure', 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Shangchewan, China', 'november', 'monday', 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '12:36 AM', '3:53 AM', 'Embark on an unforgettable outdoor adventure with us!', 'adults', 'China', 'active'),
('71a12567-2a22-4aa0-8c5c-b0d035c37088', '2024-12-10', 'Film Festival', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80', 'Shurugwi, Zimbabwe', 'december', 'thursday', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80', '8:42 PM', '3:42 AM', 'Celebrate the art of cinema at our prestigious Film Festival.', 'adults', 'Zimbabwe', 'active'),
('928dcc2d-856e-495d-8219-48397b138018', '2024-08-15', 'Summer Beats Music Festival', '/images/uploads/1721837037182.jpg', 'Central Park, New York', 'August', 'thursday', '/images/uploads/1721837037207.jpg', '2:00 PM', '11:00 PM', 'Join us for the Summer Beats Music Festival with performances from top artists, food trucks, and more!', 'All ages', 'USA', 'active'),
('a2944b43-1db0-4f6f-8cbd-af99f623ef6f', '2025-02-01', 'Music Festival', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80', 'Naples, United States', 'december', 'friday', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80', '12:11 AM', '12:40 PM', 'Get ready to rock at our electrifying Music Festival!', 'kids', 'United States', 'active'),
('a6c7d9e1-b2f4-4d8a-b7c3-f8e2d9f6e8d2', '2024-08-10', 'Food Truck Festival', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80', 'Ḩayfā, Israel', 'july', 'saturday', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80', '12:00 PM', '10:00 PM', 'Indulge in a delicious culinary adventure at our Food Truck Festival.', 'all ages', 'Israel', 'active'),
('c9e6d3b4-f9d3-4b6f-9e6d-b8f7d2e3c7d2', '2025-06-20', 'Gaming Convention', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Krasnodar, Russia', 'may', 'friday', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', '9:00 AM', '8:00 PM', 'Join us for an epic gaming experience at our Gaming Convention!', 'teens', 'Russia', 'active'),
('cba79f81-f5e5-43c6-8df6-819f58d92ca3', '2024-09-24', 'Art Exhibition', 'https://images.unsplash.com/photo-1503293050619-6048ffad0dc5?q=80&w=1775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Sirnarasa, Indonesia', 'january', 'thursday', 'https://images.unsplash.com/photo-1503293050619-6048ffad0dc5?q=80&w=1775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '11:30 PM', '7:42 PM', 'Immerse yourself in the world of art at our captivating exhibition.', 'seniors', 'Indonesia', 'active'),
('d844cfad-1e65-4df5-ac8b-fd0747216067', '2025-05-21', 'Dance Competition', 'https://images.unsplash.com/photo-1474308371634-c715850e8d8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Al Maḩwīt, Yemen', 'november', 'tuesday', 'https://images.unsplash.com/photo-1474308371634-c715850e8d8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '11:17 AM', '10:14 PM', 'Showcase your dance moves and compete for the ultimate prize!', 'teens', 'Yemen', 'active'),
('e7d2c9e6-b8f7-4b6f-9e6d-f9d3d3c7d2e3', '2024-10-31', 'Halloween Party', 'https://images.unsplash.com/photo-1607411713289-769cd0dcce87?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Bāgepallī, India', 'october', 'wednesday', 'https://images.unsplash.com/photo-1607411713289-769cd0dcce87?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '7:00 PM', '2:00 AM', 'Get ready for a spooktacular night at our Halloween Party!', 'all ages', 'India', 'active'),
('e9132e07-21d4-4a7e-9a7c-f05183866c0f', '2024-10-26', 'Book Fair', 'https://images.unsplash.com/photo-1523473125050-1c9405e8b208?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Krajan Caluk, Indonesia', 'november', 'saturday', 'https://images.unsplash.com/photo-1523473125050-1c9405e8b208?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '1:03 PM', '5:36 PM', 'Explore a world of literature at our annual Book Fair.', 'all ages', 'Indonesia', 'active'),
('f7d8e9b2-a1c4-4b9e-b3c6-d2f6c8e7f3d8', '2024-07-14', 'Science Fair', 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1161&q=80', 'Banjarnegara, Indonesia', 'february', 'sunday', 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1161&q=80', '10:00 AM', '6:00 PM', 'Explore the wonders of science at our interactive Science Fair.', 'kids', 'Indonesia', 'past');

-- --------------------------------------------------------

--
-- Table structure for table `hackathons`
--

CREATE TABLE `hackathons` (
  `id` varchar(36) NOT NULL,
  `deadlineDate` date DEFAULT NULL,
  `eventName` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `month` varchar(20) DEFAULT NULL,
  `day` varchar(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `startingTime` varchar(20) DEFAULT NULL,
  `endingTime` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `age` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `status` enum('active','past') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hackathons`
--

INSERT INTO `hackathons` (`id`, `deadlineDate`, `eventName`, `logo`, `location`, `month`, `day`, `img`, `startingTime`, `endingTime`, `description`, `age`, `country`, `status`) VALUES
('1071427b-dcc7-4cd2-ba35-a019c81ed237', '2024-09-04', 'Hack the World', '/images/uploads/1721831794134.jpg', 'Gandhinagar, India', 'September', 'Tuesday', '/images/uploads/1721831794143.jpg', '8:00 AM', '8:00 PM', 'Join the biggest hackathon. compete, code, win !!', '18+', 'India', 'active'),
('187c276c-9013-4875-83ee-0e02010e16df', '2025-05-30', 'HackSummer', 'https://example.com/hacksummer.png', 'Rio de Janeiro, Brazil', 'May', 'Saturday', '/images/hackathons/hack10.jpg', '10:00 AM', '8:00 PM', 'Heat up your coding skills at HackSummer!', '18+', 'Brazil', 'active'),
('1a8950f2-08e2-4cb3-897f-493aa03cb605', '2025-02-14', 'HackValentine', 'https://example.com/hackvalentine.png', 'Paris, France', 'February', 'Sunday', '/images/hackathons/hack7.jpg', '10:00 AM', '8:00 PM', 'Share your love for coding at HackValentine!', '18+', 'France', 'active'),
('26c87e2f-b894-47cf-bd92-1ee1e6f3ad15', '2024-10-12', 'DevDash', 'https://example.com/devdash.png', 'Tokyo, Japan', 'October', 'Tuesday', '/images/hackathons/hack3.webp', '9:00 AM', '7:00 PM', 'Race against the clock in the ultimate coding challenge - DevDash!', '18+', 'Japan', 'active'),
('2edff89d-4e3d-4fb1-b8c7-876ff131382c', '2025-01-20', 'ByteBash', 'https://example.com/bytebash.png', 'Seattle, USA', 'January', 'Wednesday', '/images/hackathons/hack6.jpeg', '9:30 AM', '7:30 PM', 'Get ready for a byte-sized coding frenzy at ByteBash!', '18+', 'United States', 'active'),
('56bd63fd-4464-4a61-981e-8cfcf2f84f9d', '2024-08-05', 'InnoHacks', 'https://example.com/innohacks.png', 'Berlin, Germany', 'August', 'Wednesday', '/images/hackathons/hack1.jpg', '8:30 AM', '6:30 PM', 'Where innovation meets coding - join us at InnoHacks!', '18+', 'Germany', 'active'),
('6bf4e657-02fb-4315-99ad-5a6b845a4d5a', '2024-11-08', 'CodeCrunch', 'https://example.com/codecrunch.png', 'Toronto, Canada', 'November', 'Monday', '/images/hackathons/hack4.jpg', '10:00 AM', '6:00 PM', 'Crunch your way through coding challenges at CodeCrunch!', '18+', 'Canada', 'active'),
('98b5a74a-2467-482f-b1c4-2e9b2e800f4d', '2024-12-25', 'HackFest', 'https://example.com/hackfest.png', 'Sydney, Australia', 'December', 'Friday', '/images/hackathons/hack5.webp', '11:00 AM', '9:00 PM', 'Celebrate the spirit of hacking at HackFest!', '18+', 'Australia', 'active'),
('aee3d61d-fc7f-4c89-b648-2c12ecb87b17', '2024-09-18', 'TechTonic Hackathon', 'https://example.com/techtonic.png', 'San Francisco, USA', 'September', 'Saturday', '/images/hackathons/hack2.jpg', '10:30 AM', '9:00 PM', 'Dive into the tech world with TechTonic Hackathon!', '18+', 'United States', 'active'),
('c0e3980f-308b-48b4-8fd3-943234b43a98', '2024-06-25', 'HackCity', '/images/hackathons/hack11.jpg', 'Hong Kong, China', 'June', 'Thursday', '/images/hackathons/hack11.jpg', '9:00 AM', '7:00 PM', 'Hack your way through the urban jungle at HackCity!', '18+', 'China', 'past'),
('c4a19f8e-d43b-41d0-b0c1-476e529c8bb4', '2025-07-19', 'HackOcean', '/images/hackathons/hack12.webp', 'Cape Town, South Africa', 'July', 'Monday', '/images/hackathons/hack12.webp', '10:30 AM', '8:30 PM', 'Dive deep into coding challenges at HackOcean!', '18+', 'South Africa', 'active'),
('f4766eb9-005e-4d2a-8904-8d3f9f9ff31a', '2025-03-18', 'HackSpring', 'https://example.com/hackspring.png', 'Berlin, Germany', 'March', 'Thursday', '/images/hackathons/hack8.jpeg', '8:00 AM', '6:00 PM', 'Spring into action with coding challenges at HackSpring!', '18+', 'Germany', 'active'),
('f4a9a475-2d16-4b5c-b4bb-fcfd06a91b1d', '2025-04-22', 'HackEarth', 'https://example.com/hackearth.png', 'Mumbai, India', 'April', 'Friday', '/images/hackathons/hack9.jpg', '9:30 AM', '7:30 PM', 'Connect with the earth through technology at HackEarth!', '18+', 'India', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_subscribed` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newsletters`
--

INSERT INTO `newsletters` (`id`, `email`, `date_subscribed`) VALUES
(1, 'work.guru@hotmail.com', '2024-05-12 18:23:12'),
(2, 'try.guru@hotmail.com', '2024-05-12 18:33:11');

-- --------------------------------------------------------

--
-- Table structure for table `past_events`
--

CREATE TABLE `past_events` (
  `id` int(11) NOT NULL,
  `deadlineDate` datetime NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `month` varchar(50) DEFAULT NULL,
  `day` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `startingTime` time DEFAULT NULL,
  `endingTime` time DEFAULT NULL,
  `description` text DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `past_events`
--

INSERT INTO `past_events` (`id`, `deadlineDate`, `eventName`, `logo`, `location`, `month`, `day`, `img`, `startingTime`, `endingTime`, `description`, `age`, `country`) VALUES
(3, '2024-07-18 00:00:00', 'Culinary Festival', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80', 'Klavdiyevo-Tarasove, Ukraine', 'january', 'tuesday', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80', '10:22:00', '10:26:00', 'Indulge in a culinary adventure with flavors from around the world.', 0, 'Ukraine'),
(1339, '2024-07-27 00:00:00', 'Tech Summit', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Xiasi, China', 'march', 'friday', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', '05:04:00', '05:17:00', 'Join the leading tech experts and innovators at the Tech Summit.', 0, 'China');

-- --------------------------------------------------------

--
-- Table structure for table `past_hackathons`
--

CREATE TABLE `past_hackathons` (
  `id` int(11) NOT NULL,
  `deadlineDate` datetime NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `month` varchar(50) DEFAULT NULL,
  `day` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `startingTime` time DEFAULT NULL,
  `endingTime` time DEFAULT NULL,
  `description` text DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `past_hackathons`
--

INSERT INTO `past_hackathons` (`id`, `deadlineDate`, `eventName`, `logo`, `location`, `month`, `day`, `img`, `startingTime`, `endingTime`, `description`, `age`, `country`) VALUES
(1, '2024-05-14 00:00:00', 'CodeFest 2024', 'https://example.com/codefest2024.png', 'Virtual', 'May', 'Friday', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '10:00:00', '06:00:00', 'Join us for a day of coding challenges and innovation!', 0, 'Global'),
(731, '2024-07-10 00:00:00', 'Hack the Future', '/images/hackathons/hack13.jpeg', 'London, UK', 'July', 'Friday', '/images/hackathons/hack13.jpeg', '11:00:00', '08:00:00', 'Shape tomorrow\'s technology today at Hack the Future!', 16, 'United Kingdom');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phonenumber` (`phonenumber`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `enrolled_events`
--
ALTER TABLE `enrolled_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `enrolled_hackathons`
--
ALTER TABLE `enrolled_hackathons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hackathon_id` (`hackathon_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hackathons`
--
ALTER TABLE `hackathons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `past_events`
--
ALTER TABLE `past_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `past_hackathons`
--
ALTER TABLE `past_hackathons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `enrolled_events`
--
ALTER TABLE `enrolled_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `enrolled_hackathons`
--
ALTER TABLE `enrolled_hackathons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `past_events`
--
ALTER TABLE `past_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1348;

--
-- AUTO_INCREMENT for table `past_hackathons`
--
ALTER TABLE `past_hackathons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=732;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrolled_events`
--
ALTER TABLE `enrolled_events`
  ADD CONSTRAINT `enrolled_events_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Constraints for table `enrolled_hackathons`
--
ALTER TABLE `enrolled_hackathons`
  ADD CONSTRAINT `enrolled_hackathons_ibfk_1` FOREIGN KEY (`hackathon_id`) REFERENCES `hackathons` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
