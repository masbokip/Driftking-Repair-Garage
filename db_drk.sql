-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2025 at 03:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_drk`
--
CREATE DATABASE IF NOT EXISTS `db_drk` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_drk`;

-- --------------------------------------------------------

--
-- Table structure for table `absensi`
--

DROP TABLE IF EXISTS `absensi`;
CREATE TABLE `absensi` (
  `id_absensi` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `nama_user` varchar(255) NOT NULL,
  `tgl_absen1` datetime NOT NULL,
  `tgl_absen2` datetime NOT NULL,
  `total_duty` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absensi`
--

INSERT INTO `absensi` (`id_absensi`, `id_user`, `nama_user`, `tgl_absen1`, `tgl_absen2`, `total_duty`, `status`) VALUES
('ABS001', 'DRK001', 'test', '2025-07-29 19:41:00', '2025-07-29 19:42:00', '0 jam 1 menit', 'Active'),
('ABS002', 'DRK001', 'test', '2025-07-29 19:49:00', '2025-07-29 21:49:00', '2 jam 0 menit', 'Active'),
('ABS003', 'DRK001', 'test', '2025-07-29 19:49:00', '2025-07-29 21:50:00', '2 jam 1 menit', 'Active'),
('ABS004', 'DRK001', 'test', '2025-07-29 19:52:00', '2025-07-29 21:52:00', '2 jam 0 menit', 'Active'),
('ABS005', 'DRK001', 'Okip Gins', '2025-07-29 19:58:00', '2025-07-29 22:20:00', '2 jam 22 menit', 'Active'),
('ABS006', 'DRK001', 'Okip Gins', '2025-07-29 20:00:00', '2025-07-29 20:24:00', '0 jam 24 menit', 'Active'),
('ABS007', 'DRK001', 'Okip Gins', '2025-07-29 20:01:00', '2025-07-29 20:03:00', '0 jam 2 menit', 'Active'),
('ABS008', 'DRK001', 'Okip Gins', '2025-07-29 20:08:00', '2025-07-29 20:10:00', '0 jam 2 menit', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
CREATE TABLE `produk` (
  `id_produk` varchar(255) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `jumlah` int(10) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--

DROP TABLE IF EXISTS `rank`;
CREATE TABLE `rank` (
  `id_rank` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `rank` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `numb` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `nama`, `rank`, `status`, `foto`, `numb`) VALUES
('DRK001', 'okip', '$2b$10$MBMUZxJZIoBYfaz9NB70B.rgZPPBQkWJNa9Xy9bB0kubA1x/Zj0ja', 'Okip Gins', 'CEO', 'Active', 'foto-1753788845643-810782266.png', 1),
('DRK002', 'sydney', '$2b$10$NGuqHFUtpTUWhGH7gYHyFuUJBg6IEUyRuRL.gUg8wa8ciKdFgShXe', 'Sydney Russel Icikiwir', 'CEO', 'Active', 'foto-1753453464696-716324486.png', 1),
('DRK003', 'tester', '$2b$10$utdUfL0LAmwcJbUO/kYxaOAYAqBlRLp4nE/vLi0w2IApkoaeM5Hqe', 'jono', 'Trainer', 'Active', 'foto-1753508959683-368229902.png', 5),
('DRK004', 'tester2', '$2b$10$CYI1X0s5K73JI9D3cs4WC.xK1iThSolw26.y2ZG2dHcZbYegqnCja', 'janamembahana', 'Expert', 'Active', 'foto-1753508988474-463790530.png', 4),
('DRK005', 'tester3', '$2b$10$nD8moRSRFMSjkTumuanahen.0vP1E8UOivvBbiszR/ZQAKMYvgrw6', 'begindang', 'Manager', 'Active', 'foto-1753509061705-700438691.png', 3),
('DRK006', 'tester4', '$2b$10$hVpuMXYkz5.t0ePl3YGVeuLliNij5LhbLR/agQBDvXR9UBMiyO93i', 'beranakpinak', 'HOW', 'Active', 'foto-1753509362931-295641846.png', 2),
('DRK007', 'tester5', '$2b$10$/cXCvrhzf1sL7PvwWL.8pe8tkXLoP3QAT82rjdzB96CHxFCxPqZey', 'majumundur', 'Manager', 'Active', 'foto-1753509391456-601766513.png', 3),
('DRK008', 'tester6', '$2b$10$tqiAji/uvfNNLtEfhuhrw.aiOOU3ona8lvkoqFl590BoD1kTarRoy', 'sendang', 'Trainer', 'Active', 'foto-1753509549159-727180531.png', 5),
('DRK009', 'tester7', '$2b$10$bcwqYadCD.Mx38i/OV0aT.PBHavTffCxJlTggghOM/XjPKyS7KTOG', 'Okip Gins', 'Trainer', 'Active', 'foto-1753509569537-331477339.png', 5),
('DRK010', 'tester8', '$2b$10$FkedWUQg0qRexQ4un0jLfuk6z32eRDSdcPk0l2zxUp69F7AY9429C', 'wakawa', 'Trainer', 'Active', 'foto-1753509590313-725444954.png', 5),
('DRK013', 'kintil', '$2b$10$BCWXfQRnpCAg5jWiMhsIsuQWt5Ofbu4ez6sNS6UJtezAQwu.ZY2my', 'kintil', 'CEO', 'Active', 'foto-1753687614845-737885692.jpg', 1),
('DRK014', 'police11xx', '$2b$10$Vbhl2kDqFA6OzRC/kd6BrOk6tkiPN1c9kHpIr4xIvf0DjH/67RT8u', 'Okip Gins', 'HOW', 'Active', 'foto-1753687647775-946783027.png', 2),
('DRK015', 'TESTLAGI', '$2b$10$7Jhn8a5HkbvumQrG8lcYI.NvuOgI/mDnUHO4DMBBRax4/Nad2z27C', 'testlagi', 'CEO', 'Active', 'foto-1753688072482-550401942.jpg', 1),
('DRK016', 'TESTLAGI2', '$2b$10$SXd/B2..ingY/cZA/LPZc.Q6XKOyDqM0OJROcBlhDr5PYxF9jgjIC', 'testlagi', 'CEO', 'Active', 'foto-1753688330745-842602800.jpg', 1),
('DRK017', 'beranakpinak', '$2b$10$ZcDL7llPNhwXiPDMkp/blePQ6FhNbCqnXj4OgqDQcDvSiLTzup4/O', 'OkipWelelele', 'CEO', 'Active', 'foto-1753689454770-118469101.png', 1),
('DRK018', 'cobauserlagi', '$2b$10$pbtJ99ib57gO6/nMg.PKLO5jyf6LdeLziohafy9o/.Ti.ljPojQUS', 'testbotdiscord', 'Expert', 'Active', 'foto-1753701564305-237956134.jpg', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id_absensi`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `rank`
--
ALTER TABLE `rank`
  ADD PRIMARY KEY (`id_rank`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
