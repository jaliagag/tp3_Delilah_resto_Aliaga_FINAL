-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-09-2020 a las 00:07:03
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `definite`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `dishName` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `requestedBy` varchar(200) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` date NOT NULL,
  `payMethod` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `price` float NOT NULL,
  `userAddress` varchar(200) NOT NULL,
  `userPhone` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordersndishes`
--

CREATE TABLE `ordersndishes` (
  `orderId` int(11) NOT NULL,
  `dishId` int(11) NOT NULL,
  `dishQ` int(11) NOT NULL,
  `dishPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `roleName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `roleName`) VALUES
(1, 'dbadmin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userNickname` varchar(200) NOT NULL,
  `userName` varchar(200) NOT NULL,
  `userLastname` varchar(200) NOT NULL,
  `userEmail` varchar(200) NOT NULL,
  `userPhone` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

INSERT INTO `users` (`id`, `userNickname`, `userName`, `userLastname`, `userEmail`, `userPhone`, `address`, `password`, `role`) VALUES (1, 'dbadmin', 'dbadmin', 'dbadmin', 'dbadmin', 'dbadmin', 'dbadmin', 'dbadmin', '1');

--
-- Indices de la tabla `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dishName` (`dishName`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `ordersndishes`
--
ALTER TABLE `ordersndishes`
  ADD PRIMARY KEY (`orderId`,`dishId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY `id` (`id`),
  ADD UNIQUE KEY `userNickname` (`userNickname`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ordersndishes`
--
ALTER TABLE `ordersndishes`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibjk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
