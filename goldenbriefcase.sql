-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2021 a las 02:28:45
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `goldenbriefcase`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(255) NOT NULL,
  `movie_title` text CHARACTER SET latin1 NOT NULL,
  `Movie_cost` text CHARACTER SET latin1 NOT NULL,
  `director_id` int(255) NOT NULL,
  `movie_address` text CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `rol_id` int(11) NOT NULL,
  `rol_name` text CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`rol_id`, `rol_name`) VALUES
(1, 'CLIENT'),
(2, 'DIRECTOR'),
(3, 'ADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

CREATE TABLE `transactions` (
  `tran_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `tran_state` int(11) NOT NULL,
  `tran_value` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaction_states`
--

CREATE TABLE `transaction_states` (
  `state_id` int(11) NOT NULL,
  `state_name` text CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `transaction_states`
--

INSERT INTO `transaction_states` (`state_id`, `state_name`) VALUES
(1, 'APROVED'),
(2, 'IN-PROCES'),
(3, 'REJECTED');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_email` text CHARACTER SET latin1 NOT NULL,
  `user_password` text CHARACTER SET latin1 NOT NULL,
  `user_name` text CHARACTER SET latin1 NOT NULL,
  `user_rol` int(10) NOT NULL,
  `user_image` text CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD UNIQUE KEY `director_id` (`director_id`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`tran_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`movie_id`),
  ADD UNIQUE KEY `tran_state` (`tran_state`),
  ADD UNIQUE KEY `tran_state_2` (`tran_state`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indices de la tabla `transaction_states`
--
ALTER TABLE `transaction_states`
  ADD PRIMARY KEY (`state_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_rol` (`user_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transactions`
--
ALTER TABLE `transactions`
  MODIFY `tran_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transaction_states`
--
ALTER TABLE `transaction_states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`director_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`tran_state`) REFERENCES `transaction_states` (`state_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_rol`) REFERENCES `rols` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
