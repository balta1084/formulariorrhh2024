--CREAR DB

CREATE DATABASE proyecto;

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    dni VARCHAR(20) UNIQUE,
    mail VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    rol varchar(25),
);

-- Crear la tabla Productos
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen NVARCHAR(255),
    nombre VARCHAR(100),
    descripcion TEXT,
    tipo VARCHAR(50),
    precio DECIMAL(10, 2)
);

-- Crear tabla intermedia de pedidos
CREATE TABLE Pedidos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
)

-- Crear la tabla Pedidos_Productos
CREATE TABLE Pedidos_Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    total DECIMAL(10, 2),
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES Productos(id)
);

INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Sous-vide-meat.png','Sous Vide Meat', 'Asado de costilla cocido a baja temperatura durante 4hs, acompañados de milhojas de papa', 'Plato principal', 9999.99);
INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Ribs.png', 'Ribs', 'Costillas de cerdo laqueadas en barbacoa casera, acompañados de papas rusticas en doble coccion y ensalada coleslaw', 'Plato principal', 7499.99);
INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Sorrentinos-rellenos.png', 'Sorrentinos Rellenos', 'Sorrentinos rellenos de calabaza y muzzarella, en salsa de tomate fresco, chips de kale y semillas de zapallo tostado', 'Plato principal', 5999.99);
INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Salmon.png', 'Salmón', 'Salmón sobre cremoso de zanahoria, hinojos braseados y gremolata', 'Plato principal', 17499.99);

INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Volcan-de-chocolate.png', 'Volcan de Chocolate', 'Volcán de chocolate con helado de crema americana y mani crocante', 'Postre', 6499.99);
INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Volcan-de-DDL.png', 'Volcán de Dulce de Leche', 'Volcán de dulce de leche con helado de banana y crocante de banana', 'Postre', 6499.99);
INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Flan-DDL.png', 'Flan de Dulce de Leche', 'Flan de dulce de leche con ganache de chocolate, dulce de leche y crema', 'Postre', 4499.99);
INSERT INTO Productos (imagen, nombre, descripcion, tipo, precio) VALUES ('https://nomade-fd.com/wp-content/uploads/2023/05/Cheesecake-de-maracuya-1.png', 'Cheescake de Maracuya', 'Cheesecake de maracuya, con queso mascarpone casero, coulise de durazno y limon deshidratado', 'Postre', 5299.99)
