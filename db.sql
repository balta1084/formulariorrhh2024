--CREAR DB

CREATE DATABASE proyecto;

-- Crear la tabla Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    dni VARCHAR(20) UNIQUE,
    mail VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    rol varchar(25),
);

-- Crear la tabla Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen NVARCHAR(255),
    nombre VARCHAR(100),
    descripcion TEXT,
    tipo VARCHAR(50),
    precio DECIMAL(10, 2),
    estado TINYINT(1)
);

-- Crear tabla intermedia de pedidos
CREATE TABLE pedidos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
)

-- Crear la tabla Pedidos_Productos
CREATE TABLE pedidos_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    total DECIMAL(10, 2),
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES Productos(id)
);