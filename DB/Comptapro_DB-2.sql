-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2026 at 04:25 PM
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
-- Database: `Comptapro_DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `BILAN`
--

CREATE TABLE `BILAN` (
  `bilan_id` int(250) NOT NULL,
  `create_date` date NOT NULL,
  `user_id` int(250) NOT NULL,
  `pme_id` int(250) NOT NULL,
  `Periode` year(4) NOT NULL,
  `total_entrees` int(250) NOT NULL,
  `total_depenses` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Depense_ID`
--

CREATE TABLE `Depense_ID` (
  `montant_depense` int(250) NOT NULL,
  `create_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_id_depense` int(250) NOT NULL,
  `update_date` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `categorie_depense` varchar(250) NOT NULL,
  `statut_depense` varchar(20) NOT NULL,
  `description_depense` varchar(250) NOT NULL,
  `pme_id_depense` int(250) NOT NULL,
  `depense_id_depense` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Base de données des dépenses ';

-- --------------------------------------------------------

--
-- Table structure for table `ENTREE`
--

CREATE TABLE `ENTREE` (
  `entree_id` int(250) NOT NULL,
  `montant_entree` varchar(250) NOT NULL,
  `date` datetime(6) NOT NULL,
  `User_id` int(250) NOT NULL,
  `categorie_entree` varchar(250) NOT NULL,
  `update_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `statut_entree` varchar(20) NOT NULL,
  `description_entree` varchar(250) NOT NULL,
  `pme_id_entree` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ENTREE`
--

INSERT INTO `ENTREE` (`entree_id`, `montant_entree`, `date`, `User_id`, `categorie_entree`, `update_date`, `statut_entree`, `description_entree`, `pme_id_entree`) VALUES
(1, '123445432', '2026-03-17 16:00:41.000000', 2, 'abonnement', '2026-03-18 15:00:41.000000', 'sedfghjkl', 'ucveygcvugejhchmvgvcgvgeu', 1);

-- --------------------------------------------------------

--
-- Table structure for table `PME`
--

CREATE TABLE `PME` (
  `pme_id` int(250) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `ville` varchar(30) NOT NULL,
  `user_id` int(250) NOT NULL,
  `num_registre` int(250) NOT NULL,
  `email` varchar(30) NOT NULL,
  `tel` int(10) NOT NULL,
  `type_dabonnement` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `PME`
--

INSERT INTO `PME` (`pme_id`, `nom`, `ville`, `user_id`, `num_registre`, `email`, `tel`, `type_dabonnement`) VALUES
(1, 'TAREK corp', 'bx', 1, 12345678, 'aqsdfgh@asdfg.com', 124567, 'qawsedrfghj');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int(250) NOT NULL,
  `nom` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(20) NOT NULL,
  `telephone` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='base de données des utilisateurs';

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`user_id`, `nom`, `email`, `mot_de_passe`, `telephone`) VALUES
(1, 'Paul', 'asdfgh@sdf.com', 'qwertyui', 12345678),
(2, 'aline', 'asdfghj@sdfgh.com', 'qwertyui', 12345678);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BILAN`
--
ALTER TABLE `BILAN`
  ADD PRIMARY KEY (`bilan_id`),
  ADD KEY `FK_bilan_user_id` (`user_id`),
  ADD KEY `FK_bilan_pme_id` (`pme_id`);

--
-- Indexes for table `Depense_ID`
--
ALTER TABLE `Depense_ID`
  ADD PRIMARY KEY (`depense_id_depense`),
  ADD KEY `FK_depense_pme_id` (`pme_id_depense`),
  ADD KEY `FK_depense_user_id` (`user_id_depense`);

--
-- Indexes for table `ENTREE`
--
ALTER TABLE `ENTREE`
  ADD PRIMARY KEY (`entree_id`),
  ADD KEY `FK_entree_user_id` (`User_id`),
  ADD KEY `FK_entree_pme_id` (`pme_id_entree`);

--
-- Indexes for table `PME`
--
ALTER TABLE `PME`
  ADD PRIMARY KEY (`pme_id`),
  ADD KEY `FK_pme_user_id` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BILAN`
--
ALTER TABLE `BILAN`
  MODIFY `bilan_id` int(250) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Depense_ID`
--
ALTER TABLE `Depense_ID`
  MODIFY `depense_id_depense` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ENTREE`
--
ALTER TABLE `ENTREE`
  MODIFY `entree_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `PME`
--
ALTER TABLE `PME`
  MODIFY `pme_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BILAN`
--
ALTER TABLE `BILAN`
  ADD CONSTRAINT `FK_bilan_pme_id` FOREIGN KEY (`pme_id`) REFERENCES `PME` (`pme_id`),
  ADD CONSTRAINT `FK_bilan_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `Depense_ID`
--
ALTER TABLE `Depense_ID`
  ADD CONSTRAINT `FK_depense_pme_id` FOREIGN KEY (`pme_id_depense`) REFERENCES `PME` (`pme_id`),
  ADD CONSTRAINT `FK_depense_user_id` FOREIGN KEY (`user_id_depense`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `ENTREE`
--
ALTER TABLE `ENTREE`
  ADD CONSTRAINT `FK_entree_pme_id` FOREIGN KEY (`pme_id_entree`) REFERENCES `PME` (`pme_id`),
  ADD CONSTRAINT `FK_entree_user_id` FOREIGN KEY (`User_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `PME`
--
ALTER TABLE `PME`
  ADD CONSTRAINT `FK_pme_user_id` FOREIGN KEY (`user_id`) REFERENCES `PME` (`pme_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
