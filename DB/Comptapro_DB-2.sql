SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `Comptapro_DB`;
USE `Comptapro_DB`;

-- -------------------------
-- TABLE : User
-- -------------------------
CREATE TABLE `User` (
  `user_id` int(250) NOT NULL AUTO_INCREMENT,
  `nom` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(20) NOT NULL,
  `telephone` int(9) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `User` (`nom`, `email`, `mot_de_passe`, `telephone`) VALUES
('Paul', 'paul@sdf.com', 'qwertyui', 12345678),
('Aline', 'aline@sdf.com', 'qwertyui', 12345678),
('Naomie', 'naomie@example.com', 'mdp12345', 478123456),
('Karim', 'karim@example.com', 'pass2026', 495876543),
('Sophie', 'sophie@entreprise.be', 'azerty123', 478998877);

-- -------------------------
-- TABLE : PME
-- -------------------------
CREATE TABLE `PME` (
  `pme_id` int(250) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `ville` varchar(30) NOT NULL,
  `user_id` int(250) NOT NULL,
  `num_registre` int(250) NOT NULL,
  `email` varchar(30) NOT NULL,
  `tel` int(10) NOT NULL,
  `type_dabonnement` varchar(30) NOT NULL,
  PRIMARY KEY (`pme_id`),
  KEY `FK_pme_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `PME` (`nom`, `ville`, `user_id`, `num_registre`, `email`, `tel`, `type_dabonnement`) VALUES
('TAREK corp', 'Bruxelles', 1, 12345678, 'contact@tarek.com', 124567, 'premium'),
('Bruxelles Services', 'Bruxelles', 3, 98765432, 'contact@bruserv.be', 024567890, 'premium'),
('TechNova', 'Liège', 4, 56473829, 'info@technova.be', 043298765, 'standard'),
('GreenFood', 'Namur', 5, 99887766, 'info@greenfood.be', 081223344, 'premium'),
('WebCraft', 'Charleroi', 3, 44556677, 'hello@webcraft.be', 071556677, 'standard');

-- -------------------------
-- TABLE : ENTREE
-- -------------------------
CREATE TABLE `ENTREE` (
  `entree_id` int(250) NOT NULL AUTO_INCREMENT,
  `montant_entree` varchar(250) NOT NULL,
  `date` datetime(6) NOT NULL,
  `User_id` int(250) NOT NULL,
  `categorie_entree` varchar(250) NOT NULL,
  `update_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `statut_entree` varchar(20) NOT NULL,
  `description_entree` varchar(250) NOT NULL,
  `pme_id_entree` int(250) NOT NULL,
  PRIMARY KEY (`entree_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `ENTREE` (`montant_entree`, `date`, `User_id`, `categorie_entree`, `statut_entree`, `description_entree`, `pme_id_entree`) VALUES
('123445432', '2026-03-17 16:00:41', 2, 'abonnement', 'validé', 'Paiement annuel', 1),
('1500', '2026-03-20 10:15:00', 3, 'vente', 'validé', 'Vente de service digital', 2),
('3200', '2026-03-21 14:30:00', 4, 'contrat', 'en attente', 'Contrat annuel maintenance', 3),
('780', '2026-03-22 09:10:00', 5, 'vente', 'validé', 'Livraison produits bio', 4),
('2100', '2026-03-23 11:45:00', 3, 'développement', 'validé', 'Création site web', 5),
('950', '2026-03-24 08:20:00', 3, 'vente', 'validé', 'Service de consulting', 2);

-- -------------------------
-- TABLE : Depense_ID
-- -------------------------
CREATE TABLE `Depense_ID` (
  `depense_id_depense` int(20) NOT NULL AUTO_INCREMENT,
  `montant_depense` int(250) NOT NULL,
  `create_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `user_id_depense` int(250) NOT NULL,
  `update_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `categorie_depense` varchar(250) NOT NULL,
  `statut_depense` varchar(20) NOT NULL,
  `description_depense` varchar(250) NOT NULL,
  `pme_id_depense` int(250) NOT NULL,
  PRIMARY KEY (`depense_id_depense`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Depense_ID` (`montant_depense`, `user_id_depense`, `categorie_depense`, `statut_depense`, `description_depense`, `pme_id_depense`) VALUES
(450, 3, 'matériel', 'payé', 'Achat de fournitures de bureau', 2),
(1200, 4, 'logiciel', 'en attente', 'Licence annuelle CRM', 3),
(320, 5, 'transport', 'payé', 'Livraison marchandises', 4),
(980, 3, 'hébergement', 'payé', 'Serveur annuel', 5),
(150, 1, 'divers', 'payé', 'Frais administratifs', 1),
(600, 3, 'marketing', 'en attente', 'Campagne publicitaire', 2);

-- -------------------------
-- TABLE : BILAN
-- -------------------------
CREATE TABLE `BILAN` (
  `bilan_id` int(250) NOT NULL AUTO_INCREMENT,
  `create_date` date NOT NULL,
  `user_id` int(250) NOT NULL,
  `pme_id` int(250) NOT NULL,
  `Periode` year(4) NOT NULL,
  `total_entrees` int(250) NOT NULL,
  `total_depenses` int(250) NOT NULL,
  PRIMARY KEY (`bilan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `BILAN` (`create_date`, `user_id`, `pme_id`, `Periode`, `total_entrees`, `total_depenses`) VALUES
('2026-03-24', 3, 2, 2026, 2450, 1050),
('2026-03-24', 4, 3, 2026, 3200, 1200),
('2026-03-24', 5, 4, 2026, 780, 320),
('2026-03-24', 3, 5, 2026, 2100, 980),
('2026-03-24', 1, 1, 2026, 123445432, 150);

COMMIT;
