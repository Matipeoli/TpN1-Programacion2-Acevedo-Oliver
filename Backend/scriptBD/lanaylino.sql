-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2026 a las 02:29:21
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `lanaylino` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lanaylino`;

--
-- Base de datos: `lanaylino`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_inventario` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id_carrito`, `id_inventario`, `id_usuario`) VALUES
(1, 5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(1, 'Remeras'),
(2, 'Pantalones'),
(3, 'Vestidos'),
(4, 'Abrigos'),
(5, 'Accesorios'),
(6, 'Remeras'),
(7, 'Pantalones'),
(8, 'Vestidos'),
(9, 'Abrigos'),
(10, 'Accesorios'),
(11, 'Remeras'),
(12, 'Pantalones'),
(13, 'Vestidos'),
(14, 'Abrigos'),
(15, 'Accesorios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_detalle_pedido` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_inventario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--

CREATE TABLE `favorito` (
  `id_favorito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `talle` varchar(20) NOT NULL,
  `color` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_inventario`, `talle`, `color`, `stock`, `id_producto`) VALUES
(1, 'S', 'Blanco', 15, 1),
(2, 'M', 'Blanco', 20, 1),
(3, 'L', 'Blanco', 10, 1),
(4, 'S', 'Gris', 8, 2),
(5, 'M', 'Gris', 12, 2),
(6, '38', 'Negro', 6, 3),
(7, '40', 'Negro', 9, 3),
(8, '42', 'Negro', 5, 3),
(9, 'M', 'Beige', 7, 4),
(10, 'L', 'Beige', 4, 4),
(11, 'S', 'Natural', 3, 5),
(12, 'M', 'Natural', 2, 5),
(13, 'M', 'Azul', 6, 6),
(14, 'L', 'Azul', 3, 6),
(15, 'M', 'Gris', 5, 7),
(16, 'L', 'Gris', 4, 7),
(17, 'S', 'Crema', 8, 8),
(18, 'M', 'Crema', 6, 8),
(19, '90cm', 'Marrón', 15, 9),
(20, '100cm', 'Marrón', 12, 9),
(21, 'Único', 'Natural', 20, 10),
(22, 'S', 'Blanco', 15, 1),
(23, 'M', 'Blanco', 20, 1),
(24, 'L', 'Blanco', 10, 1),
(25, 'S', 'Gris', 8, 2),
(26, 'M', 'Gris', 12, 2),
(27, '38', 'Negro', 6, 3),
(28, '40', 'Negro', 9, 3),
(29, '42', 'Negro', 5, 3),
(30, 'M', 'Beige', 7, 4),
(31, 'L', 'Beige', 4, 4),
(32, 'S', 'Natural', 10, 5),
(33, 'M', 'Natural', 7, 5),
(34, 'M', 'Azul', 6, 6),
(35, 'L', 'Azul', 3, 6),
(36, 'M', 'Gris', 5, 7),
(37, 'L', 'Gris', 4, 7),
(38, 'S', 'Crema', 8, 8),
(39, 'M', 'Crema', 6, 8),
(40, '90cm', 'Marrón', 15, 9),
(41, '100cm', 'Marrón', 12, 9),
(42, 'Único', 'Natural', 20, 10),
(43, 'S', 'Blanco', 15, 1),
(44, 'M', 'Blanco', 20, 1),
(45, 'L', 'Blanco', 10, 1),
(46, 'S', 'Gris', 8, 2),
(47, 'M', 'Gris', 12, 2),
(48, '38', 'Negro', 6, 3),
(49, '40', 'Negro', 9, 3),
(50, '42', 'Negro', 5, 3),
(51, 'M', 'Beige', 7, 4),
(52, 'L', 'Beige', 4, 4),
(53, 'S', 'Natural', 10, 5),
(54, 'M', 'Natural', 7, 5),
(55, 'M', 'Azul', 6, 6),
(56, 'L', 'Azul', 3, 6),
(57, 'M', 'Gris', 5, 7),
(58, 'L', 'Gris', 4, 7),
(59, 'S', 'Crema', 8, 8),
(60, 'M', 'Crema', 6, 8),
(61, '90cm', 'Marrón', 15, 9),
(62, '100cm', 'Marrón', 12, 9),
(63, 'Único', 'Natural', 20, 10),
(64, 's', 'blanco', 2, 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `estado` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `genero` varchar(20) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `genero`, `id_categoria`, `imagen`) VALUES
(1, 'Remera básica blanca', 'Remera de algodón 100%, corte recto', 4500.00, 'unisex', 1, 'img/remera_blanca.jfif'),
(2, 'Remera oversize gris', 'Remera oversize con estampa minimalista', 5800.00, 'femenino', 1, 'img/remera_gris.jfif'),
(3, 'Jean slim negro', 'Jean slim fit tiro alto, tela elastizada', 12900.00, 'femenino', 2, 'img/jean_negro.jfif'),
(4, 'Pantalón chino beige', 'Pantalón chino recto, 100% algodón', 10500.00, 'masculino', 2, 'img/chino_beige.jfif'),
(5, 'Vestido lino verano', 'Vestido midi de lino natural, manga corta', 14200.00, 'femenino', 3, 'img/vestido_lino.jfif'),
(6, 'Vestido camisero azul', 'Vestido camisero con botones, largo rodilla', 13600.00, 'femenino', 3, 'img/vestido_azul.jfif'),
(7, 'Campera de lana gris', 'Campera de lana merino, cierre frontal', 28000.00, 'unisex', 4, 'img/campera_lana.jfif'),
(8, 'Cardigan crema', 'Cardigan largo de punto suave', 19500.00, 'femenino', 4, 'img/cardigan_crema.jfif'),
(9, 'Cinturón cuero marrón', 'Cinturón de cuero genuino, hebilla dorada', 5200.00, 'unisex', 5, 'img/cinturon_marron.jfif'),
(10, 'Bolso tote natural', 'Bolso tote de lona cruda con asas largas', 8900.00, 'femenino', 5, 'img/bolso_tote.jfif'),
(11, 'Remera básica blanca', 'Remera de algodón 100%, corte recto', 4500.00, 'unisex', 1, 'img/remera_blanca.jfif'),
(12, 'Remera oversize gris', 'Remera oversize con estampa minimalista', 5800.00, 'femenino', 1, 'img/remera_gris.jfif'),
(13, 'Jean slim negro', 'Jean slim fit tiro alto, tela elastizada', 12900.00, 'femenino', 2, 'img/jean_negro.jfif'),
(14, 'Pantalón chino beige', 'Pantalón chino recto, 100% algodón', 10500.00, 'masculino', 2, 'img/chino_beige.jfif'),
(15, 'Vestido lino verano', 'Vestido midi de lino natural, manga corta', 14200.00, 'femenino', 3, 'img/vestido_lino.jfif'),
(16, 'Vestido camisero azul', 'Vestido camisero con botones, largo rodilla', 13600.00, 'femenino', 3, 'img/vestido_azul.jfif'),
(17, 'Campera de lana gris', 'Campera de lana merino, cierre frontal', 28000.00, 'unisex', 4, 'img/campera_lana.jfif'),
(18, 'Cardigan crema', 'Cardigan largo de punto suave', 19500.00, 'femenino', 4, 'img/cardigan_crema.jfif'),
(19, 'Cinturón cuero marrón', 'Cinturón de cuero genuino, hebilla dorada', 5200.00, 'unisex', 5, 'img/cinturon_marron.jfif'),
(20, 'Bolso tote natural', 'Bolso tote de lona cruda con asas largas', 8900.00, 'femenino', 5, 'img/bolso_tote.jfif'),
(21, 'Remera básica blanca', 'Remera de algodón 100%, corte recto', 4500.00, 'unisex', 1, 'img/remera_blanca.jfif'),
(22, 'Remera oversize gris', 'Remera oversize con estampa minimalista', 5800.00, 'femenino', 1, 'img/remera_gris.jfif'),
(23, 'Jean slim negro', 'Jean slim fit tiro alto, tela elastizada', 12900.00, 'femenino', 2, 'img/jean_negro.jfif'),
(24, 'Pantalón chino beige', 'Pantalón chino recto, 100% algodón', 10500.00, 'masculino', 2, 'img/chino_beige.jfif'),
(25, 'Vestido lino verano', 'Vestido midi de lino natural, manga corta', 14200.00, 'femenino', 3, 'img/vestido_lino.jfif'),
(26, 'Vestido camisero azul', 'Vestido camisero con botones, largo rodilla', 13600.00, 'femenino', 3, 'img/vestido_azul.jfif'),
(27, 'Campera de lana gris', 'Campera de lana merino, cierre frontal', 28000.00, 'unisex', 4, 'img/campera_lana.jfif'),
(28, 'Cardigan crema', 'Cardigan largo de punto suave', 19500.00, 'femenino', 4, 'img/cardigan_crema.jfif'),
(29, 'Cinturón cuero marrón', 'Cinturón de cuero genuino, hebilla dorada', 5200.00, 'unisex', 5, 'img/cinturon_marron.jfif'),
(30, 'Bolso tote natural', 'Bolso tote de lona cruda con asas largas', 8900.00, 'femenino', 5, 'img/bolso_tote.jfif'),
(31, 'Camiseta Manchester United', '', 10000.00, 'masculino', 1, 'data:image/webp;base64,UklGRmYLAABXRUJQVlA4IFoLAABQQACdASrVANQAPp1Gn0ylozCipDH6yhATiWlu3V/v1RIFcQtqpiGYWfuVmF9k+/JxJ/Z/o68L/7d6GP+W9ZP/L8rX1f7CvSt/cj2YP2ZKAN3oVvNseTR4Vs7JBwEixAaUlDATy6B419kwaJWREoUcdgPA+GQ9s8jTIjFh3c3pJ9spi2bKeY3kszk7N5T+0259lnzeM/uVTOqX');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `email`, `password`, `direccion`, `telefono`, `rol`) VALUES
(1, 'a', 'a', 'a', 'a', 'a', 'a', 'usuario'),
(2, 'Admin', 'Sistema', 'admin@gmail.com', 'admin1234', 'Av. Central 100', '3424000001', 'admin'),
(3, 'Admin', 'Sistema', 'admin@gmail.com', 'admin1234', 'Av. Central 100', '3424000001', 'admin'),
(4, 'Admin', 'Sistema', 'admin@gmail.com', 'admin1234', 'Av. Central 100', '3424000001', 'admin'),
(5, 'Matias', 'Oliver', 'mati@gmail.com', 'mati123', 'tucuman 1111', '34524057234', 'usuario'),
(6, 'matia', 'acevedo', 'prueba@mail.com', 'prueba123', 'mono1111', '342444444', 'usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_inventario` (`id_inventario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_detalle_pedido`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_inventario` (`id_inventario`);

--
-- Indices de la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD PRIMARY KEY (`id_favorito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id_detalle_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favorito`
--
ALTER TABLE `favorito`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_inventario`) REFERENCES `inventario` (`id_inventario`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_inventario`) REFERENCES `inventario` (`id_inventario`);

--
-- Filtros para la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
